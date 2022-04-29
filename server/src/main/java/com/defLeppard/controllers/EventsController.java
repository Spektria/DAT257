package com.defLeppard.controllers;

import org.apache.tomcat.util.json.JSONParser;
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
    private List<Map<String, ?>> events =
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

    public EventsController() throws ParseException {
    }


    /**
     * Returns all events within an interval. If no interval is specified all events are returned.
     * Returns bad request if "from" date is before "to" date.
     * @param from the start date
     * @param to the end date
     * @return the list of events
     */
    @GetMapping("")
    @ResponseBody
    ResponseEntity<List<Map<String,?>>> getEvents(@RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Optional<Date> from,
                                                  @RequestParam("to")   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Optional<Date> to){

        // Note: date is in ISO format. For example if we want dates from 2022-01-01 to 2023-01-01 we
        //   should write:
        //  "/events?from=2022-01-01T00:00:00.000-00:00&to=2023-01-01T00:00:00.000-00:00"

        // TODO Replace with database sql call

        var ret = events;

        if(from.isPresent() && to.isPresent()){

            // Check if argument from is before argument to time wise.
            if(!from.get().before(to.get()))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<>());

            // Filter events so they are withing the given interval.
            ret = ret.stream().filter(ev -> {
                Date evDFrom = (Date)ev.get("from");
                Date evDTo = (Date)ev.get("from");

                BiPredicate<Date, Date> afterInclusive = (d1, d2) -> d1.equals(d2) || d1.after(d2);
                BiPredicate<Date, Date> beforeInclusive = (d1, d2) -> d1.equals(d2) || d1.before(d2);

                return afterInclusive.test(evDFrom, from.get()) && beforeInclusive.test(evDTo, to.get());
            }).collect(Collectors.toList());
        }

        return ResponseEntity.status(HttpStatus.OK).body(ret);
    }

    @PostMapping("/newsession")
    ResponseEntity<String> newSession(@RequestBody String state){
        return ResponseEntity.status(HttpStatus.OK).body(state);
    }


}
