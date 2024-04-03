package com.example.demo.controller;

import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.entity.PhuongThucThanhToan;
import com.example.demo.service.LichSuHoaDonService;
import com.example.demo.service.PhuongThucThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/phuong-thuc-thanh-toan")
@CrossOrigin("*")
public class PhuongThucThanhToanController {


    @Autowired
    private PhuongThucThanhToanService service;

    @GetMapping("")
    public ResponseEntity<?> getAllByIdHoaDon(@RequestParam("idHoaDon") Long idHoaDon) {
        return ResponseEntity.ok(service.getAllByIdHoaDon(idHoaDon));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody PhuongThucThanhToan phuongThucThanhToan) {
        return ResponseEntity.ok(service.add(phuongThucThanhToan));
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

}
