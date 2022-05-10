package com.defLeppard.services.mappers;

import com.defLeppard.enteties.Event;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

class EventRowMapper implements RowMapper<Event> {
    @Override
    public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Event(rs.getInt("idnr"), rs.getString("title")
                        , rs.getDate("fromDate"), rs.getDate("toDate")
                        , new String[]{}
                        , new String[]{}
                        , rs.getString("location"));
    }
}
