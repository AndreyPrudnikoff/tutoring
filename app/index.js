import Fastify from 'fastify'
import { pool } from '../database/index.js'
import * as dotenv from 'dotenv'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import authRoutes from "./routes/auth.js"
import getSchedule from "./routes/schedule.js"

dotenv.config()


const fastify = Fastify({
  logger: true
})

fastify.register(cors, {origin: ['http://localhost:4200']})
fastify.register(jwt, {secret: 'supersecret'})
fastify.register(authRoutes)
fastify.register(getSchedule)

fastify.decorate("auth", async function (request, reply) {
  try {
    await request.jwtVerify(request.raw.headers.authorization, (err, decode) => {
      if (err) {
        reply.status(401).send({statusCode: 401, message: 'Unauthorized'})
      } else if (3600 < (Math.round(Date.now() / 1000) - decode.iat)) {
        reply.status(401).send({statusCode: 401, message: 'Unauthorized'})
      }
    })
  } catch (err) {
    reply.send(err)
  }
})


//START SERVER
fastify.listen({ port: process.env.PORT, host: process.env.HOST }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})


//START DATABASE
await pool.connect(() => console.log('start DB'))
