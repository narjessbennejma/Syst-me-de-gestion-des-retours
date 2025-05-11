package com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.services;

import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.models.HistoriqueRetour;
import com.example.systeme_gestion_retoursf.systeme_gestion_retoursf.repository.HistoriqueRetourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HistoriqueRetourService {

    @Autowired
    private HistoriqueRetourRepository repository;

    public HistoriqueRetour create(HistoriqueRetour historique) {
        return repository.save(historique);
    }

    public HistoriqueRetour findById(Long id) {
        Optional<HistoriqueRetour> historique = repository.findById(id);
        return historique.orElse(null);
    }

    public List<HistoriqueRetour> findAll() {
        return repository.findAll();
    }

    public HistoriqueRetour update(Long id, HistoriqueRetour historique) {
        if (repository.existsById(id)) {
            historique.setId(id);
            return repository.save(historique);
        }
        return null;
    }

    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}

