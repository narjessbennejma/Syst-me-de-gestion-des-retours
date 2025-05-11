package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository;

import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.NonConformite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NonConformiteRepository extends JpaRepository<NonConformite, Long> {
}
