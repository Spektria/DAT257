package com.defLeppard.controllers;

import com.defLeppard.services.DatabaseService;
import com.defLeppard.services.Student;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.json.JSONObject;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


/**
 * REST controller for handling student information.
 *
 * @author Hugo Ekstrand, Jonas Röst
 */
@CrossOrigin
@RestController
@RequestMapping("/students")
class StudentController {

    private DatabaseService dbs = new DatabaseService();

    public StudentController() throws ParseException {
    }

    /**
     * Returns a list of all students in JSON format.
     * @return the list of students
     */
    @GetMapping("")
    @ResponseBody
    ResponseEntity<List<Student>> getStudents(){
        return ResponseEntity.status(HttpStatus.OK).body(dbs.fetchAllStudents());
    }

    /**
     * Returns a specific student or a student's property given a student email and optionally a specific property name.
     * @param email the email of the student
     * @param property the optional property name
     * @return the student or student property in JSON format
     */
    @GetMapping("/{email}")
    @ResponseBody
    ResponseEntity<?> getStudent(@PathVariable("email") String email, @RequestParam("property") Optional<String> property)  {
        try {
            var stud = dbs.fetchOneStudent(email.toLowerCase());
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            var student = new JSONObject(ow.writeValueAsString(stud));

            return ResponseEntity.status(HttpStatus.OK).body(property.map(student::get).isPresent()
                    ? student.get(property.get())
                    : student);

        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not found");

        } catch (JSONException j) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON");
        } catch (JsonProcessingException jp) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("JSON processing error");
        }


    }

}
