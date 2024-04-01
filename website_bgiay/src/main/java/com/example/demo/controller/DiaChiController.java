package com.example.demo.controller;

import com.example.demo.entity.DiaChi;
import com.example.demo.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dia-chi")
@CrossOrigin("*")
public class DiaChiController {

    @Autowired
    DiaChiService service;

    @GetMapping("/tai-khoan/{id}")
    public ResponseEntity<?> findByIdTaiKhoan(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.findByIdTaiKhoan(id));
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
    public ResponseEntity<?> add(@RequestBody DiaChi diaChi) {
        return ResponseEntity.ok(service.add(diaChi));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id
            , @RequestBody DiaChi diaChi) {
        if (!service.existsById(id)) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy"
            );
        }
        return ResponseEntity.ok(service.update(id, diaChi));
    }
}
