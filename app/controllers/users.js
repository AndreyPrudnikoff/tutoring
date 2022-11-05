import {pool} from "../../database/index.js"
import crypto from 'crypto'

const insert = 'INSERT INTO users(user_id, first_name, last_name, email, phone, password) VALUES($1, $2, $3, $4, $5, $6)'
const select = "SELECT * FROM users WHERE key = 'value'"
const salt = "secretkeynumber1"

export const createUser = async (user) => {
    user.user_id = crypto.randomUUID()
    user.password = crypto.scryptSync(user.reg_password, salt, 36).toString('hex')
    try {
        const {user_id, first_name, last_name, email, phone, password, user_role} = user
        const queryString = insert.replace('users', user_role + 's')
        await pool.query(queryString, [user_id, first_name, last_name, email, phone, password])
        return {success: true}
    } catch ({message}) {
        return {success: false, message}
    }
}
export const getUser = async (user) => {
    try {
        const {email, password, user_role} = user
        const key = email ? 'email' : 'phone'
        const queryString = select.replace('key', key).replace('value', email).replace('users', user_role + 's')
        const result = await pool.query(queryString)
        const success = result.rows[0]?.password === crypto.scryptSync(password, salt, 36).toString('hex')
        return success ? {success, data: {...result.rows[0]}} : {success, message: 'User not found'}
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

