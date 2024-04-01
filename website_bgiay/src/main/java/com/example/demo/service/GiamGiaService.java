package com.example.demo.service;

import com.example.demo.entity.GiamGia;
import com.example.demo.entity.TaiKhoan;
import com.example.demo.repository.GiamGiaRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GiamGiaService {


    @Autowired
    private GiamGiaRepository repository;

    public List<GiamGia> search(String text) {
        Specification<GiamGia> specification = (root, query, criteriaBuilder) -> {
            Predicate likeTen = criteriaBuilder.like(root.get("ten"),"%"+text+"%");
            Predicate likeNguoiTao = criteriaBuilder.like(root.get("nguoiTao"),"%"+text+"%");

            return  criteriaBuilder.or(likeTen,likeNguoiTao);
        };
        return repository.findAll(specification);
    }

    public List<GiamGia> getAll() {
        return repository.findAllByOrderByIdDesc();
    }

    public GiamGia add(GiamGia giamGia) {
        return repository.save(giamGia);
    }

    public GiamGia update(Long id, GiamGia newGiamGia) {
        Optional<GiamGia> optional = repository.findById(id);
        return optional.map(o -> {
            o.setMa(newGiamGia.getMa());
            o.setTen(newGiamGia.getTen());
            o.setSoLuong(newGiamGia.getSoLuong());
            o.setDieuKien(newGiamGia.getDieuKien());
            o.setGiaTriGiam(newGiamGia.getGiaTriGiam());
            o.setNgayBatDau(newGiamGia.getNgayBatDau());
            o.setNgayKetThuc(newGiamGia.getNgayKetThuc());

            o.setNguoiCapNhat(newGiamGia.getNguoiCapNhat());
            o.setNgayCapNhat(newGiamGia.getNgayCapNhat());
            o.setTrangThai(newGiamGia.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

    public GiamGia updateTrangThai(Long id){
        Optional<GiamGia> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(0);
            repository.save(o);
            return o;
        }).orElse(null);
    }

    public GiamGia deleteById(Long id) {
        Optional<GiamGia> optional = repository.findById(id);
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }
    public Boolean existsByTen(String ten) {
        return repository.findByTen(ten).size()>0;
    }

    public GiamGia findById(Long id) {
        Optional<GiamGia> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }
}
