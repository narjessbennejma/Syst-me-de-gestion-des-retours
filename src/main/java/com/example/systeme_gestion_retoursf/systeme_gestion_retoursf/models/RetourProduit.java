package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
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

    public RetourProduit() {
    }

    public RetourProduit(Produit produit, User client, String raison, String etatTraitement, LocalDate date) {
        this.produit = produit;
        this.client = client;
        this.raison = raison;
        this.etatTraitement = etatTraitement;
        this.date = date;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Produit getProduit() { return produit; }

    public void setProduit(Produit produit) { this.produit = produit; }

    public User getClient() { return client; }

    public void setClient(User client) { this.client = client; }

    public String getRaison() { return raison; }

    public void setRaison(String raison) { this.raison = raison; }

    public String getEtatTraitement() { return etatTraitement; }

    public void setEtatTraitement(String etatTraitement) { this.etatTraitement = etatTraitement; }

    public LocalDate getDate() { return date; }

    public void setDate(LocalDate date) { this.date = date; }
}

