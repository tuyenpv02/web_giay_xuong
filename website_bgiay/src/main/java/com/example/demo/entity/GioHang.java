package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
@Entity
@Table(name = "gio_hang")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class GioHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idTaiKhoan", referencedColumnName = "id")
    private TaiKhoan taiKhoan;

    @ManyToOne
    @JoinColumn(name = "idChiTietSanPham", referencedColumnName = "id")
    private ChiTietSanPham chiTietSanPham;


    private Integer soLuong;
    private BigDecimal donGia;

}
