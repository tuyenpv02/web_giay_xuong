package com.example.demo.service;

import com.example.demo.entity.KichCo;
import com.example.demo.repository.KichCoRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KichCoService {

    @Autowired
    private KichCoRepository repository;


    public List<KichCo> search(String text) {
        Specification<KichCo> specification = (root, query, criteriaBuilder) -> {
            Predicate likeTen = criteriaBuilder.like(root.get("ten"),"%"+text+"%");
            Predicate likeNguoiTao = criteriaBuilder.like(root.get("nguoiTao"),"%"+text+"%");

            return  criteriaBuilder.or(likeTen,likeNguoiTao);
        };
        return repository.findAll(specification);
    }

    public List<KichCo> getAll() {
        return repository.findAllByOrderByIdDesc();
    }

    public KichCo add(KichCo kichCo) {
        return repository.save(kichCo);
    }

    public KichCo update(Long id, KichCo newKichCo) {
        Optional<KichCo> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTen(newKichCo.getTen());
            o.setNguoiCapNhat(newKichCo.getNguoiCapNhat());
            o.setNgayCapNhat(newKichCo.getNgayCapNhat());
            o.setTrangThai(newKichCo.getTrangThai());
            return repository.save(o);
        }).orElse(null);
    }

    public KichCo updateTrangThai(Long id){
        Optional<KichCo> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(0);
            repository.save(o);
            return o;
        }).orElse(null);
    }

    public KichCo deleteById(Long id) {
        Optional<KichCo> optional = repository.findById(id);
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

    public KichCo findById(Long id) {
        Optional<KichCo> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }

}
