package com.defLeppard.controllers;

import com.defLeppard.enteties.EduMoment;
import com.defLeppard.services.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
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
                            "email", "studnet1@mail.com"
                    ),

                    Map.of(
                            "name", "student2",
                            "email", "studnet2@mail.com"
                    ),

                    Map.of(
                            "name", "student3",
                            "email", "studnet3@mail.com"
                    )
            );


    @Autowired
    private DatabaseService db;

    /**
     * Returns a list of all students in JSON format.
     * @return the list of students
     */
    @GetMapping("")
    @ResponseBody
    ResponseEntity<List<Map<String, String>>> getStudents(){
        return ResponseEntity.status(HttpStatus.OK).body(students);
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

        return ResponseEntity.status(HttpStatus.OK).body(property.map(student::get).isPresent()
                ? student.get(property.get())
                : student);
    }


    /**
     * Returns a list of {@link EduMoment educational moments} for the given student or, given optional parameter,
     * a single educational moment for the given student, given the name of the moment.
     * @param email the student's email.
     * @return the list of educational moments.
     */
    @GetMapping("/{email}/moments")
    ResponseEntity<?> getMoments(@PathVariable("email") String email, @RequestParam("moment") Optional<String> momentName){
        var moments = db.getMoments(email);

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
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
