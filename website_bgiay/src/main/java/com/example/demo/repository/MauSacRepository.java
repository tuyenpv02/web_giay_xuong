package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.MauSac;
import com.example.demo.entity.ThuongHieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MauSacRepository extends JpaRepository<MauSac, Long>,
        JpaSpecificationExecutor<MauSac> {
    List<MauSac> findAllByOrderByIdDesc();

    List<MauSac> findByTen(String ten);
}
