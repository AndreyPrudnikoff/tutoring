import {pool} from "../../database/index.js"

const insert = 'INSERT INTO lessons( tutor_id, student_id, start_time, end_time, status_lesson, comment ) VALUES($1, $2, $3, $4, $5, $6)'
const select = "SELECT * FROM lessons WHERE key condition 'value'"
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
        const {tutor_id, student_id, start_time, end_time, status_lesson, comment} = lesson
        const result = await pool.query(insert, [tutor_id, student_id, start_time, end_time, status_lesson, comment || ''])
        return {success: true, data: result.rows}
    } catch ({message}) {
        return {success: false, message}
    }
}
