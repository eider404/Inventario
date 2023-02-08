CREATE DATABASE Example;
USE  Example;

CREATE TABLE User(
	id VARCHAR(16) PRIMARY KEY,
    email VARCHAR(64),
    username VARCHAR(64),
    password VARCHAR(64)
);

CREATE TABLE Product(
	idProduct VARCHAR(16) PRIMARY KEY,
    name VARCHAR(64),
    count INT,
    value INT,
    userId_fk VARCHAR(16),
    FOREIGN KEY (userId_fk) REFERENCES User(id)
);