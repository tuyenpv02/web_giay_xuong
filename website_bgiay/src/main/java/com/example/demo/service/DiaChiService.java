package com.example.demo.service;

import com.example.demo.entity.DiaChi;
import com.example.demo.entity.DiaChi;
import com.example.demo.entity.DiaChi;
import com.example.demo.entity.TaiKhoan;
import com.example.demo.repository.DiaChiRepository;
import com.example.demo.repository.DiaChiRepository;
import com.example.demo.repository.DiaChiRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiaChiService {


    @Autowired
    private DiaChiRepository repository;

    public DiaChi add(DiaChi diaChi) {
        return repository.save(diaChi);
    }

    public DiaChi update(Long id, DiaChi newDiaChi) {
        Optional<DiaChi> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTen(newDiaChi.getTen());
            o.setSdt(newDiaChi.getSdt());
            o.setThanhPho(newDiaChi.getThanhPho());
            o.setHuyen(newDiaChi.getHuyen());
            o.setXa(newDiaChi.getXa());
            o.setMoTa(newDiaChi.getMoTa());
            o.setNguoiCapNhat(newDiaChi.getNguoiCapNhat());
            o.setNgayCapNhat(newDiaChi.getNgayCapNhat());
            o.setTrangThai(newDiaChi.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

    public DiaChi updateTrangThai(Long id) {
        Optional<DiaChi> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(0);
            repository.save(o);
            return o;
        }).orElse(null);
    }

    public DiaChi deleteById(Long id) {
        Optional<DiaChi> optional = repository.findById(id);
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }

//    public DiaChi findById(Long id) {
//        Optional<DiaChi> optional = repository.findById(id);
//        return optional.map(o -> o).orElse(null);
//    }

    public List<DiaChi> findByIdTaiKhoan(Long id) {
        return repository.findByTaiKhoan(id);
    }
}
