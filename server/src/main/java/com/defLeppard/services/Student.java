package com.defLeppard.services;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 *
 * Data object for representing a student
 * @author William Schmitz, Jonas Röst
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Student {
private String name;
private String loginEmail;

    public Student()  {

    }

    /**
     *
     * Reads a JSON file and returns the content as a list
     * @return Returns the read JSON objects into java objects
     *
     */


    public static List<Student> createStudents(String json) throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        List<Student> students = mapper.readValue(json, new TypeReference<List<Student>>(){});
        return students;
    }

    /**
     * 
     * Help methods to return and get students name and email
     *
     */
    public String getName() {
        return name;
    }

    public String getloginEmail() {
        return loginEmail;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLoginEmail(String loginEmail) {
        this.loginEmail = loginEmail;
    }

}
