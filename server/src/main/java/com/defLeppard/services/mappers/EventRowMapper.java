package com.defLeppard.services.mappers;

import com.defLeppard.enteties.Event;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * RowMapper for Event record.
 * @author Hugo Ekstrand
 */
class EventRowMapper implements RowMapper<Event> {
    @Override
    public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Event(rs.getInt("idnr"), rs.getString("title")
                        , rs.getDate("fromDate"), rs.getDate("toDate")
                        , new String[]{}        // Note. A bit wonky because of limits in sql query instructors and participants cannot be found in same query.
                        , new String[]{}
                        , rs.getString("location"));
    }
}
