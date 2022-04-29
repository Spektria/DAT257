package com.defLeppard.services;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.stereotype.Service;

/**
 *
 * Service for reading a JSON-file and converting the JSON objects to java object,
 * database-queries, inserts into the database and other database related actions.
 *
 *
 * @author William Schmitz, Jonas Röst
 */
@Service
@JsonIgnoreProperties (ignoreUnknown = true)
class DatabaseService implements CommandLineRunner {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Runs the methods for inserting read students into the database
     *
     *
     */
    @Override
    public void run(String[] args) throws IOException {
        List<Student> studentList = Student.createStudents("src/main/java/com/defLeppard/services/testJSON.json");
        System.out.println(addStudents(studentList));
    }

    /**
     * Inserts students into the internal database
     * @param student the student which is to be inserted into the database.
     * @return the number of rows affected in the database
     */
    private int addStudent(Student student) {

        String sqlStatement = "INSERT INTO Student VALUES ('" +student.getStudentEmail() + "', '" +student.getStudentName() + "')";

        int rowsAffected = jdbcTemplate.update(sqlStatement);

        return rowsAffected;
    }



    /**
     * Will be implemented later on to read several students and put these in an arraylist to
     * be able to read more than one student at a time from a JSON file
     * @param students the students which are to be inserted into the database.
     * @return the number of rows affected in the database
     */
    private int addStudents(List<Student> students) {
        int totalRowsAffected = 0;

        for (Student student : students) {
            totalRowsAffected += addStudent(student);
        }

        return totalRowsAffected;
    }





}