package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LigneCommande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference // Éviter une boucle infinie
    private Commande commande;

    @ManyToOne
    private Produit produit;

    private int quantite;
    private double prix;
}
