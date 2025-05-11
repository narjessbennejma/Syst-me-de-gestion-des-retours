package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository;

import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Méthode pour trouver des utilisateurs par rôle
    List<User> findByRole(String role);

    Optional<User> findByEmail(String email);

}
