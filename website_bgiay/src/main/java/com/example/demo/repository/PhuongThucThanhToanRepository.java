package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.entity.PhuongThucThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhuongThucThanhToanRepository extends JpaRepository<PhuongThucThanhToan, Long> {

    @Query(value = "select * \n" +
            "from [phuong_thuc_thanh_toan] where idHoaDon = ?1", nativeQuery = true)
    List<PhuongThucThanhToan> findByHoaDon(Long idHoaDon);
}
