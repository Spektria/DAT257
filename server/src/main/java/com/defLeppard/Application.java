package com.defLeppard;

import com.defLeppard.services.WixService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.HashMap;


/**
 * Initializes the spring context and any other top level
 * application functions.
 *
 * @author Hugo Ekstrand
 */


@SpringBootApplication
@EnableScheduling
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Autowired
	private WixService wixService;

	@Scheduled(fixedRate = 1000 * 10) // ms, i.e. 10 sec
	private void pingWix(){
		System.out.println(wixService.call(String.class,"hello", new String[]{}).getBody());
		HashMap<String, String> b = wixService.call(HashMap.class, "services", new String[]{}).getBody();
		System.out.println(b);
	}

}
