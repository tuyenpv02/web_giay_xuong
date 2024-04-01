package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.DeGiay;
import com.example.demo.entity.DiaChi;
import com.example.demo.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaChiRepository extends JpaRepository<DiaChi, Long>
        , JpaSpecificationExecutor<DiaChi> {

    List<DiaChi> findAllByOrderByIdDesc();

    @Query(value = "SELECT [id]\n" +
            "      ,[idTaiKhoan]\n" +
            "      ,[ten]\n" +
            "      ,[sdt]\n" +
            "      ,[thanhPho]\n" +
            "      ,[huyen]\n" +
            "      ,[xa]\n" +
            "      ,[moTa]\n" +
            "      ,[ngayTao]\n" +
            "      ,[ngayCapNhat]\n" +
            "      ,[nguoiTao]\n" +
            "      ,[nguoiCapNhat]\n" +
            "      ,[trangThai]\n" +
            "  FROM [dbo].[dia_chi] where idTaiKhoan = :idTaiKhoan", nativeQuery = true)
    List<DiaChi> findByTaiKhoan(@Param("idTaiKhoan") Long id);
}
