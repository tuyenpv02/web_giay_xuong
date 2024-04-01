package com.example.demo.controller;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.DeGiay;
import com.example.demo.service.ChatLieuService;
import com.example.demo.service.DeGiayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat-lieu")
@CrossOrigin("*")
public class ChatLieuController {

    @Autowired
    ChatLieuService service;

    @GetMapping("search")
    public ResponseEntity<?> getAll(
            @RequestParam("seachText") String seachText

    ) {
        return ResponseEntity.ok(service.search(seachText));
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
    public ResponseEntity<?> add(@RequestBody ChatLieu chatLieu) {
        if (service.existsByMa(chatLieu.getTen())) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
                    "Tên đã tồn tại"
            );
        }
        return ResponseEntity.ok(service.add(chatLieu));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id
            , @RequestBody ChatLieu chatLieu) {
        if (!service.existsById(id)) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy"
            );
        }
        return ResponseEntity.ok(service.update(id, chatLieu));
    }

}
