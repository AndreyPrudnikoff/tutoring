INSERT INTO lessons ( lesson_id, start_time, end_time, status_lesson, comment )
    VALUES ('aa38b6e0-585c-11ed-9b6a-0242ac120004', '2022-11-11 14:00:00', '2022-11-11 15:00:00', 'expected', 'Whahaha');
INSERT INTO tutor_lessons ( user_id, lesson_id )
    VALUES ( 'ccc16cdb-b074-4b4d-86ed-9b88fdec4f4b', 'aa38b6e0-585c-11ed-9b6a-0242ac120004');
INSERT INTO student_lessons ( user_id, lesson_id )
    VALUES ( '7ee97c5d-85af-4e8e-8b2a-1becbec60d25', 'aa38b6e0-585c-11ed-9b6a-0242ac120004');
