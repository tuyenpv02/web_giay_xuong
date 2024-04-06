package com.example.demo.service;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.ThuongHieu;
import com.example.demo.repository.HoaDonChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoaDonChiTietService {
    @Autowired
    HoaDonChiTietRepository repository;

    public List<HoaDonChiTiet> getAllByIdHoaDon(Long idHoaDon) {
        return repository.findByHoaDon(idHoaDon);
    }

    public HoaDonChiTiet add(HoaDonChiTiet hoaDonChiTiet) {
        return repository.save(hoaDonChiTiet);
    }

    //    update so luong
    public HoaDonChiTiet update(Long id, HoaDonChiTiet newHoaDonChiTiet) {
        Optional<HoaDonChiTiet> optional = repository.findById(id);
        return optional.map(o -> {
            o.setSoLuong(newHoaDonChiTiet.getSoLuong());
            return repository.save(o);
        }).orElse(null);
    }

    public HoaDonChiTiet deleteById(Long id) {
        Optional<HoaDonChiTiet> optional = repository.findById(id);
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public List<HoaDonChiTiet> existsByHDAndCTSP(Long idCTSP, long idHD) {
        List<HoaDonChiTiet> ds = repository.findByHDAnIdCTSP(idCTSP, idHD);
        if (ds.size() > 0) {
            return ds;
        }
        return null;
    }

}
