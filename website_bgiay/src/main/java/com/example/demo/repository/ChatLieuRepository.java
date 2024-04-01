package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.DeGiay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatLieuRepository extends JpaRepository<ChatLieu, Long>, JpaSpecificationExecutor<ChatLieu> {

    List<ChatLieu> findAllByOrderByIdDesc();

    List<ChatLieu> findByTen(String ten);
}
