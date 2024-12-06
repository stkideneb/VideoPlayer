CREATE DATABASE IF NOT EXISTS db_file;
USE db_file;

CREATE TABLE IF NOT EXISTS file(
    id INT auto_increment PRIMARY KEY,
    name VARCHAR(255),
    filePath VARCHAR(255),
    uploadDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);






SELECT id, name, filePath, DATE_FORMAT(uploadDate, '%m/%d/%Y %H:%i') as uploadedDate FROM file;

delimiter $$

CREATE PROCEDURE proc_insertFile
(
    IN p_name VARCHAR(255),
    IN p_filePath VARCHAR(255)
)
BEGIN 
    INSERT INTO file (name, filePath) 
    VALUES(p_name, p_filePath);   
END$$

delimiter ;

CALL proc_insertFile("test", "C:/Users/Zinte/Videos/chocolate_cake.mov");


/* DELETE FROM file; */
