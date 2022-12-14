package com.defLeppard.services.mappers;

import com.defLeppard.entities.Student;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

/**
 * RowMapper for Student record
 * @author Hugo Ekstrand
 */
class StudentRowMapper implements RowMapper<Student> {

    @Override
    public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Student(rs.getString("name"), rs.getString("loginEmail"), UUID.fromString(rs.getString("studentid")));
    }
}
