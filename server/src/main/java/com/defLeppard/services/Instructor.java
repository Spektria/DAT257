package com.defLeppard.services;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 *
 * Data object for representing a instructor
 * @author Jonas Röst
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Instructor {
    private String instructorName;

    public Instructor() {
    }

    /**
     *
     * Reads a JSON file and returns the content as a list
     * @return Returns the read JSON objects into java objects
     *
     */
    public static List<Instructor> createInstructors(String json) throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        List<Instructor> instructors = mapper.readValue(new File(json), new TypeReference<List<Instructor>>(){}); //Om input ej är en fil: ta bort new File() runt json

        return instructors;
    }


    /**
     *
     * Help methods to return and get instructors name
     *
     */
    public String getName() {
        return instructorName;
    }
    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

}
