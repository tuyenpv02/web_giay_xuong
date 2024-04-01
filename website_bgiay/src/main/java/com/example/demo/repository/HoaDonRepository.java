package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Long>, JpaSpecificationExecutor {

    List<HoaDon> findAllByOrderByIdDesc();

    Boolean existsByMa(String ma);

    @Query(value = "select * from hoa_don hd \n" +
            "where hd.loaiHoaDon like  concat('%', :loaiHoaDon, '%') \n" +
            "and hd.trangThai like  concat('%', :trangThai, '%') \n" +
            "and  ngayTao BETWEEN :ngayBatDau and  :ngayKetThuc \n" +
            "and CONCAT(hd.ma,hd.hoTen)  like concat('%', :text, '%') " +
            "order by hd.id desc ", nativeQuery = true)
    List<HoaDon> filter(@Param("text") String text
            , @Param("loaiHoaDon") String loaiHoaDon, @Param("trangThai") String trangThai
            , @Param("ngayBatDau") String ngayBatDau, @Param("ngayKetThuc") String ngayKetThuc);
}
