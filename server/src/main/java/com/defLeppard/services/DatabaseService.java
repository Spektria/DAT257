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
public
class DatabaseService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     *
     * Runs the methods for inserting students into the database
     * @param jsonArray the json array as a Java string that contains the students that should be inserted into the database
     * @return the number of rows affected in the database
     *
     */

    public int addStudentsToDatabase(String jsonArray) throws IOException {
        List<Student> studentList = Student.createStudents(jsonArray);
        return addStudents(studentList);
    }

    public int addEventsToDatabase(String jsonArray) throws IOException {
        List<Event> eventList = Event.createEvents(jsonArray);
        return addEvent(eventList);
    }

    /**
     *
     * Inserts students into the internal database
     * @param student the student which is to be inserted into the database.
     * @return the number of rows affected in the database
     *
     */
    private int addStudent(Student student) {

        String sqlStatement = "INSERT INTO Student VALUES ('" +student.getStudentEmail() + "', '" +student.getStudentName() + "')";

        int rowsAffected = jdbcTemplate.update(sqlStatement);

        return rowsAffected;
    }

    private int addEvent(Event event) {

        String sqlStatement = "INSERT INTO Session VALUES ('" +event.getEventIdnr() + "', '" +event.getEventTitle() + "', '" +event.getEventFromDate() +
                "', '" +event.getEventToDate() + "', '" +event.getEventLocation() + "')";

        int rowsAffected = jdbcTemplate.update(sqlStatement);

        return rowsAffected;
    }

    /**
     *
     * Will be implemented later on to read several students and put these in an arraylist to
     * be able to read more than one student at a time from a JSON file
     * @param students the students which are to be inserted into the database.
     * @return the number of rows affected in the database
     *
     */
    private int addStudents(List<Student> students) {
        int totalRowsAffected = 0;

        for (Student student : students) {
            totalRowsAffected += addStudent(student);
        }

        return totalRowsAffected;
    }

    private int addEvent(List<Event> events) {
        int totalRowsAffected = 0;

        for (Event event : events) {
            totalRowsAffected += addEvent(event);
        }

        return totalRowsAffected;
    }

    /***
     *
     * Fetch all rows from the table Student in the database
     * @return the list of all students as Student objects that exist in the database
     *
     */

    public static List<Student> fetchAllStudentsFromDatabase() {
        String sqlQuery = "SELECT * FROM Student";

        List<Student> allStudents = jdbcTemplate.query(sqlQuery,new BeanPropertyRowMapper<>(Student.class));

        //Wanted to try how the output looked but have no data in the database at the moment
        for (int i = 0; i<=6; i++) {
            System.out.println(allStudents.get(i));
        }

        return allStudents;
    }

    /***
     *
     * Fetch a student from the database that matches the given email
     * @param studentEmail email of the student that is being queried for
     * @return the student with the given email, with type Student
     */
    public static Student fetchOneStudent(String studentEmail) {
        String sqlQuery = "SELECT email, name FROM Student WHERE email = ?";

        Student student = jdbcTemplate.queryForObject(sqlQuery, new Object[]{studentEmail}, new BeanPropertyRowMapper(Student.class));

        return student;
    }





}