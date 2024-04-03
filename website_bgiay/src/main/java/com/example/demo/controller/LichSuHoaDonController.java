package com.example.demo.controller;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.service.LichSuHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lich-su-hoa-don")
@CrossOrigin("*")
public class LichSuHoaDonController {

    @Autowired
    private LichSuHoaDonService service;

    @GetMapping("")
    public ResponseEntity<?> getAllByIdHoaDon(@RequestParam("idHoaDon") Long idHoaDon) {
        return ResponseEntity.ok(service.getAllByIdHoaDon(idHoaDon));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody LichSuHoaDon lichSuHoaDon) {
        return ResponseEntity.ok(service.add(lichSuHoaDon));
    }
}
