package com.example.demo.service;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.repository.HoaDonChiTietRepository;
import com.example.demo.repository.LichSuHoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LichSuHoaDonService {

    @Autowired
    LichSuHoaDonRepository repository;

    public List<LichSuHoaDon> getAllByIdHoaDon(Long idHoaDon) {
        return repository.findByHoaDon(idHoaDon);
    }

    public LichSuHoaDon add(LichSuHoaDon lichSuHoaDon) {

        lichSuHoaDon.setId(null);
        System.out.println(lichSuHoaDon);
        System.out.println(lichSuHoaDon);
        System.out.println(lichSuHoaDon);
        System.out.println(lichSuHoaDon);
        return repository.save(lichSuHoaDon);
    }

}
