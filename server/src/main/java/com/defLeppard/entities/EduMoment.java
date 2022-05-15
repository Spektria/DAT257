package com.defLeppard.entities;

import java.util.Arrays;
import java.util.Objects;

/**
 * Record for Educational Moments.
 * @author Hugo Ekstrand
 */
public record EduMoment(String name, String description, boolean complete){
    public EduMoment{
        Arrays.stream(new String[]{name, description })
                .map(Objects::requireNonNull)
                .forEach(s -> {
                    if(s.isBlank())
                        throw new RuntimeException("Field is blank!");
                });
    }
}
