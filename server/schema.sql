DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT,
  roomname VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT AUTO_INCREMENT,
  text VARCHAR(255),
  createdAt VARCHAR(255),
  updatedAt VARCHAR(255),
  id_User INT,
  id_Room INT,
  PRIMARY KEY (id),
  FOREIGN KEY (id_User) REFERENCES users(id),
  FOREIGN KEY (id_Room) REFERENCES rooms(id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

