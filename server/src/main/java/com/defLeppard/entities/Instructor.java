package com.defLeppard.entities;

import java.util.Arrays;
import java.util.Objects;

/**
 * Record for an instructor.
 * @author Hugo Ekstrand
 */
public record Instructor(String name) {
    public Instructor{
        Arrays.asList(name).forEach(Objects::requireNonNull);
        if(name.isBlank())
            throw new RuntimeException("Blank name for instructor!");
    }
}
