INSERT INTO Location VALUES ('Vänersborg'), ('Göteborg')
                            , ('Uddevalla'), ('Halmstad')
                            , ('Helsingborg'), ('Alingsås')
                            , ('Ljungskile'), ('Kungsbacka')
                            , ('Lidköping'), ('Varberg')
                            , ('Falkenberg'), ('Båstad')
                            , ('Mellerud'), ('Smögen/Kungshamn')
                     ON CONFLICT DO NOTHING;

INSERT INTO Session VALUES (1,'Förarbevis', TO_TIMESTAMP('2022-05-03 12:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-03 13:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Kungsbacka'),
                            (2,'Förarbevis', TO_TIMESTAMP('2022-05-04 12:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-04 13:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Vänersborg'),
                            (3,'Förarbevis Teoriutbildning', TO_TIMESTAMP('2022-05-05 9:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-05 10:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Göteborg'),
                            (4,'Förarbevis', TO_TIMESTAMP('2022-05-06 12:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-06 13:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Vänersborg'),
                            (5,'Förarbevis Teoriutbildning', TO_TIMESTAMP('2022-05-07 9:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-07 10:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Göteborg')
                     ON CONFLICT DO NOTHING;

INSERT INTO Instructor VALUES ('rpeter99', 'rprr@radevski.com', 'Peter Roos'),
                            ('badrian98','adrianb96@gmail.com', 'Adrian Briar'),
                            ('ljosse', 'josefin123@gmail.com', 'Josefin Larsson'),
                            ('ljosse2', 'josefin123@gmail.com', 'Josefin Larsson')
                     ON CONFLICT DO NOTHING;

INSERT INTO Student VALUES ('renny99@outlook.com', 'Renato Radevski'),
                            ('jonte32@gmail.com', 'Jonathan Petersson'),
                            ('jessimail@hotmail.com', 'Jessica Andersson'),
                            ('addi@live.se', 'Adin Wilson'),
                            ('tovnils@gmail.com', 'Tove Nilsson'),
                            ('andres@hotmail.se', 'Andreas Johansson')
                     ON CONFLICT DO NOTHING;

INSERT INTO EducationalMoment VALUES ('Genomgång av säkerhetsutrustning', 'Vanligt moment'),
                                   ('Genomgång av vattenskotern', 'Vanligt moment'),
                                   ('Uppstart av vattenskotern', 'Vanligt moment'),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', 'Vanligt moment'),
                                   ('Tillämpa svallfri fart', 'Vanligt moment'),
                                   ('Köra med passagerare', 'Vanligt moment'),
                                   ('Förtöjning', 'Vanligt moment'),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', 'Högfartsmanöverövningar'),
                                   ('Körning över vågor/svall i olika farter och vinklar', 'Högfartsmanöverövningar'),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', 'Högfartsmanöverövningar'),
                                   ('Slå av gas och kontrollera glidsträcka', 'Undanmanöverövningar'),
                                   ('Slå av gas och ge back', 'Undanmanöverövningar'),
                                   ('Slå av gas och ge fullt roderutslag', 'Undanmanöverövningar'),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', 'Undanmanöverövningar'),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', 'Nödåtgärder - simulering av motorstopp')
                            ON CONFLICT DO NOTHING;
INSERT INTO StudentEducationalMoments VALUES ('Genomgång av säkerhetsutrustning', 'renny99@outlook.com', TRUE),
                                   ('Genomgång av vattenskotern', 'renny99@outlook.com', TRUE),
                                   ('Uppstart av vattenskotern', 'renny99@outlook.com', TRUE),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', 'renny99@outlook.com', TRUE),
                                   ('Tillämpa svallfri fart', 'renny99@outlook.com', TRUE),
                                   ('Köra med passagerare', 'renny99@outlook.com', TRUE),
                                   ('Förtöjning', 'renny99@outlook.com', TRUE),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', 'renny99@outlook.com', TRUE),
                                   ('Körning över vågor/svall i olika farter och vinklar', 'renny99@outlook.com', TRUE),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', 'renny99@outlook.com', TRUE),
                                   ('Slå av gas och kontrollera glidsträcka', 'renny99@outlook.com', TRUE),
                                   ('Slå av gas och ge back', 'renny99@outlook.com', TRUE),
                                   ('Slå av gas och ge fullt roderutslag', 'renny99@outlook.com', TRUE),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', 'renny99@outlook.com', TRUE),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', 'renny99@outlook.com', TRUE),

                                   ('Genomgång av säkerhetsutrustning', 'tovnils@gmail.com', TRUE),
                                   ('Genomgång av vattenskotern', 'tovnils@gmail.com', TRUE),
                                   ('Uppstart av vattenskotern', 'tovnils@gmail.com', TRUE),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', 'tovnils@gmail.com', TRUE),
                                   ('Tillämpa svallfri fart', 'tovnils@gmail.com', TRUE),
                                   ('Köra med passagerare', 'tovnils@gmail.com', TRUE),
                                   ('Förtöjning', 'tovnils@gmail.com', TRUE),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', 'tovnils@gmail.com', FALSE),
                                   ('Körning över vågor/svall i olika farter och vinklar', 'tovnils@gmail.com', FALSE),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', 'tovnils@gmail.com', FALSE),
                                   ('Slå av gas och kontrollera glidsträcka', 'tovnils@gmail.com', TRUE),
                                   ('Slå av gas och ge back', 'tovnils@gmail.com', TRUE),
                                   ('Slå av gas och ge fullt roderutslag', 'tovnils@gmail.com', FALSE),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', 'tovnils@gmail.com', FALSE),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', 'tovnils@gmail.com', TRUE),

                                   ('Genomgång av säkerhetsutrustning', 'jessimail@hotmail.com', FALSE),
                                   ('Genomgång av vattenskotern', 'jessimail@hotmail.com', FALSE),
                                   ('Uppstart av vattenskotern', 'jessimail@hotmail.com', FALSE),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', 'jessimail@hotmail.com', FALSE),
                                   ('Tillämpa svallfri fart', 'jessimail@hotmail.com', FALSE),
                                   ('Köra med passagerare', 'jessimail@hotmail.com', FALSE),
                                   ('Förtöjning', 'jessimail@hotmail.com', FALSE),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', 'jessimail@hotmail.com', FALSE),
                                   ('Körning över vågor/svall i olika farter och vinklar', 'jessimail@hotmail.com', FALSE),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', 'jessimail@hotmail.com', FALSE),
                                   ('Slå av gas och kontrollera glidsträcka', 'jessimail@hotmail.com', FALSE),
                                   ('Slå av gas och ge back', 'jessimail@hotmail.com', FALSE),
                                   ('Slå av gas och ge fullt roderutslag', 'jessimail@hotmail.com', FALSE),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', 'jessimail@hotmail.com', FALSE),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', 'jessimail@hotmail.com', FALSE),

                                   ('Genomgång av säkerhetsutrustning', 'andres@hotmail.se', FALSE),
                                   ('Genomgång av vattenskotern', 'andres@hotmail.se', FALSE),
                                   ('Uppstart av vattenskotern', 'andres@hotmail.se', FALSE),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', 'andres@hotmail.se', FALSE),
                                   ('Tillämpa svallfri fart', 'andres@hotmail.se', FALSE),
                                   ('Köra med passagerare', 'andres@hotmail.se', FALSE),
                                   ('Förtöjning', 'andres@hotmail.se', FALSE),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', 'andres@hotmail.se', FALSE),
                                   ('Körning över vågor/svall i olika farter och vinklar', 'andres@hotmail.se', FALSE),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', 'andres@hotmail.se', FALSE),
                                   ('Slå av gas och kontrollera glidsträcka', 'andres@hotmail.se', FALSE),
                                   ('Slå av gas och ge back', 'andres@hotmail.se', FALSE),
                                   ('Slå av gas och ge fullt roderutslag', 'andres@hotmail.se', FALSE),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', 'andres@hotmail.se', FALSE),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', 'andres@hotmail.se', FALSE),

                                   ('Genomgång av säkerhetsutrustning', 'jonte32@gmail.com', TRUE),
                                   ('Genomgång av vattenskotern', 'jonte32@gmail.com', TRUE),
                                   ('Uppstart av vattenskotern', 'jonte32@gmail.com', TRUE),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', 'jonte32@gmail.com', TRUE),
                                   ('Tillämpa svallfri fart', 'jonte32@gmail.com', TRUE),
                                   ('Köra med passagerare', 'jonte32@gmail.com', TRUE),
                                   ('Förtöjning', 'jonte32@gmail.com', TRUE),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', 'jonte32@gmail.com', FALSE),
                                   ('Körning över vågor/svall i olika farter och vinklar', 'jonte32@gmail.com', FALSE),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', 'jonte32@gmail.com', FALSE),
                                   ('Slå av gas och kontrollera glidsträcka', 'jonte32@gmail.com', TRUE),
                                   ('Slå av gas och ge back', 'jonte32@gmail.com', TRUE),
                                   ('Slå av gas och ge fullt roderutslag', 'jonte32@gmail.com', TRUE),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', 'jonte32@gmail.com', TRUE),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', 'jonte32@gmail.com', TRUE),

                                   ('Genomgång av säkerhetsutrustning', 'addi@live.se', TRUE),
                                   ('Genomgång av vattenskotern', 'addi@live.se', TRUE),
                                   ('Uppstart av vattenskotern', 'addi@live.se', TRUE),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', 'addi@live.se', TRUE),
                                   ('Tillämpa svallfri fart', 'addi@live.se', TRUE),
                                   ('Köra med passagerare', 'addi@live.se', FALSE),
                                   ('Förtöjning', 'addi@live.se', FALSE),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', 'addi@live.se', TRUE),
                                   ('Körning över vågor/svall i olika farter och vinklar', 'addi@live.se', TRUE),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', 'addi@live.se', TRUE),
                                   ('Slå av gas och kontrollera glidsträcka', 'addi@live.se', FALSE),
                                   ('Slå av gas och ge back', 'addi@live.se', FALSE),
                                   ('Slå av gas och ge fullt roderutslag', 'addi@live.se', TRUE),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', 'addi@live.se', FALSE),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', 'addi@live.se', TRUE)
                            ON CONFLICT DO NOTHING;
INSERT INTO Attend VALUES ('addi@live.se', 'rpeter99', 2, 'Vänersborg'),
                     ('jonte32@gmail.com', 'rpeter99', 2, 'Vänersborg'),
                     ('jessimail@hotmail.com', 'ljosse', 3, 'Göteborg'),
                     ('andres@hotmail.se', 'ljosse', 3, 'Göteborg'),
                     ('renny99@outlook.com', 'badrian98', 1, 'Kungsbacka'),
                     ('tovnils@gmail.com', 'badrian98', 1, 'Kungsbacka')
              ON CONFLICT DO NOTHING;

