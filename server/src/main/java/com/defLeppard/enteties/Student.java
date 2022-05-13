package com.defLeppard.enteties;

import java.util.Arrays;
import java.util.Objects;

/**
 * Record for a Student.
 * @author Hugo Ekstrand
 */
public record Student(String name, String email) {
    public Student{
        Arrays.asList(name, email).stream()
                .map(Objects::requireNonNull)
                .forEach(str -> {
                    if(str.isBlank())
                        throw new RuntimeException("Blank string in student!");
                });
    }
}
