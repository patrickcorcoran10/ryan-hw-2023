DROP IF EXISTS user_management_db;

CREATE DATABASE user_management_db;
USE user_management_db;

CREATE TABLE Users (
    id int not null auto_increment,
    first_name varchar(20),
    last_name varchar(20),
    email varchar(30),
    phone varchar(20),
    comments text,
    status varchar(20) not null default 'active', 
    primary key (id)
);

INSERT INTO Users
VALUES (NULL, 'Jacob', 'Lee', 'alais@email.com', "815-555-4321", 'What a cool dude', 'active'),
(NULL, 'Tyson', 'Fury', 'tyson@email.com', '815-111-4321', 'What a fighter', 'active'),
(NULL, 'Mohammed', 'Ali', 'ali@email.com', '815-222-4321', 'Float like a butterfly', 'active'),
(NULL, 'Cider', 'Goad', 'cider@email.com', '815-333-4321', 'What a cool dog', 'active'),
(NULL, 'Novie', 'Gracie', 'nova@email.com', '815-444-4321', 'What a cool cat', 'active'),
(NULL, 'Raindrop', 'Pinkston', 'raindrop@email.com', '815-777-4321', 'This thing is evil', 'active');