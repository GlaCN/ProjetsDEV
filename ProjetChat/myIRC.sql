DROP DATABASE IF EXISTS myIRC;
CREATE DATABASE IF NOT EXISTS myIRC;
USE myIRC;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  pseudo varchar(79) NOT NULL,
  email varchar(79) NOT NULL,
  mdp varchar(79) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO users (id, pseudo,email, mdp, created_at, updated_at) VALUES
(1, 'monster', 'monster@yahoo.fr', '1234', '2024-03-29', NULL);





CREATE TABLE channels (
  id int(11) NOT NULL AUTO_INCREMENT,
  identifier varchar(79) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO channels (id, identifier, created_at, updated_at) VALUES
(1, 'food', '2024-03-29', NULL),
(2, 'cinema', '2024-03-29', NULL),
(3, 'trip', '2024-03-29', NULL);




CREATE TABLE messages (
  id int(11) NOT NULL AUTO_INCREMENT,
  content varchar(79) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATE,
  users_id int(11) NOT NULL,
  channels_id int(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (users_id) REFERENCES users(id),
  FOREIGN KEY (channels_id) REFERENCES channels(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO messages (id, content,created_at, updated_at, users_id, channels_id) VALUES
(1, 'Hello', '2024-03-29', NULL, 1, 3);





CREATE TABLE users_channels (
  users_id int(11) NOT NULL,
  channels_id int(11) NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users(id),
  FOREIGN KEY (channels_id) REFERENCES channels(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO users_channels (users_id, channels_id) VALUES
(1, 2);
