package com.defLeppard.services;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.*;

import java.util.Arrays;

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
     * Calls the given function on the wix website.
     * @param function name of function being called.
     * @return the parsed json response form the server as the given type.
     *
     * @throws RestClientException if the given type does not fit the returned type.
     * @throws HttpClientErrorException if there is a clientside error related to the request.
     * @throws HttpServerErrorException if there is a serverside error related to the request.
     */
    public<T> ResponseEntity<T> call(Class<T> type, String function){
        return call(type, function);
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
}
