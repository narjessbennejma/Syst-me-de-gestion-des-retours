package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.Controllers;

import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.RetourProduit;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.ProduitRepository;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.services.ProduitService;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.services.RetourProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/retours")
public class RetourProduitController {

    @Autowired
    private RetourProduitService service;
    @Autowired
    private RetourProduitService retourProduitService;

    @PostMapping
    public ResponseEntity<RetourProduit> create(@RequestBody RetourProduit retour) {
        RetourProduit created = service.create(retour);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping
    public List<RetourProduit> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RetourProduit> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RetourProduit> update(@PathVariable Long id, @RequestBody RetourProduit retour) {
        return ResponseEntity.ok(service.update(id, retour));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/etat")
    public ResponseEntity<RetourProduit> traiterRetour(
            @PathVariable Long id,
            @RequestParam String etat) {

        RetourProduit retour = service.traiterRetour(id, etat);
        return ResponseEntity.ok(retour);
    }


}

