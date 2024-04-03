package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "hoa_don_chi_tiet")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HoaDonChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idHoaDon", referencedColumnName = "id")
    @JsonIgnore
    private HoaDon hoaDon;

    @ManyToOne
    @JoinColumn(name = "idChiTietSanPham", referencedColumnName = "id")
    private ChiTietSanPham chiTietSanPham;


    private Integer soLuong;
    private BigDecimal donGia;

    private Integer trangThai;
}
