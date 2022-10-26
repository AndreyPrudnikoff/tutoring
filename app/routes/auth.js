import {createUser, getUser} from '../controllers/users.js'

const authRoutes = (fastify, option, done) => {
    fastify.post('/api/register', async (request, reply) => {
        const result = await createUser(request.body)
        reply.status(result.success ? 201 : 422).send(result)
        done()
    })
    fastify.post('/api/login', async (request, reply) => {
        const result = await getUser(request.body)
        if (result.success) {
            const {user_id, first_name, last_name, phone, email, role} = result.data
            reply.status(result.success ? 200 : 422)
                .send({
                    success: result.success,
                    data: {user_id, first_name, last_name, phone, email, role},
                    token: fastify.jwt.sign({user_id})
                })
        } else {
            reply.status(result.success ? 200 : 422).send(result)
        }
        done()
    })
    done()
}

export default authRoutes
