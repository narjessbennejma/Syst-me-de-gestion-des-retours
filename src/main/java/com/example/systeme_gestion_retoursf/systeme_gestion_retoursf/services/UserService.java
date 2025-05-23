package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.services;

import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.dto.SigninRequest;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.dto.SignupRequest;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.User;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.UserRepository;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Créer un nouvel utilisateur
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Obtenir tous les utilisateurs
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Obtenir un utilisateur par son ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Mettre à jour un utilisateur
    public User updateUser(Long id, User updatedUser) {
        if (userRepository.existsById(id)) {
            Optional<User> existingUserOpt = userRepository.findById(id);
            if (existingUserOpt.isPresent()) {
                User existingUser = existingUserOpt.get();
                existingUser.setNom(updatedUser.getNom());
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setPassword(updatedUser.getPassword());
                existingUser.setRole(updatedUser.getRole());
                return userRepository.save(existingUser);
            }
            return null;

        }
        return null;
    }

    // Supprimer un utilisateur
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }


    // Méthode pour créer un utilisateur avec un mot de passe hashé
    public User signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = new User();
        user.setNom(request.getNom());
        user.setEmail(request.getEmail());

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(hashedPassword);

        // Définir "USER" comme rôle par défaut si non fourni
        String role = request.getRole();
        user.setRole((role == null || role.trim().isEmpty()) ? "USER" : role);

        return userRepository.save(user);
    }



    // Méthode pour authentifier un utilisateur
    public String signin(SigninRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Vérifier si le mot de passe correspond au hash stocké
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return jwtUtil.generateToken(user.getId(),user.getEmail(), user.getRole());
            }
        }
        return null;
    }
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }



    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


}