package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.services;

import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.Produit;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.RetourProduit;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.ProduitRepository;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.RetourProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RetourProduitService {

    @Autowired
    private RetourProduitRepository repository;

    @Autowired
    private ProduitRepository produitRepository;

    public RetourProduit create(RetourProduit retour) {
        retour.setEtatTraitement("en cours");
        return repository.save(retour);
    }

    public List<RetourProduit> getAll() {
        return repository.findAll();
    }

    public Optional<RetourProduit> getById(Long id) {
        return repository.findById(id);
    }

    public RetourProduit update(Long id, RetourProduit retour) {
        retour.setId(id);
        return repository.save(retour);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }


    public RetourProduit traiterRetour(Long id, String nouvelEtat) {
        Optional<RetourProduit> retourProduitOpt = repository.findById(id);
        if (!retourProduitOpt.isPresent()) {
            throw new RuntimeException("Retour produit introuvable avec l'ID : " + id);
        }

        RetourProduit retourProduit = retourProduitOpt.get();
        retourProduit.setEtatTraitement(nouvelEtat);

        // Si le retour est accepté, on augmente le stock
        if ("accepte".equalsIgnoreCase(nouvelEtat)) {
            Produit produit = retourProduit.getProduit();
            produit.setStock(produit.getStock() + 1);
            produitRepository.save(produit);
        }

        return repository.save(retourProduit);
    }





}
