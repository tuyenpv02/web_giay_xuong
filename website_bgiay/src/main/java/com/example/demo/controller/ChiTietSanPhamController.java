package com.example.demo.controller;

import com.example.demo.repository.AnhRepository;
import com.example.demo.repository.ChatLieuRepository;
import com.example.demo.repository.ChiTietSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chi-tiet-sp")
@CrossOrigin("*")
public class ChiTietSanPhamController {

    @Autowired
    private ChiTietSanPhamRepository repository;

    @GetMapping("")
    public ResponseEntity<?> getData(){

        return ResponseEntity.ok(repository.findAll());
    }
}
