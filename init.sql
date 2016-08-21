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
  channelNo integer NOT NULL,
  switchNo integer NOT NULL,
  action integer NOT NULL,
  FOREIGN KEY (timerId) REFERENCES timers(id)
);