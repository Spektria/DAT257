INSERT INTO Location VALUES ('Vänersborg'), ('Göteborg')
                            , ('Uddevalla'), ('Halmstad')
                            , ('Helsingborg'), ('Alingsås')
                            , ('Ljungskile'), ('Kungsbacka')
                            , ('Lidköping'), ('Varberg')
                            , ('Falkenberg'), ('Båstad')
                            , ('Mellerud'), ('Smögen/Kungshamn')
                     ON CONFLICT DO NOTHING;

INSERT INTO Session VALUES (1,'Förarbevis', TO_TIMESTAMP('2022-05-03 12:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-03 13:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Kungsbacka'),
                            (2,'periodTest', TO_TIMESTAMP('2022-01-01 00:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-01-01 10:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Vänersborg'),
                            (3,'Förarbevis Teoriutbildning', TO_TIMESTAMP('2022-05-05 9:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-05 10:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Göteborg'),
                            (4,'Förarbevis', TO_TIMESTAMP('2022-05-06 12:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-06 13:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Vänersborg'),
                            (5,'Förarbevis Teoriutbildning', TO_TIMESTAMP('2022-05-07 9:00:00', 'YYYY-MM-DD HH24-MI'), TO_TIMESTAMP('2022-05-07 10:00:00', 'YYYY-MM-DD HH24-MI:SS'), 'Göteborg')
                     ON CONFLICT DO NOTHING;

INSERT INTO Instructor VALUES ('a7406234-b4b8-4914-8d44-77da3fb1645e', 'Peter Roos'),
                            ('260c75f1-230c-4fb9-ae12-1465228180c0', 'Adrian Briar'),
                            ('d8ada277-e67f-42d8-9151-ded5b71474a8', 'Josefin Larsson')
                     ON CONFLICT DO NOTHING;

INSERT INTO Student VALUES ('63ed2713-c562-42be-9947-f93efd1aed09', 'renny99@outlook.com', 'Renato Radevski'),
                            ('a06ff6d3-1907-4d39-990e-f087d2906ce1', 'jonte32@gmail.com', 'Jonathan Petersson'),
                            ('7843c282-2ca4-4d28-80c2-006138f2b9f5', 'jessimail@hotmail.com', 'Jessica Andersson'),
                            ('c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', 'addi@live.se', 'Adin Wilson'),
                            ('3a16f6c0-92e4-4504-a8b8-c95f10058348', 'tovnils@gmail.com', 'Tove Nilsson'),
                            ('841f1bcd-0baa-400d-9b3c-b035e1b2fed9', 'andres@hotmail.se', 'Andreas Johansson')
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
INSERT INTO StudentEducationalMoments VALUES ('Genomgång av säkerhetsutrustning', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Genomgång av vattenskotern', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Uppstart av vattenskotern', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Tillämpa svallfri fart', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Köra med passagerare', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Förtöjning', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Körning över vågor/svall i olika farter och vinklar', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Slå av gas och kontrollera glidsträcka', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Slå av gas och ge back', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Slå av gas och ge fullt roderutslag', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', '63ed2713-c562-42be-9947-f93efd1aed09', TRUE),

                                   ('Genomgång av säkerhetsutrustning', '3a16f6c0-92e4-4504-a8b8-c95f10058348', TRUE),
                                   ('Genomgång av vattenskotern', '3a16f6c0-92e4-4504-a8b8-c95f10058348', TRUE),
                                   ('Uppstart av vattenskotern', '3a16f6c0-92e4-4504-a8b8-c95f10058348', TRUE),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', '3a16f6c0-92e4-4504-a8b8-c95f10058348', TRUE),
                                   ('Tillämpa svallfri fart', '3a16f6c0-92e4-4504-a8b8-c95f10058348', TRUE),
                                   ('Köra med passagerare', '3a16f6c0-92e4-4504-a8b8-c95f10058348', TRUE),
                                   ('Förtöjning', '3a16f6c0-92e4-4504-a8b8-c95f10058348', TRUE),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', '3a16f6c0-92e4-4504-a8b8-c95f10058348', FALSE),
                                   ('Körning över vågor/svall i olika farter och vinklar', '3a16f6c0-92e4-4504-a8b8-c95f10058348', FALSE),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', '3a16f6c0-92e4-4504-a8b8-c95f10058348', FALSE),
                                   ('Slå av gas och kontrollera glidsträcka', '3a16f6c0-92e4-4504-a8b8-c95f10058348', TRUE),
                                   ('Slå av gas och ge back', '3a16f6c0-92e4-4504-a8b8-c95f10058348', TRUE),
                                   ('Slå av gas och ge fullt roderutslag', '3a16f6c0-92e4-4504-a8b8-c95f10058348', FALSE),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', '3a16f6c0-92e4-4504-a8b8-c95f10058348', FALSE),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', '3a16f6c0-92e4-4504-a8b8-c95f10058348', TRUE),

                                   ('Genomgång av säkerhetsutrustning', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Genomgång av vattenskotern', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Uppstart av vattenskotern', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Tillämpa svallfri fart', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Köra med passagerare', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Förtöjning', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Körning över vågor/svall i olika farter och vinklar', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Slå av gas och kontrollera glidsträcka', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Slå av gas och ge back', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Slå av gas och ge fullt roderutslag', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', '7843c282-2ca4-4d28-80c2-006138f2b9f5', FALSE),

                                   ('Genomgång av säkerhetsutrustning', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Genomgång av vattenskotern', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Uppstart av vattenskotern', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Tillämpa svallfri fart', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Köra med passagerare', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Förtöjning', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Körning över vågor/svall i olika farter och vinklar', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Slå av gas och kontrollera glidsträcka', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Slå av gas och ge back', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Slå av gas och ge fullt roderutslag', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', '841f1bcd-0baa-400d-9b3c-b035e1b2fed9', FALSE),

                                   ('Genomgång av säkerhetsutrustning', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', TRUE),
                                   ('Genomgång av vattenskotern', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', TRUE),
                                   ('Uppstart av vattenskotern', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', TRUE),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', TRUE),
                                   ('Tillämpa svallfri fart', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', TRUE),
                                   ('Köra med passagerare', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', TRUE),
                                   ('Förtöjning', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', TRUE),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', FALSE),
                                   ('Körning över vågor/svall i olika farter och vinklar', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', FALSE),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', FALSE),
                                   ('Slå av gas och kontrollera glidsträcka', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', TRUE),
                                   ('Slå av gas och ge back', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', TRUE),
                                   ('Slå av gas och ge fullt roderutslag', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', TRUE),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', TRUE),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', 'a06ff6d3-1907-4d39-990e-f087d2906ce1', TRUE),

                                   ('Genomgång av säkerhetsutrustning', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', TRUE),
                                   ('Genomgång av vattenskotern', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', TRUE),
                                   ('Uppstart av vattenskotern', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', TRUE),
                                   ('Köra fram till en boj eller brygga, stanna nära objektet, hålla vattenskotern stilla och därefter backa undan under kontrollerade former', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', TRUE),
                                   ('Tillämpa svallfri fart', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', TRUE),
                                   ('Köra med passagerare', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', FALSE),
                                   ('Förtöjning', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', FALSE),
                                   ('Fri körning för att hitta balans, gas, gasavdrag och back', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', TRUE),
                                   ('Körning över vågor/svall i olika farter och vinklar', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', TRUE),
                                   ('Girar i lugnt vatten samt girar i vågor eller svall', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', TRUE),
                                   ('Slå av gas och kontrollera glidsträcka', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', FALSE),
                                   ('Slå av gas och ge back', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', FALSE),
                                   ('Slå av gas och ge fullt roderutslag', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', TRUE),
                                   ('Slå av gas, gira och ge gas med kraftigt roderutslag', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', FALSE),
                                   ('Paddla med vattenskoter, fästa bogserlina i vattenskotern', 'c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', TRUE)
                            ON CONFLICT DO NOTHING;
                            
INSERT INTO Attend VALUES ('c84c7b60-aefc-49b3-b346-7d7fbf9c72c0', 'a7406234-b4b8-4914-8d44-77da3fb1645e', 2, 'Vänersborg'),
                     ('a06ff6d3-1907-4d39-990e-f087d2906ce1', 'a7406234-b4b8-4914-8d44-77da3fb1645e', 2, 'Vänersborg'),
                     ('7843c282-2ca4-4d28-80c2-006138f2b9f5', 'd8ada277-e67f-42d8-9151-ded5b71474a8', 3, 'Göteborg'),
                     ('841f1bcd-0baa-400d-9b3c-b035e1b2fed9', 'd8ada277-e67f-42d8-9151-ded5b71474a8', 3, 'Göteborg'),
                     ('63ed2713-c562-42be-9947-f93efd1aed09', '260c75f1-230c-4fb9-ae12-1465228180c0', 1, 'Kungsbacka'),
                     ('3a16f6c0-92e4-4504-a8b8-c95f10058348', '260c75f1-230c-4fb9-ae12-1465228180c0', 1, 'Kungsbacka')
              ON CONFLICT DO NOTHING;

