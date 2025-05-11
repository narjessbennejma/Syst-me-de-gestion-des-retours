package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models;


import jakarta.persistence.*;


@Entity
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String labelle;
    private Double prix;
    private Integer stock;


    public Produit() {
    }

    public Produit(Long id, String labelle, Double prix, Integer stock) {
        this.id = id;
        this.labelle = labelle;
        this.prix = prix;
        this.stock = stock;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabelle() {
        return labelle;
    }

    public void setLabelle(String labelle) {
        this.labelle = labelle;
    }

    public Double getPrix() {
        return prix;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}

