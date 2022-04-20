package com.defLeppard.services;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

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
     * @param function Name of function being called.
     * @return the json string response from the server.
     */
    public String call(String function){
        return call(function, new String[]{});
    }

    /**
     * Calls the given function on the wix website with the given arguments.
     * @param function name of function being called.
     * @param args the arguments to be used in function.
     * @return the json string response from the server.
     */
    public String call(String function, String... args){

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
            var data = this.template.getForObject(uri, String.class);
            if(data == null)
                System.out.println("Notice empty response from: \"" + uri + "\" :: ");
            return data;
        }
        catch (HttpClientErrorException ex){
            System.out.println("Error " + ex.getRawStatusCode() + " from request to: \"" + uri + "\" :: " + ex.getMessage());
        }

        return null;
    }
}
