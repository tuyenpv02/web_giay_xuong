package com.example.demo.repository;

import com.example.demo.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietSanPhamRepository extends JpaRepository<ChiTietSanPham, Long>
        , JpaSpecificationExecutor {

    @Query(value = "select * \n" +
            "from [chi_tiet_san_pham] where idSanPham = ?1", nativeQuery = true)
    List<ChiTietSanPham> findBySanPham(Long id);

    List<ChiTietSanPham> findAllByOrderByIdDesc();

    List<ChiTietSanPham> findByMa(String ma);


    @Query(value = "select top 1 * from [chi_tiet_san_pham] order by id desc", nativeQuery = true)
    ChiTietSanPham findTopMotCTSP();

}
