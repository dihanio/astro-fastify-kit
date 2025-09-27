import { MongoClient, Db, Collection } from 'mongodb'

let client: MongoClient | null = null
let db: Db | null = null

export interface DatabaseConnection {
  client: MongoClient
  db: Db
  collections: {
    users: Collection
    // Add more collections as needed
  }
}

export const connectToDatabase = async (): Promise<DatabaseConnection> => {
  if (client && db) {
    return {
      client,
      db,
      collections: {
        users: db.collection('users')
      }
    }
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const dbName = process.env.MONGODB_DB_NAME || 'astro_fastify_db'

  try {
    client = new MongoClient(mongoUri)
    await client.connect()
    
    // Test koneksi
    await client.db('admin').command({ ping: 1 })
    console.log('✅ Berhasil terhubung ke MongoDB!')

    db = client.db(dbName)

    return {
      client,
      db,
      collections: {
        users: db.collection('users')
      }
    }
  } catch (error) {
    console.error('❌ Gagal terhubung ke MongoDB:', error)
    throw error
  }
}

export const closeDatabaseConnection = async (): Promise<void> => {
  if (client) {
    await client.close()
    client = null
    db = null
    console.log('🔌 Koneksi MongoDB ditutup')
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeDatabaseConnection()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await closeDatabaseConnection()
  process.exit(0)
})