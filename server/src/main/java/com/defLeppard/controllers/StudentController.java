package com.defLeppard.controllers;

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
    private List<Map<String, String>> students =
            List.of(
                    Map.of(
                            "name", "student1",
                            "id", "1"
                    ),

                    Map.of(
                            "name", "student2",
                            "id", "2"
                    ),

                    Map.of(
                            "name", "student3",
                            "id", "3"
                    )
            );


    @GetMapping("")
    @ResponseBody
    ResponseEntity<List<Map<String, String>>> getStudents(){
        return ResponseEntity.status(HttpStatus.OK).body(students);
    }

    @GetMapping("/{id}")
    @ResponseBody
    ResponseEntity<?> getStudent(@PathVariable("id") String id, @RequestParam("property") Optional<String> property){
        var student = students.stream()
                .filter(s -> s.get("id").equals(id.toLowerCase()))
                .findFirst()
                .orElse(new HashMap<>());

        return ResponseEntity.status(HttpStatus.OK).body(property.map(student::get).isPresent()
                ? student.get(property.get())
                : student);
    }

}
