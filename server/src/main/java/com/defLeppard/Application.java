package com.defLeppard;

import com.defLeppard.services.DatabaseService;
import com.defLeppard.services.WixService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.IOException;
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


	/**
	 *
	 * Runs the methods for inserting read students into the database
	 *
	 */

	@Autowired
	private DatabaseService databaseService;
	@EventListener(ApplicationReadyEvent.class)
	public void addStudents () throws IOException {
		//databaseService.addStudentsToDatabase("src/main/java/com/defLeppard/services/testJSONStudent.json");
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
