import Pool from 'pg-pool'
import * as dotenv from 'dotenv'
dotenv.config()


const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
};

export const pool = new Pool(config);

pool.query(`DO $$ BEGIN
    CREATE TYPE status_lesson AS ENUM ('expected', 'completed', 'abandoned', 'canceled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS students
(
    user_id    uuid     NOT NULL,
    first_name varchar(50)  NOT NULL,
    last_name  varchar(50)  NOT NULL,
    phone      varchar(50)  NOT NULL UNIQUE,
    email      varchar(50)  NOT NULL UNIQUE,
    password   varchar(100) NOT NULL,
    PRIMARY KEY (user_id)
);
CREATE TABLE IF NOT EXISTS tutors
(
    user_id    uuid       NOT NULL,
    first_name varchar(50)  NOT NULL,
    last_name  varchar(50)  NOT NULL,
    phone      varchar(50)  NOT NULL UNIQUE,
    email      varchar(50)  NOT NULL UNIQUE,
    password   varchar(100) NOT NULL,
    subjects   uuid[],
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS subjects
(
    subject_id  uuid               NOT NULL,
    subject_name     varchar(50)   NOT NULL,
    PRIMARY KEY (subject_id)
);
CREATE TABLE IF NOT EXISTS lessons
(
    lesson_id     uuid          NOT NULL,
    start_time    timestamp     NOT NULL,
    end_time      timestamp     NOT NULL,
    status_lesson status_lesson NOT NULL,
    subject_id   uuid   NOT NULL REFERENCES subjects(subject_id) ON DELETE CASCADE,
    student_id   uuid   NOT NULL REFERENCES students(user_id) ON DELETE CASCADE,
    tutor_id   uuid   NOT NULL REFERENCES tutors(user_id) ON DELETE CASCADE,
    comment       text,
    PRIMARY KEY (lesson_id)
);`)
