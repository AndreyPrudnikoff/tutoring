DROP DATABASE IF EXISTS tutoring;

CREATE DATABASE tutoring;

CREATE TYPE status_lesson AS ENUM ('expected', 'completed', 'abandoned', 'canceled');
CREATE TYPE role AS ENUM ('tutor', 'student', 'admin');

CREATE TABLE tutors
(
    user_id   uuid         NOT NULL,
    first_name varchar(50)  NOT NULL,
    last_name  varchar(50)  NOT NULL,
    phone      varchar(50)  NOT NULL UNIQUE,
    email      varchar(50)  NOT NULL UNIQUE,
    password   varchar(100) NOT NULL,
    PRIMARY KEY (tutor_id)
);
CREATE TABLE students
(
    user_id uuid         NOT NULL,
    first_name varchar(50)  NOT NULL,
    last_name  varchar(50)  NOT NULL,
    phone      varchar(50)  NOT NULL UNIQUE,
    email      varchar(50)  NOT NULL UNIQUE,
    password   varchar(100) NOT NULL,
    PRIMARY KEY (student_id)
);
CREATE TABLE lessons
(
    lesson_id     serial        NOT NULL,
    tutor_id      uuid          NOT NULL,
    student_id    uuid          NOT NULL,
    start_time    timestamp     NOT NULL,
    end_time      timestamp     NOT NULL,
    status_lesson status_lesson NOT NULL,
    comment       text,
    PRIMARY KEY (lesson_id, tutor_id, student_id),
    FOREIGN KEY (student_id) REFERENCES students (user_id) ON DELETE CASCADE,
    FOREIGN KEY (tutor_id) REFERENCES tutors (user_id) ON DELETE CASCADE
);
