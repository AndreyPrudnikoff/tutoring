import {getLessons} from "../controllers/lessons.js";

const getSchedule = (fastify, option, done) => {
    fastify.get('/api/lessons', {preValidation: fastify.auth}, async (request, reply) => {
        const result = await getLessons({})
        reply.status(result.success ? 200 : 422).send(result)
        done()
    })
    done()
}

export default getSchedule
