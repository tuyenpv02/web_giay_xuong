package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.repository.ChiTietSanPhamRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ChiTietSanPhamService {


    @Autowired
    private ChiTietSanPhamRepository repository;

    public List<HoaDon> filter(String searchText, String trangThai
            ) {
        Specification<ChiTietSanPham> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            Predicate likeTen = criteriaBuilder.like(root.get("ma"), "%" + searchText + "%");
            Predicate likeNguoiTao = criteriaBuilder.like(root.get("hoTen"), "%" + searchText + "%");
            Predicate likeEmail = criteriaBuilder.like(root.get("email"), "%" + searchText + "%");
            Predicate likeSdt = criteriaBuilder.like(root.get("sdt"), "%" + searchText + "%");
            predicates.add(criteriaBuilder.or(likeNguoiTao,likeTen,likeEmail,likeSdt));

            if (trangThai.trim().length() != 0) {
                Predicate specTrangThai = criteriaBuilder.equal(root.get("trangThai"), trangThai);
                predicates.add(specTrangThai);
            }

            // Sắp xếp theo id (ASC)
            query.orderBy(criteriaBuilder.desc(root.get("id")));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
        return repository.findAll(specification);
//        return repository.filter(searchText, loaiHoaDon, trangThai, ngayBatDau, ngayKetThuc);
    }

    public List<ChiTietSanPham> getAllByIdSanPham(Long idSP) {
        return repository.findBySanPham(idSP);
    }

    public List<ChiTietSanPham> getAll() {
        return repository.findAllByOrderByIdDesc();
    }

    public ChiTietSanPham add(ChiTietSanPham chiTietSanPham) {
        chiTietSanPham.setId(null);
        ChiTietSanPham ctsp = repository.findTopMotCTSP();
        if (ctsp == null) {
            String ma = "SPCT1000" + 1;
            chiTietSanPham.setMa(ma);
            return repository.save(chiTietSanPham);
        } else {
            String maHoaDon = "SPCT000" + (ctsp.getId() + 1);
            chiTietSanPham.setMa(maHoaDon);
            return repository.save(chiTietSanPham);
        }
    }

    public List<ChiTietSanPham> addDanhSach(List<ChiTietSanPham> chiTietSanPhams) {
        chiTietSanPhams.stream().forEach(o-> System.out.println(o));
       return repository.saveAll(chiTietSanPhams);
    }

    public ChiTietSanPham update(Long id, ChiTietSanPham newChiTietSanPham) {
        Optional<ChiTietSanPham> optional = repository.findById(id);
        return optional.map(o -> {
//            o.setSanPham(SanPham.builder().id(newChiTietSanPham.getSanPham().getId()).build());
            o.setMauSac(MauSac.builder().id(newChiTietSanPham.getMauSac().getId()).build());
            o.setKichCo(KichCo.builder().id(newChiTietSanPham.getKichCo().getId()).build());
            o.setChatLieu(ChatLieu.builder().id(newChiTietSanPham.getChatLieu().getId()).build());
            o.setDeGiay(DeGiay.builder().id(newChiTietSanPham.getDeGiay().getId()).build());

//            o.setMa(newChiTietSanPham.getMa());
            o.setTen(newChiTietSanPham.getTen());
            o.setSoLuong(newChiTietSanPham.getSoLuong());
            o.setGiaBan(newChiTietSanPham.getGiaBan());
            o.setMoTa(newChiTietSanPham.getMoTa());

            o.setNguoiCapNhat(newChiTietSanPham.getNguoiCapNhat());
            o.setNgayCapNhat(newChiTietSanPham.getNgayCapNhat());
            o.setTrangThai(newChiTietSanPham.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

    public ChiTietSanPham updateTrangThai(Long id) {
        Optional<ChiTietSanPham> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(0);
            repository.save(o);
            return o;
        }).orElse(null);
    }

    public ChiTietSanPham deleteById(Long id) {
        Optional<ChiTietSanPham> optional = repository.findById(id);
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public Boolean existsByMa(String ma) {
        return repository.findByMa(ma).size() > 0;
    }

    public ChiTietSanPham findById(Long id) {
        Optional<ChiTietSanPham> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }

}
