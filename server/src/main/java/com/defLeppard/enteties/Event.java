package com.defLeppard.enteties;

import java.util.Date;

public record Event(int id, String title, Date from, Date to, String[] instructors, String[] participants, String location) {
}
