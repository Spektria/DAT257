package com.defLeppard.controllers;

import com.defLeppard.services.DatabaseService;
import com.defLeppard.services.Student;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


/**
 * REST controller for handling student information.
 *
 * @author Hugo Ekstrand
 */
@CrossOrigin
@RestController
@RequestMapping("/students")
class StudentController {

    // Dummy list
    // TODO: replace with database
   // private List<Student> students = DatabaseService.fetchAllStudentsFromDatabase();


    /**
     * Returns a list of all students in JSON format.
     * @return the list of students
     */
    @GetMapping("")
    @ResponseBody
    ResponseEntity<List<Student>> getStudents(){
        return ResponseEntity.status(HttpStatus.OK).body(DatabaseService.fetchAllStudentsFromDatabase());
    }

    /**
     * Returns a specific student or a student's property given a student email and optionally a specific property name.
     * @param email the email of the student
     * @param property the optional property name
     * @return the student or student property in JSON format
     */
    @GetMapping("/{email}")
    @ResponseBody
    ResponseEntity<?> getStudent(@PathVariable("email") String email, @RequestParam("property") Optional<String> property){
        var student = students.stream()
                .filter(s -> s.get("email").equals(email.toLowerCase()))
                .findFirst()
                .orElse(new HashMap<>());

        Student student = DatabaseService.fetchOneStudent(email.toLowerCase());
        if student = null {
            System.out.println("There is no student with the given email")
        } else{

            return ResponseEntity.status(HttpStatus.OK).body(property.map(student::get).isPresent()
                    ? student.get(property.get())
                    : student);
        }
    }

}
