
package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Utilisateur")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String email;
    private String password;

    private String role = "user";

    public User(String nom, String email, String role) {
        this.nom = nom;
        this.email = email;
        this.role = (role == null || role.isEmpty()) ? "user" : role;
    }
}

