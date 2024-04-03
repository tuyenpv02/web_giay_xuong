package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.LichSuHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LichSuHoaDonRepository extends JpaRepository<LichSuHoaDon, Long> {

    @Query(value = "select * \n" +
            "from [lich_su_hoa_don] where idHoaDon = ?1", nativeQuery = true)
    List<LichSuHoaDon> findByHoaDon(Long idHoaDon);
}
