const authRoutes = (fastify, option, done) => {
    fastify.post('/api/login', async (request, reply) => {
        console.log(request.body)
        reply.status(200).send({success: true})
        done()
    })
    fastify.post('/api/register', async (request, reply) => {
        console.log('register')
    })
    done()
}

export default authRoutes
