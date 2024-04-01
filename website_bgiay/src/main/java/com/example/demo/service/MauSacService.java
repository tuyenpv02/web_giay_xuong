package com.example.demo.service;

import com.example.demo.entity.MauSac;
import com.example.demo.repository.MauSacRepository;
import com.example.demo.repository.MauSacRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MauSacService {

    @Autowired
    private MauSacRepository repository;


    public List<MauSac> search(String text) {
        Specification<MauSac> specification = (root, query, criteriaBuilder) -> {
            Predicate likeTen = criteriaBuilder.like(root.get("ten"),"%"+text+"%");
            Predicate likeNguoiTao = criteriaBuilder.like(root.get("nguoiTao"),"%"+text+"%");

            return  criteriaBuilder.or(likeTen,likeNguoiTao);
        };
        return repository.findAll(specification);
    }

    public List<MauSac> getAll() {
        return repository.findAllByOrderByIdDesc();
    }

    public MauSac add(MauSac mauSac) {
        return repository.save(mauSac);
    }

    public MauSac update(Long id, MauSac newMauSac) {
        Optional<MauSac> optional = repository.findById(id);
        return optional.map(o -> {
            o.setMaMau(newMauSac.getMaMau());
            o.setTen(newMauSac.getTen());
            o.setNguoiCapNhat(newMauSac.getNguoiCapNhat());
            o.setNgayCapNhat(newMauSac.getNgayCapNhat());
            o.setTrangThai(newMauSac.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

    public MauSac updateTrangThai(Long id){
        Optional<MauSac> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(0);
            repository.save(o);
            return o;
        }).orElse(null);
    }

    public MauSac deleteById(Long id) {
        Optional<MauSac> optional = repository.findById(id);
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }
    public Boolean existsByMa(String ten) {
        return repository.findByTen(ten).size()>0;
    }

    public MauSac findById(Long id) {
        Optional<MauSac> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }

}
