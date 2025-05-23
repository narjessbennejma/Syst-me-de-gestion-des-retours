package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository;


import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {

    List<Commande> findByClientId(Long clientId);
}

