import {createLesson, getLessons} from "../controllers/lessons.js";

const getSchedule = (fastify, option, done) => {
    const handlers = {
        get: async (reply, data) => {
            return await getLessons(data)
        },
        create: async (reply, data) => {
            return await createLesson(data)
        }
    }
    fastify.post('/api/lessons/', {preValidation: fastify.auth}, async (request, reply) => {
        const {method, data} = request.body
        const result = await handlers[method](reply, data)
        reply.status(result.success ? method === 'create' ? 201 : 200 : 422).send(result)
        done()
    })
    done()
}

export default getSchedule
