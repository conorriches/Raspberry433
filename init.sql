CREATE TABLE items (
  id integer primary key AUTOINCREMENT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  room TEXT NOT NULL,
  status BOOLEAN NOT NULL,
  channelNo INT NOT NULL,
  switchNo INT NOT NULL
);