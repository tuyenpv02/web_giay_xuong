package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.DiaChi;
import com.example.demo.entity.GiamGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GiamGiaRepository extends JpaRepository<GiamGia, Long>
        , JpaSpecificationExecutor<GiamGia> {

    List<GiamGia> findAllByOrderByIdDesc();

    List<GiamGia> findByTen(String ten);
}
