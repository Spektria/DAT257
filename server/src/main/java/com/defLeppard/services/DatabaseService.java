package com.defLeppard.services;
import com.defLeppard.entities.EduMoment;
import com.defLeppard.entities.Event;
import com.defLeppard.entities.Instructor;
import com.defLeppard.entities.Student;
import com.defLeppard.services.mappers.RowMapperFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;
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
public class DatabaseService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Returns a list of educational moments for a given student identifier. If the identifier does
     * not exist in the database the return value will be an empty list.
     * @param studentmomentid the student identifier
     * @return the list of educational moments
     */
    public List<EduMoment> getMoments(UUID studentmomentid){

        final String qMoments = "SELECT educationalMoment, description, completed FROM EducationalMoment," +
                " StudentEducationalMoments WHERE studentmomentid = '" + studentmomentid + "' AND name = educationalMoment;";
        return  jdbcTemplate.query(qMoments, RowMapperFactory.createRowMapper(EduMoment.class));
    }

    /**
     *
     * Inserts a student into the internal database
     * @param student the student who is to be inserted into the database.
     * @return the number of rows affected in the database
     *
     */
    public int addStudent(Student student) {

        final String sqlStatement = "INSERT INTO Student VALUES ('" + student.id() + "', '" +student.email() + "', '" +student.name() + "') ON CONFLICT (studentid) DO UPDATE SET name = '" + student.name() + "', loginemail = '" + student.email() + "';";

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
    public int addStudents(List<Student> students) {
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
    public int addInstructor(Instructor instructor) {

        String sqlStatement = "INSERT INTO Instructor VALUES ('" +  instructor.id() + "', '" +instructor.name() + "') ON CONFLICT (instructorid) DO UPDATE SET name = '" + instructor.name() + "';";

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
    public int addInstructors(List<Instructor> instructors) {
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
        final String sqlQuery = "SELECT * FROM Student";
        return jdbcTemplate.query(sqlQuery, RowMapperFactory.createRowMapper(Student.class));
    }


    /***
     *
     * Fetch a student from the database that matches the given uuid
     * @param id uuid of the student that is being queried for
     * @return the student with the given uuid, as type Student
     *
     */
    public Student fetchOneStudent(UUID id) throws EmptyResultDataAccessException {
        final String sqlQuery = "SELECT * FROM Student WHERE studentid = '" + id + "';";
        return jdbcTemplate.queryForObject(sqlQuery, RowMapperFactory.createRowMapper(Student.class));
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
            var students = studentsAttending(session.id()).toArray(Student[]::new);

            var instructors = instructorsAttending(session.id()).toArray(Instructor[]::new);

            return new Event(session.id()
                    , session.title()
                    , session.from()
                    , session.to()
                    , instructors
                    , students
                    , session.location());
        }).collect(Collectors.toList());
    }

    public List<Student> studentsAttending(int id){
        final String q = "SELECT name, loginemail, studentid FROM Attend, Student WHERE sessionidnr = " + id + " AND studentid = studentattendid GROUP BY studentid";
        return jdbcTemplate.query(q, RowMapperFactory.createRowMapper(Student.class));
    }

    public List<Instructor> instructorsAttending(int id){
        final String q = "SELECT name, instructorid FROM Attend, Instructor WHERE sessionidnr = " + id + " AND instructorid = instructorattendid GROUP BY instructorid;";
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

        // Note, we do +- 10 seconds since postgres has issues handling >= and <=. (Treats them as > and <)
        final String sqlQuery = "SELECT idnr, title, fromdate, todate, location FROM Session WHERE (fromdate >= '" + new Timestamp(fromDate.getTime() - 1000 * 10)+ "' AND todate <= '" + new Timestamp(toDate.getTime() + 1000 * 10) + "');";

        // Note this only fetches events without students & instructors
        List<Event> allEvents = jdbcTemplate.query(sqlQuery, RowMapperFactory.createRowMapper(Event.class));

        // Because of this we have to fetch students & instructors individually
        return allEvents.stream().map(session -> {
            var students = studentsAttending(session.id()).toArray(Student[]::new);

            var instructors = instructorsAttending(session.id()).toArray(Instructor[]::new);

            return new Event(session.id()
                    , session.title()
                    , session.from()
                    , session.to()
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
     * Fetch an instructor from the database that matches the given uuid
     * @param instructorid uuid of the instructor that is being queried for
     * @return the instructor with the given uuid, as type Instructor
     *
     */
    public Instructor fetchOneInstructor(UUID instructorid) throws EmptyResultDataAccessException {
        String sqlQuery = "SELECT * FROM Instructor WHERE instructorid = ?";

        Instructor instructor = jdbcTemplate.queryForObject(sqlQuery, RowMapperFactory.createRowMapper(Instructor.class), instructorid);

        return instructor;
    }

    /**
     *
     * Given a student uuid and educational moment, update the completed status
     * @param studentmomentid the uuid of the student.
     * @param moment the educational moment which status should be updated
     * @return the number of rows affected in the database
     *
     */
    public int changeCompletedStatus(UUID studentmomentid, EduMoment moment) {
        String sqlStatement = "UPDATE StudentEducationalMoments SET completed = '" + moment.complete()+ "' WHERE educationalMoment = '" + moment.name() + "' AND studentmomentid = '" + studentmomentid + "'";
        return jdbcTemplate.update(sqlStatement);
    }

    /**
     *
     * Deletes an event with the given id from the database
     * @param id the id of the event
     * 
     */
    public void deleteEvent(int id) {
        String sqlStatement1 = "DELETE FROM Session WHERE idnr = " + id;
        jdbcTemplate.update(sqlStatement1);

    /**
     *
     * Given an event, all students and instructors will be added to this event. The event itself will also be added
     * @param event the event which is added
     * @return the number of rows affected
     */
    public int functionAddEvents(Event event){
        String sqlStatement = "DELETE FROM Attend WHERE sessionIdnr = '" + event.id() + "'; ";
        String sqlstatement2 = "DELETE FROM Session WHERE idnr = '" + event.id() + "'; ";
        String sqlstatement3 = "INSERT INTO Session VALUES ('" + event.id() + "', '" + event.title() + "', '" + event.from() + "', '" + event.to() + "', '" + event.location() + "'); ";

        int rowsAffected = jdbcTemplate.update(sqlStatement);
        jdbcTemplate.update(sqlstatement2);
        jdbcTemplate.update(sqlstatement3);

        for(Instructor instructor:event.instructors()){
            for(Student student:event.participants()){
                String sqlstatement4 = "INSERT INTO Attend VALUES ('" + student.id() + "', '" + instructor.id() + "', '" + event.id() + "' , '" + event.location() + "');";
                jdbcTemplate.update(sqlstatement4);
            }

        }

        return rowsAffected;
    }


}