package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.DiaChi;
import com.example.demo.entity.ThuongHieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThuongHieuRepository extends JpaRepository<ThuongHieu, Long>,
        JpaSpecificationExecutor<ThuongHieu> {

    List<ThuongHieu> findAllByOrderByIdDesc();

    List<ThuongHieu> findByTen(String ten);
}
