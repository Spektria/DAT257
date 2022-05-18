package com.defLeppard.entities;

import java.util.Arrays;
import java.util.Objects;
import java.util.UUID;

/**
 * Record for an instructor.
 * @author Hugo Ekstrand
 */
public record Instructor(String name, UUID id) {
    public Instructor{
        Arrays.asList(name, id).forEach(Objects::requireNonNull);
        if(name.isBlank())
            throw new RuntimeException("Blank name for instructor!");
    }
}
