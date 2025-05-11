package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository;


import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
}
