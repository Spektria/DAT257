package com.defLeppard.controllers;

import com.defLeppard.services.DatabaseService;
import com.defLeppard.services.Event;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
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
 * @author Hugo Ekstrand, Jonas Röst
 */
@CrossOrigin
@RestController
@RequestMapping("/events")
public class EventsController {

    private final DateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    private DatabaseService dbs = new DatabaseService();


    public EventsController() throws ParseException {
    }


    /**
     * Returns all events within an interval. If no interval is specified all events are returned.
     * Returns bad request if "from" date is before "to" date or if there are no events in the given
     * date interval.
     *
     * @param from the start date
     * @param to   the end date
     * @return the list of events
     */
    @GetMapping("")
    @ResponseBody
    ResponseEntity<?> getEvents(@RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Optional<Date> from,
                                          @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Optional<Date> to) {

        // Note: date is in ISO format. For example if we want dates from 2022-01-01 to 2023-01-01 we
        //   should write:
        //  "/events?from=2022-01-01T00:00:00.000-00:00&to=2023-01-01T00:00:00.000-00:00"

        if (from.isPresent() && to.isPresent()) {

            // Check if argument from is before argument to time wise.
            if (!from.get().before(to.get()))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("End date is before start date");

            Date fromDate = from.get();
            Date toDate = to.get();

            Timestamp fromD = new Timestamp(fromDate.getTime());
            Timestamp toD = new Timestamp(toDate.getTime());
            try {

                var retEvents = dbs.fetchEventsInIntervall(fromD, toD);
                return ResponseEntity.status(HttpStatus.OK).body(retEvents);

            } catch (EmptyResultDataAccessException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not found");
            }

        }

        return ResponseEntity.status(HttpStatus.OK).body(dbs.fetchAllEvents());
    }

}
