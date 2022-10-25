import {pool} from "../../database/index.js"
import crypto from 'crypto'

const insert = 'INSERT INTO users(user_id, first_name, last_name, email, phone, password) VALUES($1, $2, $3, $4, $5, $6)'
const salt = "secretkeynumber1"

const createUser = async (values) => {
    const array = [...values]
    const role = array.pop()
    array.unshift(crypto.randomUUID())
    array[5] = crypto.scryptSync(array[5], salt, 36).toString('hex')
    try {
        const queryString = insert.replace('users', role)
        await pool.query(queryString, array)
        return {success: true}
    } catch ({message}) {
        return {success: false, message}
    }
}

export default {createUser}
