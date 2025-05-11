package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.Controllers;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.HistoriqueRetour;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.services.HistoriqueRetourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historiques-retours")
public class HistoriqueRetourController {

    @Autowired
    private HistoriqueRetourService historiqueRetourService;

    // Ajouter un historique de retour produit
    @PostMapping
    public ResponseEntity<HistoriqueRetour> create(@RequestBody HistoriqueRetour historiqueRetour) {
        HistoriqueRetour created = historiqueRetourService.create(historiqueRetour);
        return ResponseEntity.status(201).body(created);
    }

    // Récupérer un historique de retour par ID
    @GetMapping("/{id}")
    public ResponseEntity<HistoriqueRetour> getById(@PathVariable Long id) {
        HistoriqueRetour historiqueRetour = historiqueRetourService.findById(id);
        if (historiqueRetour != null) {
            return ResponseEntity.ok(historiqueRetour);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //  Récupérer tous les historiques de retour
    @GetMapping
    public ResponseEntity<List<HistoriqueRetour>> getAll() {
        List<HistoriqueRetour> historiques = historiqueRetourService.findAll();
        return ResponseEntity.ok(historiques);
    }

    // Mettre à jour un historique de retour
    @PutMapping("/{id}")
    public ResponseEntity<HistoriqueRetour> update(@PathVariable Long id, @RequestBody HistoriqueRetour historiqueRetour) {
        HistoriqueRetour updated = historiqueRetourService.update(id, historiqueRetour);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un historique de retour
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = historiqueRetourService.delete(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

