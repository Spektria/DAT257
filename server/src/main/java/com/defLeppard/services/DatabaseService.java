package com.defLeppard.services;
import com.defLeppard.enteties.EduMoment;
import com.defLeppard.enteties.Event;
import com.defLeppard.enteties.Instructor;
import com.defLeppard.enteties.Student;
import com.defLeppard.services.mappers.RowMapperFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
     * Returns a list of educational moments for a given student identifier. If the identifier does
     * not exist in the database the return value will be an empty list.
     * @param studentEmail the student identifier
     * @return the list of educational moments
     */
    public List<EduMoment> getMoments(String studentEmail){

        final String qMoments = "SELECT educationalMoment, description, completed FROM EducationalMoment," +
                " StudentEducationalMoments WHERE studentEmail = '" + studentEmail + "';";
        return  jdbcTemplate.query(qMoments, RowMapperFactory.createRowMapper(EduMoment.class));
    }

    /**
     *
     * Inserts a student into the internal database
     * @param student the student who is to be inserted into the database.
     * @return the number of rows affected in the database
     *
     */
    private int addStudent(Student student) {

        String sqlStatement = "INSERT INTO Student VALUES ('" +student.email() + "', '" +student.name() + "')";

        int rowsAffected = jdbcTemplate.update(sqlStatement);

        return rowsAffected;
    }


    /**
     *
     * Inserts a list of students into the internal database
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


    /**
     *
     * Inserts an event into the internal database
     * @param event the event which is to be inserted into the database.
     * @return the number of rows affected in the database
     *
     */
    private int addEvent(Event event) {

        String sqlStatement = "INSERT INTO Session VALUES ('" +event.id() + "', '" +event.title() + "', '" +event.from() +
                "', '" +event.to() + "', '" +event.location() + "')";

        int rowsAffected = jdbcTemplate.update(sqlStatement);

        return rowsAffected;
    }


    /***
     *
     * Inserts a list of events into the internal database
     * @param events list of events to be inserted into the database
     * @return the number of rows affected in the database
     *
     */
    private int addEvents(List<Event> events) {
        int totalRowsAffected = 0;

        for (Event event : events) {
            totalRowsAffected += addEvent(event);
        }

        return totalRowsAffected;
    }

    /**
     *
     * Inserts an instructor into the internal database
     * @param instructor the instructor who is to be inserted into the database.
     * @return the number of rows affected in the database
     *
     */
    private int addInstructor(Instructor instructor) {

        String sqlStatement = "INSERT INTO Instructor VALUES ('" +instructor.name() + "')";

        int rowsAffected = jdbcTemplate.update(sqlStatement);

        return rowsAffected;
    }


    /***
     *
     * Inserts a list of events into the internal database
     * @param instructors list of instructors to be inserted into the database
     * @return the number of rows affected in the database
     *
     */
    private int addInstructors(List<Instructor> instructors) {
        int totalRowsAffected = 0;

        for (Instructor instructor : instructors) {
            totalRowsAffected += addInstructor(instructor);
        }

        return totalRowsAffected;
    }

    /***
     *
     * Fetch all rows from the table Student in the database
     * @return the list of all students as Student objects that exist in the database
     *
     */
    public List<Student> fetchAllStudents() {
        String sqlQuery = "SELECT * FROM Student";

        List<Student> allStudents = jdbcTemplate.query(sqlQuery,new BeanPropertyRowMapper<>(Student.class));

        return allStudents;
    }


    /***
     *
     * Fetch a student from the database that matches the given email
     * @param studentEmail email of the student that is being queried for
     * @return the student with the given email, as type Student
     *
     */
    public Student fetchOneStudent(String studentEmail) throws EmptyResultDataAccessException {
        String sqlQuery = "SELECT * FROM Student WHERE email = ?";
        Student s = jdbcTemplate.queryForObject(sqlQuery, RowMapperFactory.createRowMapper(Student.class), studentEmail);

        return s;
    }


    /***
     *
     * Fetch all rows from the table Session in the database
     * @return the list of all events as Event objects that exist in the database
     *
     */
    public List<Event> fetchAllEvents() {
        final String sqlQuery = "SELECT idnr, title, fromdate, todate, location FROM Session";

        // Note this only fetches events without students & instructors
        List<Event> allEvents = jdbcTemplate.query(sqlQuery, RowMapperFactory.createRowMapper(Event.class));

        // Because of this we have to fetch students & instructors individually
        return allEvents.stream().map(session -> {
            var students = studentsAttending(session.id())
                    .stream()
                    .map(Student::name)
                    .toArray(String[]::new);

            var instructors = instructorsAttending(session.id())
                    .stream()
                    .map(Instructor::name)
                    .toArray(String[]::new);

            return new Event(session.id()
                    , session.title()
                    , session.to()
                    , session.from()
                    , instructors
                    , students
                    , session.location());
        }).collect(Collectors.toList());
    }

    public List<Student> studentsAttending(int id){
        final String q = "SELECT name, loginemail FROM Attend, Student WHERE sessionidnr = " + id + " AND loginEmail = studentEmail GROUP BY loginemail";
        return jdbcTemplate.query(q, RowMapperFactory.createRowMapper(Student.class));
    }

    public List<Instructor> instructorsAttending(int id){
        final String q = "SELECT login, email, name FROM Attend, Instructor WHERE sessionidnr = " + id + " AND login = instructor GROUP BY login;";
        return jdbcTemplate.query(q, RowMapperFactory.createRowMapper(Instructor.class));
    }


    /***
     *
     * Fetch events from the database that are scheduled in a specified interval
     * @param fromDate start date of the inverval
     * @param toDate end date of the interval
     * @return the events within the given interval
     *
     */
    public List<Event> fetchEventsInIntervall(Date fromDate, Date toDate) throws EmptyResultDataAccessException  {

        final String sqlQuery = "SELECT idnr, title, fromdate, todate, location FROM Session WHERE (fromdate >= '" + new Timestamp(fromDate.getTime())+ "' AND todate <= '" + new Timestamp(toDate.getTime()) + "');";

        System.out.println(sqlQuery);
        // Note this only fetches events without students & instructors
        List<Event> allEvents = jdbcTemplate.query(sqlQuery, RowMapperFactory.createRowMapper(Event.class));

        // Because of this we have to fetch students & instructors individually
        return allEvents.stream().map(session -> {
            var students = studentsAttending(session.id())
                    .stream()
                    .map(Student::name)
                    .toArray(String[]::new);

            var instructors = instructorsAttending(session.id())
                    .stream()
                    .map(Instructor::name)
                    .toArray(String[]::new);

            return new Event(session.id()
                    , session.title()
                    , session.to()
                    , session.from()
                    , instructors
                    , students
                    , session.location());
        }).collect(Collectors.toList());
    }


    /***
     *
     * Fetch all rows from the table Instructors in the database
     * @return the list of all instructors as Instructor objects that exist in the database
     *
     */
    public List<Instructor> fetchAllInstructors() {
        String sqlQuery = "SELECT * FROM Instructor";

        List<Instructor> allInstructors = jdbcTemplate.query(sqlQuery, RowMapperFactory.createRowMapper(Instructor.class));

        return allInstructors;
    }


    /***
     *
     * Fetch a student from the database that matches the given email
     * @param instructorName email of the student that is being queried for
     * @return the student with the given email, as type Student
     *
     */
    public Instructor fetchOneInstructor(String instructorName) throws EmptyResultDataAccessException {
        String sqlQuery = "SELECT * FROM Instructor WHERE name = ?";

        Instructor instructor = jdbcTemplate.queryForObject(sqlQuery, RowMapperFactory.createRowMapper(Instructor.class), instructorName);

        return instructor;
    }

}