import {pool} from "../../database/index.js"
import crypto from "crypto";

const insertLessons = `INSERT INTO lessons ( lesson_id, start_time, end_time, status_lesson, comment )
                       VALUES ($1, $2, $3, $4, $5);`
const insertUserLessons = `INSERT INTO user_lessons (tutor_id, student_id, lesson_id)
                           VALUES ($1, $2, $3);`
const select = `SELECT u.tutor_id, u.student_id, l.lesson_id, l.start_time, l.end_time, l.status_lesson, l.comment
                FROM user_lessons as u
                         JOIN lessons as l
                              ON u.lesson_id = l.lesson_id
                WHERE key condition 'value'`
export const getLessons = async ({key = 'status_lesson', condition = '=', value = 'expected'}) => {
    try {
        const queryString = select.replace('key', key)
            .replace('condition', condition)
            .replace('value', value)
        const result = await pool.query(queryString)
        return {success: true, data: result.rows}
    } catch ({message}) {
        return {success: false, message}
    }
}
export const createLesson = async (lesson) => {
    try {
        await pool.query('BEGIN')
        const lesson_id = crypto.randomUUID()
        const {start_time, end_time, status_lesson, comment, tutor_id, student_id} = lesson
        await pool.query(insertLessons, [lesson_id, start_time, end_time, status_lesson, comment || ''])
        await pool.query(insertUserLessons, [tutor_id, student_id, lesson_id])
        await pool.query('COMMIT')
        return {success: true}
    } catch ({message}) {
        await pool.query('ROLLBACK')
        return {success: false, message}
    }
}
