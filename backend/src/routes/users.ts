import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { ObjectId } from 'mongodb'
import { DatabaseConnection } from '../database'
import { User, CreateUserRequest, UpdateUserRequest, userToResponse } from '../models/User'

export const userRoutes = async (fastify: FastifyInstance, database: DatabaseConnection) => {
  // Get all users
  fastify.get('/api/users', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' }
                }
              }
            },
            total: { type: 'number' }
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await database.collections.users.find({}).toArray() as User[]
      return {
        users: users.map(userToResponse),
        total: users.length
      }
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({ error: 'Gagal mengambil data pengguna' })
    }
  })

  // Get user by ID
  fastify.get('/api/users/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params

      if (!ObjectId.isValid(id)) {
        return reply.status(400).send({ error: 'Format ID pengguna tidak valid' })
      }

      const user = await database.collections.users.findOne({ _id: new ObjectId(id) }) as User | null

      if (!user) {
        return reply.status(404).send({ error: 'Pengguna tidak ditemukan' })
      }

      return userToResponse(user)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({ error: 'Gagal mengambil data pengguna' })
    }
  })

  // Create new user
  fastify.post('/api/users', {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' }
        },
        required: ['name', 'email']
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: CreateUserRequest }>, reply: FastifyReply) => {
    try {
      const { name, email } = request.body

      // Cek apakah email sudah ada
      const existingUser = await database.collections.users.findOne({ email })
      if (existingUser) {
        return reply.status(409).send({ error: 'Email sudah terdaftar' })
      }

      const now = new Date()
      const newUser: Omit<User, '_id'> = {
        name,
        email,
        createdAt: now,
        updatedAt: now
      }

      const result = await database.collections.users.insertOne(newUser)
      const createdUser = await database.collections.users.findOne({ _id: result.insertedId }) as User

      return reply.status(201).send(userToResponse(createdUser))
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({ error: 'Gagal membuat pengguna' })
    }
  })

  // Update user
  fastify.put('/api/users/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { id: string }, Body: UpdateUserRequest }>, reply: FastifyReply) => {
    try {
      const { id } = request.params
      const updateData = request.body

      if (!ObjectId.isValid(id)) {
        return reply.status(400).send({ error: 'Format ID pengguna tidak valid' })
      }

      if (Object.keys(updateData).length === 0) {
        return reply.status(400).send({ error: 'Tidak ada data untuk diupdate' })
      }

      // Cek apakah email sudah ada (jika mengupdate email)
      if (updateData.email) {
        const existingUser = await database.collections.users.findOne({ 
          email: updateData.email,
          _id: { $ne: new ObjectId(id) }
        })
        if (existingUser) {
          return reply.status(409).send({ error: 'Email sudah terdaftar' })
        }
      }

      const result = await database.collections.users.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            ...updateData, 
            updatedAt: new Date() 
          } 
        },
        { returnDocument: 'after' }
      )

      if (!result) {
        return reply.status(404).send({ error: 'Pengguna tidak ditemukan' })
      }

      return userToResponse(result as User)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({ error: 'Gagal mengupdate pengguna' })
    }
  })

  // Delete user
  fastify.delete('/api/users/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params

      if (!ObjectId.isValid(id)) {
        return reply.status(400).send({ error: 'Format ID pengguna tidak valid' })
      }

      const result = await database.collections.users.deleteOne({ _id: new ObjectId(id) })

      if (result.deletedCount === 0) {
        return reply.status(404).send({ error: 'Pengguna tidak ditemukan' })
      }

      return { pesan: 'Pengguna berhasil dihapus' }
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({ error: 'Gagal menghapus pengguna' })
    }
  })
}