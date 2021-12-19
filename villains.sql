SHOW databases;

CREATE DATABASE villainsDB; 

USE villainsDB;
CREATE TABLE villains(
id INT auto_increment,
name VARCHAR(255),
movie VARCHAR(255),
slug VARCHAR(255),
updatedAT DATETIME DEFAULT NOW(),
createdAT DATETIME DEFAULT NOW(),
deletedAT DATETIME,
PRIMARY KEY(id)
);

INSERT INTO villains (name, movie, slug) VALUES ('Captain Hook', 'Peter Pan', 'captain-hook'), ('Cruella de Vil', 'One Hundred and One Dalmatians', 'cruella-de-vil'), 
('Gaston', 'Beauty and the Beast', 'gaston'), ('Hades', 'Hercules', 'hades'), ('Horned King', 'The Black Cauldron', 'horned-king'), 
('Jafar', 'Aladdin', 'jafar'), ('Lady Tremaine', 'Cinderella', 'lady-tremaine'), ('Madame Medusa', 'The Rescuers', 'madame-medusa'), 
('Madam Mim', 'The Sword in the Stone', 'madam-mim'), ('Maleficent', 'Sleeping Beauty', 'maleficent'), ('Prince John', 'Robin Hood', 'prince-john'), 
('Sir Hiss', 'Robin Hood', 'sir-hiss'), ('Queen Grimhilde', 'Snow White and the Seven Dwarfs', 'queen-grimhilde'), ('Queen of Hearts', 'Alice in Wonderland', 'queen-of-hearts'), 
('Scar', 'The Lion King', 'scar'), ('Shan Yu', 'Mulan', 'shan-yu'), ('Shere Khan', 'The Jungle Book', 'shere-khan'), 
('Ursula', 'The Little Mermaid', 'ursula');

USE villainsDB;
SELECT * FROM villains;

CREATE USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

GRANT ALL ON villainsDB.* TO 'user'@'localhost';
