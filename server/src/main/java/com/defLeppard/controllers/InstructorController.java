package com.defLeppard.controllers;

import com.defLeppard.entities.Instructor;
import com.defLeppard.services.DatabaseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * REST controller for instructor information.
 *
 * @author Hugo Ekstrand
 */
@CrossOrigin
@RestController
@RequestMapping("/instructors")
public class InstructorController {

    @Autowired
    private DatabaseService dbs;

    /**
     * Returns a list of all instructors in JSON format.
     * @return the list of instructors
     */
    @GetMapping("")
    ResponseEntity<List<Instructor>> getInstructors(){
        return ResponseEntity.status(HttpStatus.OK).body(dbs.fetchAllInstructors());
    }


    /**
     * Returns a specific instructor given an instructors name.
     * @param uuid the uuid of the instructor
     * @return the instructor in JSON format
     */
    @GetMapping("/{uuid}")
    ResponseEntity<?> getInstructor(@PathVariable("uuid") UUID uuid) throws JsonProcessingException {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(dbs.fetchOneInstructor(uuid));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not found");

        } catch (JSONException j) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON");
        }


    }

    //Possibly remove as only using admin login
    /**
     * Returns instructor account data
     * @param username the username of the instructor
     * @param password the hashed password
     * @return login token
     */
    @GetMapping("/login")
    ResponseEntity<String> logIn(@RequestParam(value = "name", required = true) String username,
                                 @RequestParam(value = "pw",   required = true) String password){

        if(username == null || password == null || username.isBlank() || password.isBlank())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("username and or password is/are blank");

        // TODO compare with database password hash & username

        // TODO login token

        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null);
    }

}
