package com.defLeppard.services;

        import org.springframework.boot.SpringApplication;
        import org.springframework.jdbc.core.JdbcTemplate;
        import org.springframework.boot.CommandLineRunner;
        import org.springframework.beans.factory.annotation.Autowired;
        import com.fasterxml.jackson.databind.ObjectMapper;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import java.io.File;
        import java.io.IOException;
        import java.util.ArrayList;
        import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 *
 * Service for reading a JSON-file and converting the JSON objects to java object,
 * database-queries, inserts into the database and other database related actions.
 *
 *
 * @author William Schmitz, Jonas Röst
  */
@SpringBootApplication
@JsonIgnoreProperties (ignoreUnknown = true)
class DatabaseService implements CommandLineRunner {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private String studentEmail;
    private String studentName;

    /**
     * Runs the methods for inserting read students into the database
     *
     *
     */

    @Override
    public void run(String[] args) throws IOException {

        //create ObjectMapper instance

        //read json file and convert to student object
        addStudent(returnStudent());

    }

    /**
     *
     *
     * Reads a JSON file and returns the content as Java objects
     * Will implement to be able to read several JSON objects simultaneously
     * @return Returns the read JSON objects into java objects
     *
     */
    private DatabaseService returnStudent() throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();

        DatabaseService student = objectMapper.readValue(new File("src/main/java/com/defLeppard/services/testJSON.json"), DatabaseService.class);

        return student;

    }

    /**
     * Inserts students into the internal database
     * @param student the student which is to be inserted into the database.
     * @return the number of rows affected in the database
     */
    private int addStudent(DatabaseService student) {

        String sqlStatement = "INSERT INTO Student VALUES ('" +student.studentEmail + "', '" +student.studentName + "')";

        int rowsAffected = jdbcTemplate.update(sqlStatement);

        return rowsAffected;
    }

    /**
     * Will be implemented later on to read several students and put these in an arraylist to
     * be able to read more than one student at a time from a JSON file
     * @param students the students which are to be inserted into the database.
     * @return the number of rows affected in the database
     */

    private int addStudents(ArrayList<DatabaseService> students) {
        int totalRowsAffected = 0;

        for (DatabaseService student : students) {
            totalRowsAffected += addStudent(student);
        }

        return totalRowsAffected;
    }

    /**
     * Help methods to return and get students name and email
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