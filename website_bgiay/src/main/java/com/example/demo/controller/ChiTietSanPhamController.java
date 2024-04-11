package com.example.demo.controller;

import com.example.demo.dto.FilterChiTietSP;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.TaiKhoan;
import com.example.demo.repository.AnhRepository;
import com.example.demo.repository.ChatLieuRepository;
import com.example.demo.repository.ChiTietSanPhamRepository;
import com.example.demo.service.ChiTietSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chi-tiet-san-pham")
@CrossOrigin("*")
public class ChiTietSanPhamController {

    @Autowired
    private ChiTietSanPhamService service;

    @PostMapping("/filter")
    public ResponseEntity<?> filterCTSP(@RequestBody FilterChiTietSP filterChiTietSP) {
        System.out.println(filterChiTietSP);
        return ResponseEntity.ok(service.filter(filterChiTietSP));
    }

    @GetMapping("/san-pham")
    public ResponseEntity<?> getAllByIdSanPham(@RequestParam("id") Long idSanPham) {
        return ResponseEntity.ok(service.getAllByIdSanPham(idSanPham));
    }

    @GetMapping("")
    public ResponseEntity<?> getData(){
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable(name = "id") Long id) {
        if (!service.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy"
            );
        }
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody ChiTietSanPham chiTietSanPham) {
        return ResponseEntity.ok(service.add(chiTietSanPham));
    }

    @PostMapping("/saveAll")
    public ResponseEntity<?> addDanhSach(@RequestBody List<ChiTietSanPham> chiTietSanPham) {

        return ResponseEntity.ok(service.addDanhSach(chiTietSanPham));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id
            , @RequestBody ChiTietSanPham chiTietSanPham) {
        if (!service.existsById(id)) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy"
            );
        }
        return ResponseEntity.ok(service.update(id, chiTietSanPham));
    }
}
