CREATE TABLE IF NOT EXISTS Location( 
	name TEXT PRIMARY KEY NOT NULL); 

CREATE TABLE IF NOT EXISTS Session( 
	idnr INT NOT NULL,
	title TEXT NOT NULL,
	fromdate TIMESTAMP NOT NULL,
	todate TIMESTAMP NOT NULL,
	location TEXT REFERENCES Location(name) NOT NULL,
	PRIMARY KEY (idnr, location)); 

CREATE TABLE IF NOT EXISTS Instructor( 
	login TEXT PRIMARY KEY NOT NULL, 
	email TEXT NOT NULL, 
	name TEXT NOT NULL); 

CREATE TABLE IF NOT EXISTS Student(
	email TEXT PRIMARY KEY NOT NULL,
	name TEXT NOT NULL);
	 

CREATE TABLE IF NOT EXISTS EducationalMoment(
	name TEXT PRIMARY KEY NOT NULL,
	description TEXT NOT NULL); 
	
CREATE TABLE IF NOT EXISTS StudentEducationalMoments(
	educationalMoment TEXT REFERENCES EducationalMoment(name) PRIMARY KEY NOT NULL,
	studentEmail TEXT REFERENCES Student(email),
	completed BOOLEAN NOT NULL); 

CREATE TABLE IF NOT EXISTS Attend( 
	studentEmail TEXT REFERENCES Student(email) NOT NULL,
	instructor TEXT REFERENCES Instructor(login) NOT NULL,
	sessionIdnr INT NOT NULL,
	sessionLocation TEXT NOT NULL,
	FOREIGN KEY(sessionIdnr, sessionLocation) REFERENCES Session(idnr,location)); 
	

