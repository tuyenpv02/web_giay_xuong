package com.example.demo.service;

import com.example.demo.dto.FilterChiTietSP;
import com.example.demo.entity.*;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.repository.ChiTietSanPhamRepository;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
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

    public List<HoaDon> filter(FilterChiTietSP filterChiTietSP) {
        Specification<ChiTietSanPham> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            Predicate likeMa = criteriaBuilder.like(root.get("ma"), "%" + filterChiTietSP.getSearchText() + "%");
            Predicate likeTen = criteriaBuilder.like(root.get("ten"), "%" + filterChiTietSP.getSearchText() + "%");
            predicates.add(criteriaBuilder.or(likeMa, likeTen));

            if (filterChiTietSP.getTrangThai() != null && !filterChiTietSP.getTrangThai().isEmpty()) {
                Predicate specTrangThai = criteriaBuilder.equal(root.get("trangThai"), filterChiTietSP.getTrangThai());
                predicates.add(specTrangThai);
            }

//            if (filterChiTietSP.getChatLieu() != null && !filterChiTietSP.getChatLieu().isEmpty()) {
//                Join<ChiTietSanPham, ChatLieu> chatLieuJoin = root.join("chatLieu", JoinType.INNER);
//                Predicate chatLieuIdPredicate = criteriaBuilder.equal(chatLieuJoin.get("id"), filterChiTietSP.getChatLieu());
//                predicates.add(chatLieuIdPredicate);
//            }


            if (filterChiTietSP.getChatLieu() != null && !filterChiTietSP.getChatLieu().isEmpty()) {
                Join<ChiTietSanPham, MauSac> mauSacJoin = root.join("chatLieu", JoinType.INNER);
                predicates.add(mauSacJoin.get("id").in(filterChiTietSP.getChatLieu()));
            }

            if (filterChiTietSP.getDeGiay() != null && !filterChiTietSP.getDeGiay().isEmpty()) {
                Join<ChiTietSanPham, DeGiay> deGiayJoin = root.join("deGiay", JoinType.INNER);
                predicates.add(criteriaBuilder.equal(deGiayJoin.get("id"), filterChiTietSP.getDeGiay()));
            }

            if (filterChiTietSP.getMauSac() != null && !filterChiTietSP.getMauSac().isEmpty()) {
                Join<ChiTietSanPham, MauSac> mauSacJoin = root.join("mauSac", JoinType.INNER);
                predicates.add(criteriaBuilder.equal(mauSacJoin.get("id"), filterChiTietSP.getMauSac()));
            }

            if (filterChiTietSP.getKichCo() != null && !filterChiTietSP.getKichCo().isEmpty()) {
                Join<ChiTietSanPham, KichCo> kichCoJoin = root.join("kichCo", JoinType.INNER);
                predicates.add(criteriaBuilder.equal(kichCoJoin.get("id"), filterChiTietSP.getKichCo()));
            }

            if (filterChiTietSP.getMinGia() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("giaBan"), filterChiTietSP.getMinGia()));
            }

            if (filterChiTietSP.getMaxGia() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("giaBan"), filterChiTietSP.getMaxGia()));
            }


            // Sắp xếp theo id (ASC)
            query.orderBy(criteriaBuilder.desc(root.get("id")));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
        return repository.findAll(specification);
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
        chiTietSanPhams.stream().forEach(o -> System.out.println(o));
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
