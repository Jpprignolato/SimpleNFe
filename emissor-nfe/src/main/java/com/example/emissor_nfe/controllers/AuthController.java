package com.example.emissor_nfe.controllers;

import com.example.emissor_nfe.domain.user.User;
import com.example.emissor_nfe.dto.LoginRequestDTO;
import com.example.emissor_nfe.dto.RegisterRequestDTO;
import com.example.emissor_nfe.dto.ResponseDTO;
import com.example.emissor_nfe.infra.security.TokenService;
import com.example.emissor_nfe.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO body) {
        User user = repository.findByEmail(body.email())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getName(), token));
        }

        return ResponseEntity.badRequest().body("Senha incorreta");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO body) {
        Optional<User> existingUser = repository.findByEmail(body.email());

        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Email já cadastrado");
        }

        User newUser = new User();
        newUser.setName(body.name());
        newUser.setEmail(body.email());
        newUser.setPassword(passwordEncoder.encode(body.password()));
        newUser.setAcceptTerms(body.acceptTerms());
        newUser.setAccount_creation_date(LocalDateTime.now());

        repository.save(newUser);

        String token = tokenService.generateToken(newUser);
        return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token));
    }
}
