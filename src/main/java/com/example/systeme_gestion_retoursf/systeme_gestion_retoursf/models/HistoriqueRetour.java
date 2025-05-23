package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoriqueRetour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private RetourProduit retour;

    private String action;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate date;
}
