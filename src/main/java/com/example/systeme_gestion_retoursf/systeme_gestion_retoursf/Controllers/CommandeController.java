package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.Controllers;

import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.Commande;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.services.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/commandes")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    @PostMapping
    public ResponseEntity<Commande> createCommande(@RequestBody Commande commande) {
        return ResponseEntity.ok(commandeService.createCommande(commande));
    }

    @GetMapping
    public List<Commande> getAllCommandes() {
        return commandeService.getAllCommandes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Commande> getCommandeById(@PathVariable Long id) {
        Optional<Commande> commande = commandeService.getCommandeById(id);
        return commande.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Commande> updateCommande(@PathVariable Long id, @RequestBody Commande commandeDetails) {
        Commande updatedCommande = commandeService.updateCommande(id, commandeDetails);
        return ResponseEntity.ok(updatedCommande);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommande(@PathVariable Long id) {
        commandeService.deleteCommande(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Commande>> getCommandesByClient(@PathVariable Long clientId) {
        List<Commande> commandes = commandeService.getCommandesByClient(clientId);
        return commandes.isEmpty() ?
                ResponseEntity.noContent().build() :
                ResponseEntity.ok(commandes);
    }
}

