package com.example.demo.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "hoa_don")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HoaDon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idTaiKhoan", referencedColumnName = "id")
    private TaiKhoan taiKhoan;

    @ManyToOne
    @JoinColumn(name = "idGiamGia", referencedColumnName = "id")
    private GiamGia giamGia;

    private String ma;
    private String hoTen;
    private String email;
    private String sdt;
    private String diaChi;

    private BigDecimal tongTien;
    private BigDecimal tienShip;
    private BigDecimal tienGiam;

    @Column(name = "ngayGiao")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Date ngayGiao;

    @Column(name = "ngayNhan")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Date ngayNhan;

    @Column(name = "ngayThanhToan")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Date ngayThanhToan;

    private String ghiChu;

    private Integer loaiHoaDon;
    private Integer trangThai;

    @Column(name = "ngayTao")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp ngayTao;
    @Column(name = "ngayCapNhat")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp ngayCapNhat;

    private String nguoiTao;
    private String nguoiCapNhat;


}
