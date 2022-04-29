package com.defLeppard.services;
        import org.springframework.jdbc.core.JdbcTemplate;
        import org.springframework.boot.CommandLineRunner;
        import org.springframework.beans.factory.annotation.Autowired;
        import java.io.IOException;
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
        Student.createStudents("src/main/java/com/defLeppard/services/testJSON.json");
    }

    /**
     * Inserts students into the internal database
     * @param student the student which is to be inserted into the database.
     * @return the number of rows affected in the database
     */
  /*  private int addStudent(DatabaseService student) {

        String sqlStatement = "INSERT INTO Student VALUES ('" +student.studentEmail + "', '" +student.studentName + "')";

        int rowsAffected = jdbcTemplate.update(sqlStatement);

        return rowsAffected;
    }
    */


    /**
     * Will be implemented later on to read several students and put these in an arraylist to
     * be able to read more than one student at a time from a JSON file
     * @param students the students which are to be inserted into the database.
     * @return the number of rows affected in the database
     */

   /* private int addStudents(ArrayList<DatabaseService> students) {
        int totalRowsAffected = 0;

        for (DatabaseService student : students) {
            totalRowsAffected += addStudent(student);
        }

        return totalRowsAffected;
    }*/





    }