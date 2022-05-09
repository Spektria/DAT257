package com.defLeppard.services;
import com.defLeppard.enteties.EduMoment;
import com.defLeppard.services.mappers.RowMapperFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.IOException;
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

}