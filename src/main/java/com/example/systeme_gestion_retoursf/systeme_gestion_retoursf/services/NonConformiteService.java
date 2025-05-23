package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.services;

import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.dto.NonConformiteDTO;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.NonConformite;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.Produit;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.User;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.NonConformiteRepository;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.ProduitRepository;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Service
public class NonConformiteService {

    @Autowired
    private NonConformiteRepository nonConformiteRepository;
    private final ProduitRepository produitRepository;
    private final UserRepository userRepository;

    public NonConformiteService(NonConformiteRepository nonConformiteRepository,
                                ProduitRepository produitRepository,
                                UserRepository userRepository) {
        this.nonConformiteRepository = nonConformiteRepository;
        this.produitRepository = produitRepository;
        this.userRepository = userRepository;
    }
    public NonConformite createNonConformite(NonConformiteDTO dto) {
        Produit produit = produitRepository.findById(dto.produitId)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        User user = userRepository.findById(dto.employeQualiteId)
                .orElseThrow(() -> new RuntimeException("Employé introuvable"));

        NonConformite nc = new NonConformite();
        nc.setDescription(dto.description);
        nc.setGravite(dto.gravite);
        nc.setDate(LocalDate.from(dto.date));
        nc.setProduit(produit);
        nc.setEmployeQualite(user);

        return nonConformiteRepository.save(nc);
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

