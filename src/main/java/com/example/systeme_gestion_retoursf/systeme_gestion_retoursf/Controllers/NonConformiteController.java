package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.Controllers;


import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.NonConformite;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.User;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.services.NonConformiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/non-conformites")
public class NonConformiteController {

    @Autowired
    private NonConformiteService nonConformiteService;

    // Création d'une non-conformité
    @PostMapping
    public ResponseEntity<NonConformite> create(@RequestBody NonConformite nonConformite) {
        NonConformite created = nonConformiteService.create(nonConformite);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Récupérer toutes les non-conformités
    @GetMapping
    public List<NonConformite> getAll() {
        return nonConformiteService.getAll();
    }

    // Récupérer une non-conformité par ID
    @GetMapping("/{id}")
    public ResponseEntity<NonConformite> getById(@PathVariable Long id) {
        Optional<NonConformite> nonConformiteOpt = nonConformiteService.getById(id);
        return nonConformiteOpt
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Mise à jour d'une non-conformité
    @PutMapping("/{id}")
    public ResponseEntity<NonConformite> update(@PathVariable Long id, @RequestBody NonConformite nonConformite) {
        NonConformite updated = nonConformiteService.update(id, nonConformite);
        return ResponseEntity.ok(updated);
    }

    // Suppression d'une non-conformité
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        nonConformiteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

