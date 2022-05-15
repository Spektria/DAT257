package com.defLeppard.controllers;

import com.defLeppard.enteties.Student;
import com.defLeppard.services.DatabaseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import com.defLeppard.enteties.EduMoment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.json.JSONObject;

import java.util.List;
import java.util.Optional;


/**
 * REST controller for handling student information.
 *
 * @author Hugo Ekstrand, Jonas Röst, William Schmitz
 */
@CrossOrigin
@RestController
@RequestMapping("/students")
class StudentController {

    @Autowired
    private DatabaseService dbs;

    /**
     * Returns a list of all students in JSON format.
     * @return the list of students
     */
    @GetMapping("")
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
    ResponseEntity<?> getStudent(@PathVariable("email") String email, @RequestParam("property") Optional<String> property)  {
        try {
            var stud = dbs.fetchOneStudent(email.toLowerCase());
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            var student = new JSONObject(ow.writeValueAsString(stud));

            if (property.isPresent())
                return ResponseEntity.status(HttpStatus.OK).body(student.get(property.get()));
            else
                return ResponseEntity.status(HttpStatus.OK).body(stud);


        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not found");

        } catch (JSONException j) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON");

        } catch (JsonProcessingException jp) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("JSON processing error");
        }


    }


    /**
     * Returns a list of {@link EduMoment educational moments} for the given student or, given optional parameter,
     * a single educational moment for the given student, given the name of the moment.
     * @param email the student's email.
     * @return the list of educational moments.
     */
    @GetMapping("/{email}/moments")
    ResponseEntity<?> getMoments(@PathVariable("email") String email, @RequestParam("moment") Optional<String> momentName){
        var moments = dbs.getMoments(email);

        if(momentName.isPresent()){
            var foundMoment = moments.stream().filter(mom ->
                    // Note: If the name contains blankspaces we replace them with underscore, _, since
                    //       underscore is not allowed in HTTP requests.
                    mom.name().replace(' ', '_').equals(momentName.get())).findFirst();
            return ResponseEntity.status(foundMoment.isPresent() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(foundMoment.orElse(null));
        }
        return ResponseEntity.status(moments.isEmpty() ? HttpStatus.BAD_REQUEST : HttpStatus.OK).body(moments);
    }

    @PostMapping("/{email}/updatemoment")
    ResponseEntity<?> postMoments(@PathVariable("email") String email, @RequestBody EduMoment educationalMoment){

        int rowsChanged = dbs.changeCompletedStatus(email, educationalMoment);
        if (rowsChanged == 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
