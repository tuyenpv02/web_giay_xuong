package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.repository.ChiTietSanPhamRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChiTietSanPhamService {


    @Autowired
    private ChiTietSanPhamRepository repository;

    public List<ChiTietSanPham> search(String text) {
        Specification<ChiTietSanPham> specification = (root, query, criteriaBuilder) -> {
            Predicate likeTen = criteriaBuilder.like(root.get("ma"), "%" + text + "%");
            Predicate likeNguoiTao = criteriaBuilder.like(root.get("nguoiTao"), "%" + text + "%");

            return criteriaBuilder.or(likeTen, likeNguoiTao);
        };
        return repository.findAll(specification);
    }

    public List<ChiTietSanPham> getAll() {
        return repository.findAllByOrderByIdDesc();
    }

    public ChiTietSanPham add(ChiTietSanPham chiTietSanPham) {
        return repository.save(chiTietSanPham);
    }

    public ChiTietSanPham update(Long id, ChiTietSanPham newChiTietSanPham) {
        Optional<ChiTietSanPham> optional = repository.findById(id);
        return optional.map(o -> {
            o.setSanPham(SanPham.builder().id(newChiTietSanPham.getSanPham().getId()).build());
            o.setMauSac(MauSac.builder().id(newChiTietSanPham.getMauSac().getId()).build());
            o.setKichCo(KichCo.builder().id(newChiTietSanPham.getKichCo().getId()).build());
            o.setChatLieu(ChatLieu.builder().id(newChiTietSanPham.getChatLieu().getId()).build());
            o.setDeGiay(DeGiay.builder().id(newChiTietSanPham.getDeGiay().getId()).build());

            o.setMa(newChiTietSanPham.getMa());
            o.setTen(newChiTietSanPham.getTen());
            o.setSoLuong(newChiTietSanPham.getSoLuong());
            o.setGiaBan(newChiTietSanPham.getGiaBan());
            o.setMoTa(newChiTietSanPham.getMoTa());

            o.setNguoiCapNhat(newChiTietSanPham.getNguoiCapNhat());
            o.setNgayCapNhat(newChiTietSanPham.getNgayCapNhat());
            o.setTrangThai(newChiTietSanPham.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

    public ChiTietSanPham updateTrangThai(Long id) {
        Optional<ChiTietSanPham> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(0);
            repository.save(o);
            return o;
        }).orElse(null);
    }

    public ChiTietSanPham deleteById(Long id) {
        Optional<ChiTietSanPham> optional = repository.findById(id);
//
//
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public Boolean existsByMa(String ma) {
        return repository.findByMa(ma).size() > 0;
    }

    public ChiTietSanPham findById(Long id) {
        Optional<ChiTietSanPham> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }

}
