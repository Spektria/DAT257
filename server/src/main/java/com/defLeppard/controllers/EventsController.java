package com.defLeppard.controllers;

import com.defLeppard.services.DatabaseService;
import com.defLeppard.services.Event;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.BiPredicate;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * REST controller for handling event information.
 *
 * @author Hugo Ekstrand
 */
@CrossOrigin
@RestController
@RequestMapping("/events")
public class EventsController {

    // Dummy list
    // TODO: replace with database
    private final DateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    /*private List<Map<String, ?>> events =
            List.of(
                    Map.of(
                            "id", "1",
                            "title", "periodTest",
                            "location", "garderoben",
                            "from", isoFormat.parse("2022-01-01T00:00:00.000-00:00"),
                            "to", isoFormat.parse("2022-01-01T10:00:00.000-00:00"),
                            "students", new String[]{"Bob", "Neil Armstrong", "Mariana trench"},
                            "instructors", new String[]{"Lizardman"}
                            ),

                    Map.of(
                            "id", "2",
                            "title", "magnets. How do they work?",
                            "location", "mars",
                            "from", isoFormat.parse("2022-03-01T11:00:00.000-00:00"),
                            "to", isoFormat.parse("2022-03-01T00:00:00.000-00:00"),
                            "students", new String[]{"Richard Feynman", "Marie Curie", "Haskell Curry"},
                            "instructors", new String[]{"Oscean man", "Take me by the hand"}
                            )
                    );
    */

    public EventsController() throws ParseException {
    }


    /**
     * Returns all events within an interval. If no interval is specified all events are returned.
     * Returns bad request if "from" date is before "to" date.
     *
     * @param from the start date
     * @param to   the end date
     * @return the list of events
     */
    @GetMapping("")
    @ResponseBody
    ResponseEntity<List<Event>> getEvents(@RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Optional<Date> from,
                                          @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Optional<Date> to) {

        // Note: date is in ISO format. For example if we want dates from 2022-01-01 to 2023-01-01 we
        //   should write:
        //  "/events?from=2022-01-01T00:00:00.000-00:00&to=2023-01-01T00:00:00.000-00:00"

        if (from.isPresent() && to.isPresent()) { //STILL TODO

            // Check if argument from is before argument to time wise.
            if (!from.get().before(to.get()))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("End date is before start date");;

            // Have to change the date format to SQL timestamp
            try {
                var ret = DatabaseService.fetchEventsInIntervall(from, to);
            } catch (EmptyResultDataAccessException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not found");
            }

            // BiPredicate<Date, Date> afterInclusive = (d1, d2) -> d1.equals(d2) || d1.after(d2);
            // BiPredicate<Date, Date> beforeInclusive = (d1, d2) -> d1.equals(d2) || d1.before(d2);
            return ResponseEntity.status(HttpStatus.OK).body(ret);
        }

        return ResponseEntity.status(HttpStatus.OK).body(DatabaseService.fetchAllEvents());
    }
}}



}
