import Fastify from 'fastify'
import { pool } from '../database/index.js'
import * as dotenv from 'dotenv'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import authRoutes from "./routes/auth.js"

dotenv.config()


const fastify = Fastify({
  logger: true
})

fastify.register(cors, {origin: ['http://localhost:4200']})
fastify.register(jwt, {secret: 'supersecret'})
fastify.register(authRoutes)



fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
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
