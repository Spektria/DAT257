package com.defLeppard.services;
import com.defLeppard.entities.Instructor;
import com.defLeppard.entities.Student;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.*;

import java.util.*;

/**
 *
 * Service for performing rest api requests.
 * Uses application.properties for identifying wix website address
 * and its api key.
 *
 * @author Hugo Ekstrand
 */
@Service
public class WixService {

    @Value("${wix.website}")
    private String address;

    @Value("${wix.apikey}")
    private String apiKey;

    private final RestTemplate template;

    public WixService(RestTemplateBuilder builder){
        template = builder.build();
    }

    /**
     * Calls the given function on the wix website with the given arguments.
     * @param function name of function being called.
     * @param args the arguments to be used in function.
     * @return the parsed json response form the server as the given type.
     *
     * @throws RestClientException if the given type does not fit the returned type.
     * @throws HttpClientErrorException if there is a clientside error related to the request.
     * @throws HttpServerErrorException if there is a serverside error related to the request.
     */
    public<T> ResponseEntity<T> call(Class<T> type, String function, String... args){

        /*
         * The structure of a request to the wix server is:
         * {website}/_functons/{function name}/{api key}/argument_1/argument_2/...
         * Where the amount of arguments may vary.
         */
        String uri = address
                + "/_functions/" + function
                + "/" + apiKey
                + "/" + Arrays.stream(args).reduce("", (acc, str) -> acc + "/" + str);

        try{
            return this.template.getForEntity(uri, type);
        }
        catch (HttpStatusCodeException ex){
            System.out.println("Error " + ex.getStatusCode() + " on call  to " + uri);
            throw ex;
        }
    }

    private List<Map<String, String>> callList(String function, String... args){
        var resp = call(ArrayList.class, function, args);
        return (List<Map<String, String>>) call(ArrayList.class, function, args).getBody();
    }

    /**
     * Returns a list of all instructors on the wix website.
     * @return the list of instructors
     */
    public List<Instructor> fetchInstructors(){
        return callList( "instructors").stream().map(map -> new Instructor(map.get("name"), UUID.fromString(map.get("id")))).toList();
    }

    /**
     * Returns a list of all students on the wix website.
     * @return the list of students
     */
    public List<Student> fetchStudent(){
        return callList("students").stream().map(map -> new Student(map.get("name"), map.get("loginEmail"), UUID.fromString(map.get("id")))).toList();
    }
}
