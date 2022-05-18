package com.defLeppard.services.mappers;

import com.defLeppard.entities.EduMoment;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * RowMapper for {@link EduMoment}.
 * @author Hugo Ekstrand
 */
class EduMomentRowMapper implements RowMapper<EduMoment> {
    @Override
    public EduMoment mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new EduMoment(rs.getString("educationalmoment"), rs.getString("description"), rs.getBoolean("completed"));
    }
}
