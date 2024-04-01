package com.example.demo.repository;

import com.example.demo.entity.DeGiay;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeGiayRepository extends JpaRepository<DeGiay, Long>
        , JpaSpecificationExecutor<DeGiay>  {

    List<DeGiay> findAllByOrderByIdDesc();

    List<DeGiay> findByTen(String ten);


}
