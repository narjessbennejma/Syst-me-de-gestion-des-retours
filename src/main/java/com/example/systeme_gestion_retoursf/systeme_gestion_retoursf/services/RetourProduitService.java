package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.services;

import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.HistoriqueRetour;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.Produit;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.RetourProduit;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.User;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.HistoriqueRetourRepository;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.ProduitRepository;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.RetourProduitRepository;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RetourProduitService {

    @Autowired
    private RetourProduitRepository repository;

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private HistoriqueRetourRepository historiqueRetourRepository;

    @Autowired
    private UserRepository userRepository;
    public RetourProduit create(RetourProduit retour) {
        retour.setEtatTraitement("en cours");
        retour.setDate(LocalDate.now());
        RetourProduit savedRetour = repository.save(retour);

        HistoriqueRetour historique = new HistoriqueRetour();
        historique.setRetour(savedRetour);
        historique.setAction("Creation");
        historique.setUser(retour.getClient());
        historique.setDate(LocalDate.now());

        historiqueRetourRepository.save(historique);

        return savedRetour;
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




    public RetourProduit traiterRetour(Long id, String nouvelEtat, Long userId) {
        RetourProduit retourProduit = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Retour non trouvé"));

        retourProduit.setEtatTraitement(nouvelEtat);

        if ("accepte".equalsIgnoreCase(nouvelEtat)) {
            Produit produit = retourProduit.getProduit();
            produit.setStock(produit.getStock() + 1);
            produitRepository.save(produit);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        HistoriqueRetour historique = new HistoriqueRetour();
        historique.setRetour(retourProduit);
        historique.setAction(nouvelEtat);
        historique.setUser(user);
        historique.setDate(LocalDate.now());
        historiqueRetourRepository.save(historique);

        return repository.save(retourProduit);
    }



    public List<RetourProduit> getRetoursByClient(Long clientId) {
        return repository.findByClientId(clientId);
    }

    public List<RetourProduit> getRetoursEnCours() {
        return repository.findByEtatTraitement("en cours");
    }




}
