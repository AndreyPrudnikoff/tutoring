SELECT u.tutor_id, u.student_id, l.lesson_id, l.start_time, l.end_time, l.status_lesson, l.comment
FROM user_lessons as u
JOIN lessons as l
ON u.lesson_id = l.lesson_id
WHERE status_lesson = 'expected';
