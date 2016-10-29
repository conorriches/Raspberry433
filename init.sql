CREATE TABLE items (
  id integer primary key AUTOINCREMENT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  room TEXT NOT NULL,
  status BOOLEAN NOT NULL,
  channelNo INT NOT NULL,
  switchNo INT NOT NULL
);

CREATE TABLE timers(
  id integer primary key AUTOINCREMENT NOT NULL,
  name TEXT NOT NULL,
  status BOOLEAN NOT NULL,
  monday INT NOT NULL,
  tuesday INT NOT NULL,
  wednesday INT NOT NULL,
  thursday INT NOT NULL,
  friday INT NOT NULL,
  saturday INT NOT NULL,
  sunday INT NOT NULL,
  hours INT NOT NULL,
  minutes INT NOT NULL
);

CREATE TABLE timerActions(
  id integer primary key AUTOINCREMENT NOT NULL,
  timerId integer NOT NULL,
  itemId integer NOT NULL,
  action integer NOT NULL,
  FOREIGN KEY (timerId) REFERENCES timers(id),
  FOREIGN KEY (itemId) REFERENCES items(id)
);

INSERT INTO items VALUES (1, "Spotlights","lighting","Living", 0,1,1);
INSERT INTO items VALUES (2, "Book Light","lighting","Living", 0,1,2);
INSERT INTO items VALUES (3, "Immersion Heater","heating","Utility", 0,1,3);
INSERT INTO timers VALUES (1, true, "Evening Water", 1,1,1,1,1,0,0,16,0);
INSERT INTO timerActions VALUES (1,1,1,1);