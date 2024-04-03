package com.example.demo.service;

import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.entity.MauSac;
import com.example.demo.entity.PhuongThucThanhToan;
import com.example.demo.repository.LichSuHoaDonRepository;
import com.example.demo.repository.PhuongThucThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhuongThucThanhToanService {

    @Autowired
    PhuongThucThanhToanRepository repository;

    public List<PhuongThucThanhToan> getAllByIdHoaDon(Long idHoaDon) {
        return repository.findByHoaDon(idHoaDon);
    }

    public PhuongThucThanhToan add(PhuongThucThanhToan phuongThucThanhToan) {
        phuongThucThanhToan.setId(null);
        return repository.save(phuongThucThanhToan);
    }

    public PhuongThucThanhToan deleteById(Long id) {
        Optional<PhuongThucThanhToan> optional = repository.findById(id);
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }
}
