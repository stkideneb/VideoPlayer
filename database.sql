CREATE DATABASE db_file;
USE db_File;

CREATE TABLE file(
    id INT auto_increment PRIMARY KEY,
    name VARCHAR2(255),
    filePath VARCHAR2(255),
    uploadDate TIMESTAMP CURRENT_TIMESTAMP
);