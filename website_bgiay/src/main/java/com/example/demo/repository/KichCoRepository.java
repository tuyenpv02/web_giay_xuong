package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.KichCo;
import com.example.demo.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KichCoRepository extends JpaRepository<KichCo, Long>,
        JpaSpecificationExecutor<KichCo> {

    List<KichCo> findAllByOrderByIdDesc();

    List<KichCo> findByTen(String ten);
}
