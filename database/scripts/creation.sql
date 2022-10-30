DROP
DATABASE IF EXISTS tutoring;

CREATE
DATABASE tutoring;

CREATE TYPE status_lesson AS ENUM ('expected', 'completed', 'abandoned', 'canceled');
CREATE TYPE role AS ENUM ('tutor', 'student', 'admin');

CREATE TABLE users
(
    user_id    uuid         NOT NULL,
    first_name varchar(50)  NOT NULL,
    last_name  varchar(50)  NOT NULL,
    phone      varchar(50)  NOT NULL UNIQUE,
    email      varchar(50)  NOT NULL UNIQUE,
    user_role  role         NOT NULL,
    password   varchar(100) NOT NULL,
    PRIMARY KEY (user_id)
);
CREATE TABLE lessons
(
    lesson_id     uuid          NOT NULL,
    start_time    timestamp     NOT NULL,
    end_time      timestamp     NOT NULL,
    status_lesson status_lesson NOT NULL,
    comment       text,
    PRIMARY KEY (lesson_id)
);
CREATE TABLE user_lessons
(
    id        serial NOT NULL,
    tutor_id   uuid   NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    student_id   uuid   NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id uuid   NOT NULL,
    PRIMARY KEY (id)
);

