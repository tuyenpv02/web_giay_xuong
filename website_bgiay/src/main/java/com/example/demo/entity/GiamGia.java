package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "giam_gia")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class GiamGia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ma;
    private String ten;

    private Integer soLuong;

    @Column(name = "dieuKien")
    private BigDecimal dieuKien; // gia tri hoa don toi thieu  (value hd > dieuKien)

    @Column(name = "giaTriGiam")
    private BigDecimal giaTriGiam;  // giam tien mat

    @Column(name = "ngayBatDau")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp ngayBatDau;

    @Column(name = "ngayKetThuc")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp ngayKetThuc;


    private String nguoiTao;
    private String nguoiCapNhat;

    @Column(name = "ngayTao")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp ngayTao;
    @Column(name = "ngayCapNhat")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp ngayCapNhat;

    private Integer trangThai;


}
