package com.defLeppard.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/instructors")
public class InstructorController {

    /*
    // Dummy list
    // TODO: replace with database
    private List<Map<String, String>> instructors =
            List.of(
                    Map.of(
                            "name", "instructor1",
                            "login", "123",
                            "email", "instructor1@skoter.com"
                    ),

                    Map.of(
                            "name", "instructor2",
                            "login", "321",
                            "email", "instructor2@skoter.com"
                    ),

                    Map.of(
                            "name", "instructor3",
                            "login", "admin",
                            "email", "instructor3@skoter.com"
                    )
            );

    */

    @GetMapping("")
    @ResponseBody
    ResponseEntity<List<Instructor>> getInstructors(){
        return ResponseEntity.status(HttpStatus.OK).body(DatabaseService.fetchAllInstructors());
    }


    /**
     * Returns a specific instructor given an instructors name.
     * @param name the name of the instructor
     * @return the instructor in JSON format
     */
    @GetMapping("/{name}") //Osäker på detta
    @ResponseBody
    ResponseEntity<?> getStudent(@PathVariable("name") String name) {
        try {
            var instruct = DatabaseService.fetchOneInstructor(name);

        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not found");

        }

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        var instructor = new JSONObject(ow.writeValueAsString(stud))

        return ResponseEntity.status(HttpStatus.OK).body(instructor);
    }

    //Possibly remove as only using admin login
    /**
     * Returns instructor account data
     * @param username the username of the instructor
     * @param password the hashed password
     * @return login token
     */
    @GetMapping("/login")
    @ResponseBody
    ResponseEntity<String> logIn(@RequestParam(value = "name", required = true) String username,
                                 @RequestParam(value = "pw",   required = true) String password){

        if(username == null || password == null || username.isBlank() || password.isBlank())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("username and or password is/are blank");

        // TODO compare with database password hash & username

        // TODO login token

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
