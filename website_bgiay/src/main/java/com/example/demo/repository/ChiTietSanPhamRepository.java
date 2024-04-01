package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietSanPhamRepository extends JpaRepository<ChiTietSanPham, Long>
        , JpaSpecificationExecutor {

    List<ChiTietSanPham> findAllByOrderByIdDesc();

    List<ChiTietSanPham> findByMa(String ma);
}
