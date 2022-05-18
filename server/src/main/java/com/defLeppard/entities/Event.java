package com.defLeppard.entities;

import java.util.Arrays;
import java.util.Date;
import java.util.Objects;
import java.util.function.Function;

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
     * Note: Uses deprecated methods!
     */
    @Deprecated
    public Event removeDateOffsets(){
        final long MINUTES = 60*1000;
        Function<Date, Date> removeOffset = (d) -> new Date(d.getTime() - d.getTimezoneOffset() * MINUTES);
        return new Event(this.id
                , this.title
                , removeOffset.apply(this.from)
                , removeOffset.apply(this.to)
                , this.instructors
                , this.participants
                , this.location);
    }
}
