package com.defLeppard.entities;

import java.util.Arrays;
import java.util.Objects;
import java.util.UUID;

/**
 * Record for a Student.
 * @author Hugo Ekstrand
 */
public record Student(String name, String email, UUID id) {
    public Student{
        Objects.requireNonNull(id);
        Arrays.asList(name, email).stream()
                .map(Objects::requireNonNull)
                .forEach(str -> {
                    if(str.isBlank())
                        throw new RuntimeException("Blank string in student!");
                });
    }
}
