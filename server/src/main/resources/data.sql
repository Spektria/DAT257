INSERT INTO Location VALUES ('Vänersborg'), ('Göteborg')
                            , ('Uddevalla'), ('Halmstad')
                            , ('Helsingborg'), ('Alingsås')
                            , ('Ljungskile'), ('Kungsbacka')
                            , ('Lidköping'), ('Varberg')
                            , ('Falkenberg'), ('Båstad')
                            , ('Mellerud'), ('Smögen/Kungshamn')
                     ON CONFLICT DO NOTHING;

INSERT INTO Session VALUES (1,'Förarbevis', TO_TIMESTAMP('2022-05-03 12:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-03 13:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Vänersborg'),
                            (2,'Förarbevis', TO_TIMESTAMP('2022-05-04 12:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-04 13:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Vänersborg'),
                            (3,'Förarbevis Teoriutbildning', TO_TIMESTAMP('2022-05-05 9:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-05 10:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Göteborg'),
                            (4,'Förarbevis', TO_TIMESTAMP('2022-05-06 12:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-06 13:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Vänersborg'),
                            (5,'Förarbevis Teoriutbildning', TO_TIMESTAMP('2022-05-07 9:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-07 10:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Göteborg')
                     ON CONFLICT DO NOTHING;


