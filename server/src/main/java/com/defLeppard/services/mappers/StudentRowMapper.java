package com.defLeppard.services.mappers;

import com.defLeppard.enteties.Student;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class StudentRowMapper implements RowMapper<Student> {

    @Override
    public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Student(rs.getString("name"), rs.getString("loginEmail"));
    }
}
