import {createLesson, getLessons} from "../controllers/lessons.js";

const getSchedule = (fastify, option, done) => {
    fastify.get('/api/lessons/:key/:condition/:value/:extraCondition/:key2/:condition2/:value2', {preValidation: fastify.auth}, async (request, reply) => {
        const result = await getLessons(request.params)
        reply.status(result.success ? 200 : 422).send(result)
        done()
    })
    fastify.post('/api/lessons', {preValidation: fastify.auth}, async (request, reply) => {
        const result = await createLesson(request.body)
        reply.status(result.success ? 201 : 422).send(result)
        done()
    })
    done()
}

export default getSchedule
