package com.example.demo.service;

import com.example.demo.entity.Anh;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.repository.AnhRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnhService {

    @Autowired
    private AnhRepository repository;

    public List<Anh> getAll() {
        return repository.findAll();
    }

    public Anh add(Anh anh) {
        return repository.save(anh);
    }

    public Anh update(Long id, Anh newAnh) {
        Optional<Anh> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTen(newAnh.getTen());
            o.setUrl(newAnh.getUrl());
            o.setChiTietSanPham(ChiTietSanPham.builder().id(newAnh.getId()).build());
            o.setNguoiCapNhat(newAnh.getNguoiCapNhat());
            o.setNgayCapNhat(newAnh.getNgayCapNhat());
            o.setTrangThai(newAnh.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

    public Anh updateTrangThai(Long id){
        Optional<Anh> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(0);
            repository.save(o);
            return o;
        }).orElse(null);
    }

    public Anh deleteById(Long id) {
        Optional<Anh> optional = repository.findById(id);
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }
    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public Anh findById(Long id) {
        Optional<Anh> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }


}
