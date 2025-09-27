import 'dotenv/config'
import Fastify, { FastifyInstance, RouteShorthandOptions, FastifyRequest, FastifyReply } from 'fastify'
import { connectToDatabase, closeDatabaseConnection } from './database'
import { userRoutes } from './routes/users'

const server: FastifyInstance = Fastify({
  logger: process.env.NODE_ENV === 'production' ? true : {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname,reqId,responseTime',
        messageFormat: '{msg}'
      }
    }
  }
})

// Rute pemeriksaan kesehatan
server.get('/health', async function handler (request: FastifyRequest, reply: FastifyReply) {
  return { 
    status: 'sehat',
    waktu: new Date().toISOString(),
    uptime: process.uptime()
  }
})

// Rute dasar
server.get('/', async function handler (request: FastifyRequest, reply: FastifyReply) {
  return { 
    pesan: 'Selamat datang di Astro-Fastify Starter Kit!',
    versi: '1.0.0',
    endpoints: {
      kesehatan: '/health',
      ping: '/ping',
      api: '/api/hello',
      pengguna: '/api/users'
    }
  }
})

// Route with schema validation
const pingOpts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: { type: 'string' },
          timestamp: { type: 'string' }
        }
      }
    }
  }
}

server.get('/ping', pingOpts, async (request: FastifyRequest, reply: FastifyReply) => {
  return { 
    pong: 'berhasil!',
    waktu: new Date().toISOString()
  }
})

// API route with query validation
server.route({
  method: 'GET',
  url: '/api/hello',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          timestamp: { type: 'string' }
        }
      }
    }
  },
  preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
    server.log.info('Memproses permintaan untuk /api/hello')
  },
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    const { name } = request.query as { name?: string }
    return { 
      pesan: name ? `Halo ${name}!` : 'Halo dari Fastify!',
      waktu: new Date().toISOString()
    }
  }
})

// Error handler
server.setErrorHandler(async (error, request, reply) => {
  server.log.error(error)
  
  if (error.validation) {
    return reply.status(400).send({
      error: 'Kesalahan Validasi',
      pesan: error.message,
      statusCode: 400
    })
  }
  
  return reply.status(500).send({
    error: 'Kesalahan Server Internal',
    pesan: 'Terjadi kesalahan',
    statusCode: 500
  })
})

// 404 handler
server.setNotFoundHandler(async (request, reply) => {
  return reply.status(404).send({
    error: 'Tidak Ditemukan',
    pesan: `Route ${request.method}:${request.url} tidak ditemukan`,
    statusCode: 404
  })
})

const start = async () => {
  try {
    // Connect to MongoDB
    const database = await connectToDatabase()
    
    // Register CORS plugin for frontend integration
    await server.register(import('@fastify/cors'), {
      origin: ['http://localhost:4321', 'http://localhost:3000', 'http://127.0.0.1:4321'],
      credentials: true
    })

    // Register user routes
    await userRoutes(server, database)

    const port = process.env.PORT ? parseInt(process.env.PORT) : 3001
    const host = process.env.HOST || '0.0.0.0'
    
    await server.listen({ port, host })

    console.log('🚀 Server Backend Fastify Berhasil Dimulai!')
    console.log(`📡 Server berjalan di: http://localhost:${port}`)
    console.log('✨ Siap menerima permintaan!')
    console.log('')
  } catch (err) {
    server.log.error(err, '❌ Gagal memulai server')
    await closeDatabaseConnection()
    process.exit(1)
  }
}

start()