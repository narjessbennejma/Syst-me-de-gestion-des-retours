package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.services;


import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.Commande;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.LigneCommande;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.Produit;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.CommandeRepository;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.LigneCommandeRepository;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private LigneCommandeRepository ligneCommandeRepository;

    @Autowired
    private ProduitRepository produitRepository;


    public Commande createCommande(Commande commande) {
        //  sauvegarder la commande sans lignes
        List<LigneCommande> lignes = commande.getLignes();
        commande.setLignes(null);
        Commande savedCommande = commandeRepository.save(commande);

        // enregistrer les lignes
        for (LigneCommande ligne : lignes) {
            Produit produit = produitRepository.findById(ligne.getProduit().getId())
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé"));

            // Assigner le prix du produit à la ligne de commande
            ligne.setPrix(produit.getPrix());

            // Vérifier stock
            if (produit.getStock() < ligne.getQuantite()) {
                throw new RuntimeException("Stock insuffisant pour le produit : " + produit.getLabelle());
            }

            // Diminuer stock
            produit.setStock(produit.getStock() - ligne.getQuantite());
            produitRepository.save(produit);

            // Lier la ligne à la commande
            ligne.setCommande(savedCommande);
            ligneCommandeRepository.save(ligne);
        }

        savedCommande.setLignes(lignes);
        return savedCommande;
    }



    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    public Optional<Commande> getCommandeById(Long id) {
        return commandeRepository.findById(id);
    }

    public Commande updateCommande(Long id, Commande commandeDetails) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée"));
        commande.setClient(commandeDetails.getClient());
        commande.setDateCommande(commandeDetails.getDateCommande());
        return commandeRepository.save(commande);
    }

    public void deleteCommande(Long id) {
        commandeRepository.deleteById(id);
    }

    public List<Commande> getCommandesByClient(Long clientId) {
        return commandeRepository.findByClientId(clientId);
    }
}

