package com.example.demo.service;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HoaDon;
import com.example.demo.repository.HoaDonRepository;
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
public class HoaDonService {
    @Autowired
    private HoaDonRepository repository;

    public List<HoaDon> getAll() {
        return repository.findAllByOrderByIdDesc();
    }

    public List<HoaDon> filter(String searchText, String trangThai
            , String loaiHoaDon, String ngayBatDau, String ngayKetThuc) {

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
            if (loaiHoaDon.trim().length() != 0) {
                Predicate specLoaiHD = criteriaBuilder.equal(root.get("loaiHoaDon"), loaiHoaDon);
                predicates.add(specLoaiHD);
            }

            if (!ngayBatDau.isEmpty() && !ngayKetThuc.isEmpty()) {
                try {
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                    Date parsedStartDate = dateFormat.parse(ngayBatDau);
                    Date parsedEndDate = dateFormat.parse(ngayKetThuc);
                    Timestamp timestampStartDate = new Timestamp(parsedStartDate.getTime());
                    Timestamp timestampEndDate = new Timestamp(parsedEndDate.getTime());

                    predicates.add(criteriaBuilder.between(root.get("ngayTao"), timestampStartDate, timestampEndDate));
                } catch (ParseException e) {
                    // Xử lý lỗi khi chuyển đổi ngày
                    e.printStackTrace();
                }
            }

            // Sắp xếp theo id (ASC)
            query.orderBy(criteriaBuilder.desc(root.get("id")));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
        return repository.findAll(specification);
//        return repository.filter(searchText, loaiHoaDon, trangThai, ngayBatDau, ngayKetThuc);
    }


    public HoaDon update(Long id, HoaDon newHoaDon) {
        Optional<HoaDon> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTaiKhoan(newHoaDon.getTaiKhoan());
            o.setHoTen(newHoaDon.getHoTen());
            o.setEmail(newHoaDon.getEmail());
            o.setSdt(newHoaDon.getSdt());
            o.setDiaChi(newHoaDon.getDiaChi());
            o.setHoTen(newHoaDon.getHoTen());

            o.setNguoiCapNhat(newHoaDon.getNguoiCapNhat());
            o.setNgayCapNhat(newHoaDon.getNgayCapNhat());
            o.setTrangThai(newHoaDon.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

    public HoaDon findById(Long id) {
        Optional<HoaDon> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }


    public Boolean existsByMa(String ma) {
        return repository.existsByMa(ma);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }
}
