package com.defLeppard.controllers;

import com.defLeppard.entities.Student;
import com.defLeppard.services.DatabaseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import com.defLeppard.entities.EduMoment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.json.JSONObject;

import java.util.*;


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
     * @param uuid the uuid of the student
     * @param property the optional property name
     * @return the student or student property in JSON format
     */
    @GetMapping("/{uuid}")
    ResponseEntity<?> getStudent(@PathVariable("uuid") UUID uuid, @RequestParam("property") Optional<String> property)  {
        try {
            var stud = dbs.fetchOneStudent(uuid);
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
     * @param uuid the student's uuid.
     * @return the list of educational moments.
     */
    @GetMapping("/{uuid}/moments")
    ResponseEntity<?> getMoments(@PathVariable("uuid") UUID uuid, @RequestParam("moment") Optional<String> momentName){
        var moments = dbs.getMoments(uuid);

        if(momentName.isPresent()){
            var foundMoment = moments.stream().filter(mom ->
                    // Note: If the name contains blankspaces we replace them with underscore, _, since
                    //       underscore is not allowed in HTTP requests.
                    mom.name().replace(' ', '_').equals(momentName.get())).findFirst();
            return ResponseEntity.status(foundMoment.isPresent() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(foundMoment.orElse(null));
        }
        return ResponseEntity.status(moments.isEmpty() ? HttpStatus.BAD_REQUEST : HttpStatus.OK).body(moments);
    }

    /***
     * Changes the completion status of an educational moment for a given student
     * @param uuid the student id
     * @param educationalMoment the educational moment which completion status should be changed
     * @return OK HTTP status or NOT_FOUND HTTP status
     */
    @PostMapping("/{uuid}/updatemoment")

    ResponseEntity<?> updateMoment(@PathVariable("uuid") UUID uuid, @RequestBody EduMoment educationalMoment){
        int rowsChanged = dbs.changeCompletedStatus(uuid, educationalMoment);
        if (rowsChanged == 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/{uuid}/updatemoments")
    ResponseEntity<?> updateMoments(@PathVariable("uuid") UUID uuid, @RequestBody EduMoment[] educationalMoment) {
        List<String> failed = new ArrayList<>();
        Arrays.stream(educationalMoment).forEach(mom -> {
            if(updateMoment(uuid, mom).getStatusCode() != HttpStatus.OK)
                failed.add(mom.name());
        });

        if(failed.isEmpty())
            return ResponseEntity.status(HttpStatus.OK).build();
        else
            return ResponseEntity.status(HttpStatus.MULTI_STATUS).body("Partial success. Failed with " + failed.stream().reduce("", (acc, str) -> acc + ", " + str));
    }
}
