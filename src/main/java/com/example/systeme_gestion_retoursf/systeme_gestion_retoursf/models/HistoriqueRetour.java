package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class HistoriqueRetour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private RetourProduit retour;

    private String action;

    // Employé qui a effectué l'action
    @ManyToOne
    private User employe;

    private LocalDate date;

    public HistoriqueRetour() {}

    public HistoriqueRetour(RetourProduit retour, String action, User employe, LocalDate date) {
        this.retour = retour;
        this.action = action;
        this.employe = employe;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RetourProduit getRetour() {
        return retour;
    }

    public void setRetour(RetourProduit retour) {
        this.retour = retour;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public User getEmploye() {
        return employe;
    }

    public void setEmploye(User employe) {
        this.employe = employe;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
