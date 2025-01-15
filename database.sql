CREATE DATABASE IF NOT EXISTS db_file;
USE db_file;

CREATE TABLE IF NOT EXISTS file(
    id INT auto_increment PRIMARY KEY,
    name VARCHAR(255),
    filePath VARCHAR(255),
    uploadDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_user(
	id INT auto_increment PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

DELIMITER $$
DROP PROCEDURE IF EXISTS proc_insertFile$$
CREATE PROCEDURE proc_insertFile
(
    IN p_name VARCHAR(255),
    IN p_filePath VARCHAR(255)
)
BEGIN 
    INSERT INTO file (name, filePath) 
    VALUES(p_name, p_filePath);   
END$$
DELIMITER ;


DELIMITER $$
DROP PROCEDURE IF EXISTS proc_doesUserExist$$
CREATE PROCEDURE proc_doesUserExist
(
IN p_username VARCHAR(255),
IN p_password VARCHAR(255),
OUT status INT
)
BEGIN 
  SELECT COUNT(*) INTO status
  FROM tbl_user
  WHERE username = p_username AND password = p_password;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS proc_addNewUser$$
CREATE PROCEDURE proc_addNewUser
(
IN p_username VARCHAR(255),
IN p_password VARCHAR(255),
IN p_confirmPassword VARCHAR(255),
OUT message VARCHAR(255)
)
BEGIN
	DECLARE status INT;
    DECLARE number INT;
    SET number = 1;
    
	IF number = 2 THEN 
		IF p_password = p_confirmPassword THEN
			SELECT COUNT(*) INTO status
			FROM tbl_user
			WHERE username = p_username;
    
			IF status = 0 THEN
				INSERT INTO tbl_user(username, password) 
				VALUES (p_username, p_password);
				SET message = 'successfully created an account';
			ELSE
				SET message = 'name already taken';
			END IF;
        
		ELSE
			SET message = "password doesnt match";
		END IF;
	ELSE
		SET message = "input to short";
	END IF;
END$$

DELIMITER ;

/*SELECT id, name, filePath, DATE_FORMAT(uploadDate, '%m/%d/%Y %H:%i') as uploadedDate FROM file;
*/

CALL proc_addNewUser('s', 's', 's', @message);
SELECT @message;
SELECT * FROM tbl_user;

SELECT username FROM tbl_user WHERE username LIKE ' %';

