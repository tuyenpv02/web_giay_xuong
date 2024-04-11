package com.example.demo.service;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.SanPham;
import com.example.demo.entity.ThuongHieu;
import com.example.demo.repository.SanPhamRepository;
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
public class SanPhamService {
    @Autowired
    private SanPhamRepository repository;

    public List<SanPham> filter(String searchText, String trangThai ) {
        Specification<SanPham> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            Predicate likeTen = criteriaBuilder.like(root.get("ten"), "%" + searchText + "%");
            Predicate likeNguoiTao = criteriaBuilder.like(root.get("nguoiTao"), "%" + searchText + "%");
            predicates.add(criteriaBuilder.or(likeNguoiTao, likeTen));
            if (trangThai.trim().length() != 0) {
                Predicate specTrangThai = criteriaBuilder.equal(root.get("trangThai"), trangThai);
                predicates.add(specTrangThai);
            }
            // Sắp xếp theo id (ASC)
            query.orderBy(criteriaBuilder.desc(root.get("id")));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
        return repository.findAll(specification);
    }

    public List<SanPham> search(String text) {
        Specification<SanPham> specification = (root, query, criteriaBuilder) -> {
            Predicate likeTen = criteriaBuilder.like(root.get("ten"), "%" + text + "%");
            Predicate likeNguoiTao = criteriaBuilder.like(root.get("nguoiTao"), "%" + text + "%");
            return criteriaBuilder.or(likeTen, likeNguoiTao);
        };
        return repository.findAll(specification);
    }

    public List<SanPham> getAll() {
        return repository.findAllByOrderByIdDesc();
    }

    public SanPham add(SanPham SanPham) {
        return repository.save(SanPham);
    }

    public SanPham update(Long id, SanPham newSanPham) {
        Optional<SanPham> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTen(newSanPham.getTen());
            o.setMoTa(newSanPham.getMoTa());
            o.setThuongHieu(ThuongHieu.builder().id(newSanPham.getThuongHieu().getId()).build());
            o.setNguoiCapNhat(newSanPham.getNguoiCapNhat());
            o.setNgayCapNhat(newSanPham.getNgayCapNhat());
            o.setTrangThai(newSanPham.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

    public SanPham updateTrangThai(Long id) {
        Optional<SanPham> optional = repository.findById(id);
        return optional.map(o -> {
            //
            o.setTrangThai(0);
            repository.save(o);
            return o;
        }).orElse(null);
    }

    public SanPham deleteById(Long id) {
        Optional<SanPham> optional = repository.findById(id);
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public Boolean existsByTen(String ten) {
        return repository.findByTen(ten).size() > 0;
    }

    public SanPham findById(Long id) {
        Optional<SanPham> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }

}
