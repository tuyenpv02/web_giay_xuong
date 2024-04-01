package com.example.demo.service;


import com.example.demo.entity.TaiKhoan;
import com.example.demo.repository.TaiKhoanRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanService {

    @Autowired
    private TaiKhoanRepository repository;

    public List<TaiKhoan> filter(String searchText, String trangThai) {
        return repository.filter(searchText, trangThai);
    }


    public List<TaiKhoan> getAllNhanVien() {
        return repository.findAllNhanVien();
    }

    public List<TaiKhoan> getAllKhachHang() {
        return repository.findAllKhachHang();
    }

    public TaiKhoan add(TaiKhoan TaiKhoan) {
        return repository.save(TaiKhoan);
    }

    public TaiKhoan update(Long id, TaiKhoan newTaiKhoan) {
        Optional<TaiKhoan> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTen(newTaiKhoan.getTen());
            o.setSdt(newTaiKhoan.getSdt());
            o.setCccd(newTaiKhoan.getCccd());
            o.setEmail(newTaiKhoan.getEmail());
            o.setGioiTinh(newTaiKhoan.getGioiTinh());
            o.setNgaySinh(newTaiKhoan.getNgaySinh());
            o.setAnh(newTaiKhoan.getAnh());
            o.setMatKhau(newTaiKhoan.getMatKhau());

            o.setNguoiCapNhat(newTaiKhoan.getNguoiCapNhat());
            o.setNgayCapNhat(newTaiKhoan.getNgayCapNhat());
            o.setTrangThai(newTaiKhoan.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

    public TaiKhoan updateTrangThai(Long id, Integer trangThai) {
        Optional<TaiKhoan> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(trangThai);
            repository.save(o);
            return o;
        }).orElse(null);
    }

    public TaiKhoan deleteById(Long id) {
        Optional<TaiKhoan> optional = repository.findById(id);
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public Boolean existsBySdt(String sdt) {
        return repository.findBySdt(sdt).size() > 0;
    }

    public TaiKhoan findById(Long id) {
        Optional<TaiKhoan> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }
}
