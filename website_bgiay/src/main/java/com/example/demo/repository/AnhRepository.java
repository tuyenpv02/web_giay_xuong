package com.example.demo.repository;

import com.example.demo.entity.Anh;
import com.example.demo.entity.ChatLieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnhRepository extends JpaRepository<Anh, Long>
  {

    List<ChatLieu> findByTen(String ten);
}
