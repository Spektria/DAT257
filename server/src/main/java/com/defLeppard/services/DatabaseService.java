package com.defLeppard.services;


import com.defLeppard.Application;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.boot.SpringApplication;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.stream.IntStream;

/**
 *
 * Service for performing database queries, inserts and other database related actions.
 *
 * @author Jonas Röst
 */

@Service
public class DatabaseService implements CommandLineRunner{

    @Autowired
    private JdbcTemplate jdbcTemplate;


    /**
     *
     * Callback used to run the bean.
     *
     */
    @Override
    public void run(String... args) throws Exception {
        String sql = "INSERT INTO Student VALUES (9806135372,'Wille', 'willecool99@gmail.com')";
        int rows = jdbcTemplate.update(sql);
        System.out.println(rows);
    }


    /**
     *
     * Inserts a given student as a row in the internal database table Student.
     *      * @param student is the student to be inserted into the database.
     *      * @return rowsAffected the number of rows affected in the database.
     *
     */
    private int addStudent(ArrayList<String> student) {

        String sqlStatement = "INSERT INTO Student VALUES ('"+student.get(0)+"', '"+student.get(1)+"')";

        int rowsAffected = jdbcTemplate.update(sqlStatement);

        return rowsAffected;
    }

    /**
     *
     * Inserts a group of students into the internal database table Student.
     *      * @param students the list of students to be inserted into the database.
     *      * @return totalRowsAffected the number of rows affected in the database.
     *
     */

    private int addStudents(ArrayList<ArrayList<String>> students) {
        int totalRowsAffected = 0;

        for (ArrayList<String> student : students) {
            totalRowsAffected += addStudent(student);
        }

        return totalRowsAffected;
    }

    private class Student {
        @JsonProperty("login-email")
        private String studentEmail;
        @JsonProperty("name")
        private String studentName;

    }

}


