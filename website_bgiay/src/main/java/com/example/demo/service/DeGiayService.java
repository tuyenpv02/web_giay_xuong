package com.example.demo.service;

import com.example.demo.entity.DeGiay;
import com.example.demo.repository.DeGiayRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeGiayService {

    @Autowired
    private DeGiayRepository repository;

    public List<DeGiay> search(String text) {
        Specification<DeGiay> specification = (root, query, criteriaBuilder) -> {
            Predicate likeTen = criteriaBuilder.like(root.get("ten"),"%"+text+"%");
            Predicate likeNguoiTao = criteriaBuilder.like(root.get("nguoiTao"),"%"+text+"%");

            return  criteriaBuilder.or(likeTen,likeNguoiTao);
        };
        return repository.findAll(specification);
    }

    public List<DeGiay> getAll() {
        return repository.findAllByOrderByIdDesc();
    }

    public DeGiay add(DeGiay deGiay) {
        return repository.save(deGiay);
    }

    public DeGiay update(Long id, DeGiay newDeGiay) {
        Optional<DeGiay> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTen(newDeGiay.getTen());
            o.setNguoiCapNhat(newDeGiay.getNguoiCapNhat());
            o.setNgayCapNhat(newDeGiay.getNgayCapNhat());
            o.setTrangThai(newDeGiay.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

     public DeGiay updateTrangThai(Long id){
         Optional<DeGiay> optional = repository.findById(id);
         return optional.map(o -> {
             o.setTrangThai(0);
             repository.save(o);
             return o;
         }).orElse(null);
     }

    public DeGiay deleteById(Long id) {
        Optional<DeGiay> optional = repository.findById(id);
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

    public DeGiay findById(Long id) {
        Optional<DeGiay> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }
}
