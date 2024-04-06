package com.example.demo.controller;

import com.example.demo.entity.SanPham;
import com.example.demo.entity.ThuongHieu;
import com.example.demo.service.SanPhamService;
import com.example.demo.service.ThuongHieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/san-pham")
@CrossOrigin("*")
public class SanPhamController {

    @Autowired
    SanPhamService service;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") Long id) {
        if (!service.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy"
            );
        }
        return ResponseEntity.ok(service.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        if (!service.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy"
            );
        }
        return ResponseEntity.ok(service.deleteById(id));
    }


    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody SanPham sanPham) {
        if (service.existsByTen(sanPham.getTen())) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
                    "Tên đã tồn tại"
            );
        }
        return ResponseEntity.ok(service.add(sanPham));
    }
}
