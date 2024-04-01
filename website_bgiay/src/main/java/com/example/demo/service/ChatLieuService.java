package com.example.demo.service;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.ChatLieu;
import com.example.demo.repository.ChatLieuRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatLieuService {

    @Autowired
    private ChatLieuRepository repository;


    public List<ChatLieu> search(String text) {
        Specification<ChatLieu> specification = (root, query, criteriaBuilder) -> {
            Predicate likeTen = criteriaBuilder.like(root.get("ten"),"%"+text+"%");
            Predicate likeNguoiTao = criteriaBuilder.like(root.get("nguoiTao"),"%"+text+"%");

            return  criteriaBuilder.or(likeTen,likeNguoiTao);
        };
        return repository.findAll(specification);
    }

    public List<ChatLieu> getAll() {
        return repository.findAllByOrderByIdDesc();
    }

    public ChatLieu add(ChatLieu chatLieu) {
        return repository.save(chatLieu);
    }

    public ChatLieu update(Long id, ChatLieu newChatLieu) {
        Optional<ChatLieu> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTen(newChatLieu.getTen());
            o.setNguoiCapNhat(newChatLieu.getNguoiCapNhat());
            o.setNgayCapNhat(newChatLieu.getNgayCapNhat());
            o.setTrangThai(newChatLieu.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

    public ChatLieu updateTrangThai(Long id){
        Optional<ChatLieu> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(0);
            repository.save(o);
            return o;
        }).orElse(null);
    }

    public ChatLieu deleteById(Long id) {
        Optional<ChatLieu> optional = repository.findById(id);
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }
    public Boolean existsByMa(String ten) {
        return repository.findByTen(ten).size()>0;
    }

    public ChatLieu findById(Long id) {
        Optional<ChatLieu> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }

}
