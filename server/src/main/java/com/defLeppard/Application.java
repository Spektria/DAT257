package com.defLeppard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;


/**
 * Initializes the spring context and any other top level
 * application functions.
 *
 * @author Hugo Ekstrand
 */


@SpringBootApplication
public class Application{

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	public static void run(String[] args) throws Exception {
		String sql = "INSERT INTO Student VALUES (9806135372,'Wille', 'willecool99@gmail.com')";
		int rows = jdbcTemplate.update(sql);
		System.out.println(rows);
		System.out.println("test");
	}

}
