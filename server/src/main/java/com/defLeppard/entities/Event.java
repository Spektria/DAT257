package com.defLeppard.entities;

import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Date;
import java.util.Objects;
import java.util.logging.SimpleFormatter;

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

    /**
     * Returns this event, but without timezone offsets. I.E. sets the timezone of the dates to and from to UTC.
     * @return the event without timezone offset
     */
    public Event asUTC(){
        final long HOUR = 3600*1000;
        Date from = new Date(this.from.getTime() + 2 * HOUR);
        Date to = new Date(this.to.getTime() +  + 2 * HOUR);
        if(id == 1)
            System.out.println("From :: " + from + "  -> " + to);
        return new Event(this.id,this.title,from,to,this.instructors,this.participants,this.location);
    }
}
