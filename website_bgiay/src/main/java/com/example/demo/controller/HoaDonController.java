package com.example.demo.controller;

import com.example.demo.entity.HoaDon;
import com.example.demo.entity.KichCo;
import com.example.demo.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;

@RestController
@RequestMapping("/hoa-don")
@CrossOrigin("*")
public class HoaDonController {

    @Autowired
    HoaDonService service;

    @GetMapping("/filter")
    public ResponseEntity<?> filter(
            @RequestParam("searchText") String searchText,
            @RequestParam("trangThai") String trangThai,
            @RequestParam("loaiHoaDon") String loaiHoaDon,
            @RequestParam(value = "ngayBatDau", required = false) String ngayBatDau,
            @RequestParam(value = "ngayKetThuc", required = false) String ngayKetThuc
    ) {
        return ResponseEntity.ok(service.filter(searchText.trim(), trangThai.trim()
                , loaiHoaDon.trim(), ngayBatDau , ngayKetThuc ));
    }


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

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id
            , @RequestBody HoaDon hoaDon) {
        if (!service.existsById(id)) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy"
            );
        }
        System.out.println(hoaDon);
        System.out.println(hoaDon);
        System.out.println(hoaDon);
        System.out.println(hoaDon);
        return ResponseEntity.ok(service.update(id, hoaDon));
    }
}
