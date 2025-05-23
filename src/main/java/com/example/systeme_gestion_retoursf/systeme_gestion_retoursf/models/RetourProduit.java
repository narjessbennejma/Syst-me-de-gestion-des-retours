package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RetourProduit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Produit produit;

    @ManyToOne
    private User client;

    private String raison;
    private String etatTraitement;

    private LocalDate date;

    @ManyToOne
    private Commande commande;
}
