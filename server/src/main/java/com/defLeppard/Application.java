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
import java.lang.reflect.Array;
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
		//databaseService.addStudentsToDatabase(wixService.call(String.class, "students",new String[]{}).getBody());
	}

	@Autowired
	private WixService wixService;

}
