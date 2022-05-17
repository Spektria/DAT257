package com.defLeppard.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Arrays;
import java.util.Objects;

/**
 * Record for Educational Moments.
 * @author Hugo Ekstrand
 */
@JsonIgnoreProperties("description")
public record EduMoment(String name, String description, boolean complete){
    public EduMoment{
        // Note: There mustn't be a description but there must be a name (id) and
        //      state (bool).
        Arrays.stream(new String[]{name })
                .map(Objects::requireNonNull)
                .forEach(s -> {
                    if(s.isBlank())
                        throw new RuntimeException("Field is blank!");
                });
    }
}
