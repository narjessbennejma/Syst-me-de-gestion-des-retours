package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository;

import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.RetourProduit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RetourProduitRepository extends JpaRepository<RetourProduit, Long> {
    List<RetourProduit> findByClientId(Long clientId);
    List<RetourProduit> findByEtatTraitement(String etat);
}
