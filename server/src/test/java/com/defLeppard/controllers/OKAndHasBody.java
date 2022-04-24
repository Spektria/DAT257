package com.defLeppard.controllers;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
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
public class OKAndHasBody {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate template;

    @ParameterizedTest
    @ValueSource(strings = {"/students", "/events", "/instructors"})
    public void OKAndHasBodyTest(String localUri){
        var resp = this.template.getForEntity("http://localhost:" + port + localUri, String.class);
        Assertions.assertTrue(resp.hasBody() && resp.getStatusCode() == HttpStatus.OK);
    }

}
