import {pool} from "../../database/index.js"
import crypto from 'crypto'

const insert = 'INSERT INTO users(user_id, first_name, last_name, email, phone, password) VALUES($1, $2, $3, $4, $5, $6)'
const select = "SELECT * FROM users WHERE key = 'value'"
const salt = "secretkeynumber1"

export const createUser = async (user) => {
    const role = user.role ? 'tutor' : 'student'
    user.user_id = crypto.randomUUID()
    user.password = crypto.scryptSync(user.reg_password, salt, 36).toString('hex')
    try {
        const queryString = insert.replace('users', `${role}s`)
        const {user_id, first_name, last_name, email, phone, password} = user
        await pool.query(queryString, [user_id, first_name, last_name, email, phone, password])
        return {success: true}
    } catch ({message}) {
        return {success: false, message}
    }
}
export const getUser = async (user) => {
    try {
        const role = user.role ? 'tutor' : 'student'
        const {email, phone, password} = user
        const key = email ? 'email' : 'phone'
        const queryString = select.replace('user', `${role}`)
            .replace('key', key)
            .replace('value', email)
        const result = await pool.query(queryString)
        const success = result.rows[0].password === crypto.scryptSync(password, salt, 36).toString('hex')
        return success ? {success, data: {...result.rows[0], role}} : {success, message: 'User not found'}
    } catch ({message}) {
        return {success: false, message}
    }
}
export const updateUser = async () => {
    console.log('UpdateUser In progress')
}
export const deleteUser = async () => {
    console.log('DeleteUser In progress')
}

