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

    public InstructorController() throws ParseException {
    }

    /**
     * Returns a list of all instructors in JSON format.
     * @return the list of instructors
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
    @GetMapping("/{name}")
    @ResponseBody
    ResponseEntity<?> getInstructor(@PathVariable("name") String name) {
        try {
            var ret = DatabaseService.fetchOneInstructor(name);

        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not found");

        }

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        var instructor = new JSONObject(ow.writeValueAsString(ret))

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
