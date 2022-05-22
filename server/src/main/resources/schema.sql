CREATE TABLE IF NOT EXISTS Session(
	idnr INT NOT NULL,
	title TEXT NOT NULL,
	fromdate TIMESTAMP NOT NULL,
	todate TIMESTAMP NOT NULL,
	location TEXT NOT NULL,
	PRIMARY KEY (idnr, location)); 

CREATE TABLE IF NOT EXISTS Instructor(
    instructorid UUID PRIMARY KEY NOT NULL,
	name TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS Student(
    studentid UUID PRIMARY KEY NOT NULL,
	loginEmail TEXT NOT NULL,
	name TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS EducationalMoment(
	name TEXT PRIMARY KEY NOT NULL,
	description TEXT NOT NULL); 
	
CREATE TABLE IF NOT EXISTS StudentEducationalMoments(
	educationalMoment TEXT REFERENCES EducationalMoment(name) NOT NULL,
	studentmomentid UUID REFERENCES Student(studentid) NOT NULL,
	completed BOOLEAN NOT NULL,
	PRIMARY KEY (educationalMoment, studentmomentid));

CREATE TABLE IF NOT EXISTS Attend( 
	studentattendid    UUID REFERENCES Student(studentid) NOT NULL,
	instructorattendid UUID REFERENCES Instructor(instructorid) NOT NULL,
	sessionIdnr INT NOT NULL,
	sessionLocation TEXT NOT NULL,
	FOREIGN KEY(sessionIdnr, sessionLocation) REFERENCES Session(idnr,location) ON DELETE CASCADE);
	

