package com.example.emissor_nfe.repositories;

import com.example.emissor_nfe.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository <User, String> {
        Optional<User> findByEmail(String email);
}
