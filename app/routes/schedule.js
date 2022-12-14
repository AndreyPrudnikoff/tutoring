import {createLesson, getLessons} from "../controllers/lessons.js";

const getSchedule = (fastify, option, done) => {
    const handlers = {
        get: async (reply, data) => await getLessons(data),
        create: async (reply, data) => await createLesson(data)
    }
    fastify.post('/api/lessons', {preValidation: fastify.auth}, async (request, reply) => {
        const {user_id, role} = fastify.jwt.decode(request.headers.authorization.split(' ').pop())
        const {method, data} = request.body
        const result = await handlers[method](reply, {...data, user_id, role})
        reply.status(result.success ? method === 'create' ? 201 : 200 : 422).send(result)
        done()
    })
    done()
}

export default getSchedule
