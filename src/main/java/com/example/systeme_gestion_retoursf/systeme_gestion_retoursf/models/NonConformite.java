package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models;


import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class NonConformite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String gravite;
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;

    @ManyToOne
    @JoinColumn(name = "employe_qualite_id")
    private User employeQualite;

    public NonConformite() {
    }

    public NonConformite(String description, String gravite, LocalDate date, Produit produit, User employeQualite) {
        this.description = description;
        this.gravite = gravite;
        this.date = date;
        this.produit = produit;
        this.employeQualite = employeQualite;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGravite() {
        return gravite;
    }

    public void setGravite(String gravite) {
        this.gravite = gravite;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public User getEmployeQualite() {
        return employeQualite;
    }

    public void setEmployeQualite(User employeQualite) {
        this.employeQualite = employeQualite;
    }
}


