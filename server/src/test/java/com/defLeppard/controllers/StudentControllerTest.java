package com.defLeppard.controllers;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

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
    public void getStudentsOKTest(){
        var resp = this.template.getForEntity("http://localhost:" + port + "/students", String.class);
        Assertions.assertTrue(resp.hasBody() && resp.getStatusCode() == HttpStatus.OK);
    }

}
