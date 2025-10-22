package com.example.emissor_nfe.dto;

public record RegisterRequestDTO(String email, String password, String name, boolean acceptTerms) {
}
