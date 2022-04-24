package com.defLeppard.controllers;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Hugo Ekstarand
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EventsControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate template;

    @Test
    public void getEventsInPeriodTest(){
        // In mock database/hardcode there should exist
        // more than 1 events and 1 and only 1 event with the title "periodTest" which is during:
        // from 2022-01-01T00:00:00.000-00:00 to 2022-01-01T10:00:00.000-00:00
        // for this test to be valid

        final String from = "2022-01-01T00:00:00.000-00:00";
        final String to   = "2022-01-01T10:00:00.000-00:00";
        final String eventTitle = "periodTest";

        List<Map<String,?>> evs = template.getForEntity(
                "http://localhost:" + port + "/events",
                ArrayList.class).getBody();

        if(evs.stream().filter(e -> e.get("title").equals(eventTitle)).count() != 1
           || evs.size() < 2)
            throw new RuntimeException("Test data does is invalid");

        List<Map<String,?>> evInPeriod = template.getForEntity(
                "http://localhost:" + port
                + "/events?from=" + from + "&to=" + to,
                ArrayList.class).getBody();

        // Is correct event?
        Assertions.assertEquals(eventTitle, evInPeriod.get(0).get("title"));

        // Is only the correct event
        Assertions.assertEquals(1, evInPeriod.size());
    }
}
