package com.defLeppard.services.mappers;
import org.springframework.jdbc.core.RowMapper;
import java.util.Map;

/**
 * Factory for {@link RowMapper}s.
 * @author Hugo Ekstrand
 */
public class RowMapperFactory {
    final static Map<String, RowMapper<?>> mapToMapper =
        Map.of(
                // Insert new mappers and their respective constructors here
            EduMomentRowMapper.class.getSimpleName(), new EduMomentRowMapper()
            );

    /**
     * Retrieves the {@link RowMapper} for the given class. If it does not exist, it returns null.
     * @param clazz the class to be mapped
     * @param <T> the class to be mapped
     * @return the mapper for the class
     */
    public static<T> RowMapper<T> createRowMapper(Class<T> clazz){
        return (RowMapper<T>) mapToMapper.get(clazz.getSimpleName() + "RowMapper");
    }
}
