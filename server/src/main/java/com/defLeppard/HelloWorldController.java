package com.defLeppard;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 *
 * @author Hugo Ekstrand
 */
@RestController
public class HelloWorldController {

    @GetMapping("/")
    public String helloWorld(){ return "Hello World!"; }

}
