package com.defLeppard.services;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 *
 * Data object to represent an Event
 * @author Jonas Röst, William Schmitz
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Event {
    private String idnr;
    private String title;
    private String fromDate;
    private String toDate;
    private String location;

    public Event()  {

    }

    /**
     *
     * Reads a JSON file and returns the content as a list
     * @return Returns the read JSON objects into java objects
     *
     */
    public static List<Event> createEvents(String json) throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        List<Event> events = mapper.readValue(new File(json), new TypeReference<List<Event>>(){});//Om input ej är en fil: ta bort new File() runt json

        return events;
    }

    /**
     *
     * Getters and setters for the class
     *
     */

    public String getEventIdnr() {
        return idnr;
    }
    public String getEventTitle() {
        return title;
    }
    public String getEventFromDate() {
        return fromDate;
    }
    public String getEventToDate() {
        return toDate;
    }
    public String getLocation() {
        return location;
    }

    public void setEventIdnr(String eventIdnr) {
        this.eventIdnr = eventIdnr;
    }

    public void setEventTitle(String eventTitle) {
        this.title = eventTitle;
    }
    public void setEventFromDate(String eventFromDate) {
        this.fromDate = eventFromDate;
    }
    public void setEventToDate(String eventToDate) {
        this.toDate = eventToDate;
    }
    public void setLocation(String location) {
        this.location = location;
    }


}