package com.example.demo.controller;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hoa-don-chi-tiet")
@CrossOrigin("*")
public class HoaDonChiTietController {

    @Autowired
    HoaDonChiTietService service;

    @GetMapping("")
    public ResponseEntity<?> getAllByIdHoaDon(@RequestParam("idHoaDon")Long idHoaDon){
        return ResponseEntity.ok(service.getAllByIdHoaDon(idHoaDon));
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
    public ResponseEntity<?> add(@RequestBody HoaDonChiTiet hoaDonChiTiet) {
        return ResponseEntity.ok(service.add(hoaDonChiTiet));
    }
}
