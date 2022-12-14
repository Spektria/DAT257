package com.defLeppard.services.mappers;

import com.defLeppard.entities.Event;
import com.defLeppard.entities.Instructor;
import com.defLeppard.entities.Student;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

/**
 * RowMapper for Event record.
 * @author Hugo Ekstrand
 */
class EventRowMapper implements RowMapper<Event> {
    @Override
    public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Event(rs.getInt("idnr"), rs.getString("title")
                        , new Date(rs.getTimestamp("fromDate").getTime()), new Date(rs.getTimestamp("toDate").getTime())
                        , new Instructor[]{}        // Note. A bit wonky because of limits in sql query instructors and participants cannot be found in same query.
                        , new Student[]{}
                        , rs.getString("location"));
    }
}
