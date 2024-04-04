package com.example.demo.controller;

import com.example.demo.entity.TaiKhoan;
import com.example.demo.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tai-khoan")
@CrossOrigin("*")
public class TaiKhoanController {
    @Autowired
    TaiKhoanService service;

    @GetMapping("/filter")
    public ResponseEntity<?> filter(
            @RequestParam("searchText") String searchText,
            @RequestParam("trangThai") String trangThai
    ) {
        return ResponseEntity.ok(service.filterNhanVien(searchText.trim(), trangThai.trim()));
    }


    @GetMapping("/nhan-vien")
    public ResponseEntity<?> getAllNhanVien() {
        return ResponseEntity.ok(service.getAllNhanVien());
    }

    @GetMapping("/khach-hangn")
    public ResponseEntity<?> getAllKhachHang() {
        return ResponseEntity.ok(service.getAllKhachHang());
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
    public ResponseEntity<?> add(@RequestBody TaiKhoan taiKhoan) {
        if (service.existsBySdt(taiKhoan.getSdt())) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
                    "Sdt đã tồn tại"
            );
        }
        return ResponseEntity.ok(service.add(taiKhoan));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id
            , @RequestBody TaiKhoan taiKhoan) {
        if (!service.existsById(id)) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy"
            );
        }
        return ResponseEntity.ok(service.update(id, taiKhoan));
    }
}
