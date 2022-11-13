import { pool } from '../../database/index.js'
import crypto from 'crypto';

const insertLessons = `INSERT INTO lessons ( lesson_id, start_time, end_time, status_lesson, comment, subject_id, tutor_id, student_id )
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
const select = `SELECT lesson_id, start_time, end_time, status_lesson, comment, student_id, tutor_id
                FROM lessons
                WHERE key condition 'value'`
export const getLessons = async ({key, condition, value, extraCondition, key2, condition2, value2}) => {
    try {
        const queryString = () => {
            let str = select.replace('key', key)
                .replace('condition', condition === 'more' ? '>=' : '<=')
                .replace('value', value)
            if (!extraCondition) return str
            return str + ` ${extraCondition} ${key2} ${condition2 === 'more' ? '>=' : '<='} '${value2}'`
        }
        const result = await pool.query(queryString())
        return {success: true, data: result.rows}
    } catch ({message}) {
        return {success: false, message}
    }
}
export const createLesson = async (lesson) => {
    try {
        const lesson_id = crypto.randomUUID()
        const {start_time, end_time, status_lesson, comment, subject_id, tutor_id, student_id} = lesson
        await pool.query(insertLessons, [lesson_id, start_time, end_time, status_lesson, comment || '', subject_id, tutor_id, student_id])
        return {success: true}
    } catch ({message}) {
        return {success: false, message}
    }
}
