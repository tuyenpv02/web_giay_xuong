package com.example.demo.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "san_pham")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class SanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idThuongHieu", referencedColumnName = "id")
    private ThuongHieu thuongHieu;

    @Column(name = "ten")
    private String ten;

    @Column(name = "moTa")
    private String moTa;

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
