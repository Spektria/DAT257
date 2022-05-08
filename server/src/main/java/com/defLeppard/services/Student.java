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
private String studentEmail;
private String studentName;

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

        List<Student> students = mapper.readValue(new File(json), new TypeReference<List<Student>>(){});//Om input ej är en fil: ta bort new File() runt json

        return students;
    }

    /**
     * 
     * Helper methods to return and get students name and email
     *
     */
    public String getStudentName() {
        return studentName;
    }
    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

}
