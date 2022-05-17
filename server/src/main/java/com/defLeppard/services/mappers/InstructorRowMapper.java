package com.defLeppard.services.mappers;

import com.defLeppard.entities.Instructor;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

/**
 * RowMapper for Instructor record
 * @author Hugo Ekstrand
 */
class InstructorRowMapper implements RowMapper<Instructor> {
    @Override
    public Instructor mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Instructor(rs.getString("name"), UUID.fromString(rs.getString("instructorid")));
    }
}
