package com.defLeppard.services;


import com.defLeppard.Application;
import org.springframework.boot.SpringApplication;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * Service for performing database queries, inserts and other database related actions.
 *
 * @author Jonas Röst
 */

@Service
public class DatabaseService implements CommandLineRunner{

    @Autowired
    private JdbcTemplate jdbcTemplate;


    /**
     *
     * Inserts an example row into the internal database table Student and prints how many
     * rows that have been changed.
     *
     */
    @Override
    public void run(String[] args) throws Exception {
        String sql = "INSERT INTO Student VALUES (9806135372,'Wille', 'willecool99@gmail.com')";
        int rows = jdbcTemplate.update(sql);
        System.out.println(rows);
    }

}
