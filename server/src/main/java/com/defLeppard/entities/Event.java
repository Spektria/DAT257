package com.defLeppard.entities;

import java.util.Arrays;
import java.util.Date;
import java.util.Objects;

/**
 * Record for events. Though it does differentiate from sql database with having
 * direct references to every instructor and participant names.
 *
 * @author Hugo Ekstrand
 */
public record Event(int id, String title, Date from, Date to, String[] instructors, Student[] participants, String location) {

    public Event{
        Arrays.asList(title, location, from, to, participants, instructors).forEach(Objects::requireNonNull);

        if(id < 0)
            throw new RuntimeException("Negative event id! " + id);

        Arrays.asList(title, location).stream().forEach(str ->{
            if(toString().isBlank())
                throw new RuntimeException("Blank field in Event!");
        });
    }

}
