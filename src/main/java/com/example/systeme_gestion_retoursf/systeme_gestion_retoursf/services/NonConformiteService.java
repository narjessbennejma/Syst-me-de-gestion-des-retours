package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.services;

import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.NonConformite;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.Produit;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.NonConformiteRepository;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class NonConformiteService {

    @Autowired
    private NonConformiteRepository nonConformiteRepository;

    public NonConformite create(NonConformite nonConformite) {
        return nonConformiteRepository.save(nonConformite);
    }

    public List<NonConformite> getAll() {
        return nonConformiteRepository.findAll();
    }

    public Optional<NonConformite> getById(Long id) {
        return nonConformiteRepository.findById(id);
    }

    public NonConformite update(Long id, NonConformite nonConformite) {
        nonConformite.setId(id);
        return nonConformiteRepository.save(nonConformite);
    }

    public void delete(Long id) {
        nonConformiteRepository.deleteById(id);
    }
}

