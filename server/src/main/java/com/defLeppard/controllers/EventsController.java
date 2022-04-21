package com.defLeppard.controllers;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
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
    private List<Map<String, ?>> events =
            List.of(
                    Map.of(
                            "id", "1",
                            "title", "walking on water",
                            "location", "garderoben",
                            "from", new Date(),
                            "to", new Date(),
                            "students", new String[]{"Bob", "Neil Armstrong", "Mariana trench"},
                            "instructors", new String[]{"Lizardman"}
                            ),

                    Map.of(
                            "id", "2",
                            "title", "magnets. How do they work?",
                            "location", "mars",
                            "from", new Date(),
                            "to", new Date(),
                            "students", new String[]{"Richard Feynman", "Marie Curie", "Haskell Curry"},
                            "instructors", new String[]{"Oscean man", "Take me by the hand"}
                            )
                    );


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

                return evDFrom.after(from.get()) && evDTo.before(to.get());
            }).collect(Collectors.toList());
        }

        return ResponseEntity.status(HttpStatus.OK).body(ret);
    }



}
