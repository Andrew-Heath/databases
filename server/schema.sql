CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(22) NOT NULL,
  PRIMARY KEY(id)

);

CREATE TABLE rooms(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(22) NOT NULL,
  PRIMARY KEY(id)

);

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  message VARCHAR(255),
  user INT NOT NULL,
  room INT,
  PRIMARY KEY(id),
  FOREIGN KEY(user) REFERENCES users(id),
  FOREIGN KEY(room) REFERENCES rooms(id)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

