package com.example.demo.repository;


import com.example.demo.entity.TaiKhoan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Long>
        , JpaSpecificationExecutor<TaiKhoan> {

    List<TaiKhoan> findAllByOrderByIdDesc();

    List<TaiKhoan> findBySdt(String sdt);

    @Query(value = " select *  from tai_khoan t  where\n" +
            "        t.vaiTro != 2 \n" +
            "        and t.trangThai like  concat('%', :trangThai, '%') \n" +
            "        and (\n" +
            "            CONCAT(t.ten,t.email)  like concat('%', :text, '%') \t \n" +
            "        ) order by t.id desc \n"
            , nativeQuery = true)
    List<TaiKhoan> filterNhanVien(@Param("text") String text, @Param("trangThai") String trangThai);

    @Query(value = "select * from tai_khoan t where t.vaiTro = 1 order by t.id desc", nativeQuery = true)
    List<TaiKhoan> findAllNhanVien();

    @Query(value = "select * from tai_khoan t where t.vaiTro = 2 order by t.id desc", nativeQuery = true)
    List<TaiKhoan> findAllKhachHang();

}
