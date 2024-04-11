package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor@NoArgsConstructor
public class FilterChiTietSP {
    private String searchText;
    private String mauSac;
    private String kichCo;
    private String deGiay;
    private List<String> chatLieu;
    private Double minGia;
    private Double maxGia;
    private String trangThai;
}
