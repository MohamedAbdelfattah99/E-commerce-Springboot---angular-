package com.ecommerce.springboot.dao;

import com.ecommerce.springboot.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import com.ecommerce.springboot.entity.State;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource()
public interface CountryRepostory extends JpaRepository<Country,Integer > {
}
