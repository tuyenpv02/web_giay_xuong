package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, Long> {
    @Query(value = "select * \n" +
            "from hoa_don_chi_tiet where idHoaDon = ?1", nativeQuery = true)
    List<HoaDonChiTiet> findByHoaDon(Long idHoaDon);

    @Query(value = " select * from hoa_don_chi_tiet\n" +
            "where idChiTietSanPham = ?1 and idHoaDon = ?2", nativeQuery = true)
    List<HoaDonChiTiet> findByHDAnIdCTSP(Long idChiTietSanPham,Long idHoaDon);
}
