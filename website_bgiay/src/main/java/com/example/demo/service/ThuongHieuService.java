package com.example.demo.service;

import com.example.demo.entity.ThuongHieu;
import com.example.demo.repository.ThuongHieuRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ThuongHieuService {
    @Autowired
    private ThuongHieuRepository repository;


    public List<ThuongHieu> search(String text) {
        Specification<ThuongHieu> specification = (root, query, criteriaBuilder) -> {
            Predicate likeTen = criteriaBuilder.like(root.get("ten"),"%"+text+"%");
            Predicate likeNguoiTao = criteriaBuilder.like(root.get("nguoiTao"),"%"+text+"%");

            return  criteriaBuilder.or(likeTen,likeNguoiTao);
        };
        return repository.findAll(specification);
    }

    public List<ThuongHieu> getAll() {
        return repository.findAllByOrderByIdDesc();
    }

    public ThuongHieu add(ThuongHieu ThuongHieu) {
        return repository.save(ThuongHieu);
    }

    public ThuongHieu update(Long id, ThuongHieu newThuongHieu) {
        Optional<ThuongHieu> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTen(newThuongHieu.getTen());
            o.setNguoiCapNhat(newThuongHieu.getNguoiCapNhat());
            o.setNgayCapNhat(newThuongHieu.getNgayCapNhat());
            o.setTrangThai(newThuongHieu.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

    public ThuongHieu updateTrangThai(Long id){
        Optional<ThuongHieu> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(0);
            repository.save(o);
            return o;
        }).orElse(null);
    }

    public ThuongHieu deleteById(Long id) {
        Optional<ThuongHieu> optional = repository.findById(id);
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }
    public Boolean existsByMa(String ten) {
        return repository.findByTen(ten).size()>0;
    }

    public ThuongHieu findById(Long id) {
        Optional<ThuongHieu> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }

}
