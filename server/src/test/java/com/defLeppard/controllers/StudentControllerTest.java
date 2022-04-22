package com.defLeppard.controllers;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Hugo Ekstarand
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class StudentControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate template;

    @Test
    public void getStudentPropertyTest(){
        final String prop = "name";

        // Get some student
        List<Map<String, String>> students = this.template.getForEntity("http://localhost:" + port + "/students", ArrayList.class).getBody();

        // Fetch property of same student
        var resp = this.template.getForEntity("http://localhost:"
                + port + "/students/"
                + students.get(0).get("email")
                + "?property=" + prop, String.class);

        // Check fetch worked and
        Assertions.assertTrue(resp.hasBody() && resp.getStatusCode() == HttpStatus.OK);
        // Check property equal (remember same student)
        Assertions.assertEquals(students.get(0).get(prop), resp.getBody());
    }

}
