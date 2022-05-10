package com.defLeppard.controllers;

import com.defLeppard.services.DatabaseService;
import com.defLeppard.services.Instructor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

import java.text.ParseException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/instructors")
public class InstructorController {

    @Autowired
    private DatabaseService dbs = new DatabaseService();

    public InstructorController() throws ParseException {
    }

    /**
     * Returns a list of all instructors in JSON format.
     * @return the list of instructors
     */
    @GetMapping("")
    @ResponseBody
    ResponseEntity<List<Instructor>> getInstructors(){
        return ResponseEntity.status(HttpStatus.OK).body(dbs.fetchAllInstructors());
    }


    /**
     * Returns a specific instructor given an instructors name.
     * @param name the name of the instructor
     * @return the instructor in JSON format
     */
    @GetMapping("/{name}")
    @ResponseBody
    ResponseEntity<?> getInstructor(@PathVariable("name") String name) throws JsonProcessingException {
        try {
            Object ret = dbs.fetchOneInstructor(name);
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            var instructor = new JSONObject(ow.writeValueAsString(ret));

            return ResponseEntity.status(HttpStatus.OK).body(instructor);
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
