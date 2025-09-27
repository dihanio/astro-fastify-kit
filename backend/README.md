# Astro-Fastify Backend

A high-performance backend server built with Fastify, TypeScript, and MongoDB.

## Features

- ⚡ Fast and lightweight Fastify server
- 🔒 TypeScript support with full type safety
- 📝 Request/Response validation with JSON Schema
- 🌐 CORS enabled for frontend integration
- 📊 Structured logging with Pino
- 🎯 Error handling and 404 routes
- 🏥 Health check endpoints
- 🔧 Environment-based configuration
- 🗄️ MongoDB integration with native driver
- 👤 User management API with full CRUD operations

## API Endpoints

### GET /
Returns basic API information and available endpoints.

**Response:**
```json
{
  "message": "Welcome to Astro-Fastify Starter Kit!",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "ping": "/ping",
    "api": "/api/hello"
  }
}
```

### GET /health
Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-09-27T09:45:00.000Z",
  "uptime": 123.456
}
```

### GET /ping
Simple ping endpoint for connectivity testing.

**Response:**
```json
{
  "pong": "it worked!",
  "timestamp": "2025-09-27T09:45:00.000Z"
}
```

### GET /api/hello
Greeting API with optional name parameter.

**Query Parameters:**
- `name` (optional): Name to greet

**Response:**
```json
{
  "message": "Hello John!",
  "timestamp": "2025-09-27T09:45:00.000Z"
}
```

## User Management API

### GET /api/users
Get all users from the database.

**Response:**
```json
{
  "users": [
    {
      "id": "60f3b3b3b3b3b3b3b3b3b3b3",
      "name": "John Doe", 
      "email": "john@example.com",
      "createdAt": "2025-09-27T09:45:00.000Z",
      "updatedAt": "2025-09-27T09:45:00.000Z"
    }
  ],
  "total": 1
}
```

### GET /api/users/:id
Get a specific user by ID.

**Parameters:**
- `id`: MongoDB ObjectId of the user

**Response:**
```json
{
  "id": "60f3b3b3b3b3b3b3b3b3b3b3",
  "name": "John Doe",
  "email": "john@example.com", 
  "createdAt": "2025-09-27T09:45:00.000Z",
  "updatedAt": "2025-09-27T09:45:00.000Z"
}
```

### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:** (201 Created)
```json
{
  "id": "60f3b3b3b3b3b3b3b3b3b3b3",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-09-27T09:45:00.000Z", 
  "updatedAt": "2025-09-27T09:45:00.000Z"
}
```

### PUT /api/users/:id
Update an existing user.

**Parameters:**
- `id`: MongoDB ObjectId of the user

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response:**
```json
{
  "id": "60f3b3b3b3b3b3b3b3b3b3b3",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "createdAt": "2025-09-27T09:45:00.000Z",
  "updatedAt": "2025-09-27T09:45:00.000Z"
}
```

### DELETE /api/users/:id
Delete a user by ID.

**Parameters:**
- `id`: MongoDB ObjectId of the user

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

## Development

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation
```bash
npm install
```

### Environment Setup
Copy `.env.example` to `.env` and configure as needed:
```bash
cp .env.example .env
```

### Development Mode
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run clean` - Clean build directory
- `npm run type-check` - Run TypeScript type checking

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |
| `HOST` | `0.0.0.0` | Server host |
| `NODE_ENV` | `development` | Environment mode |
| `LOG_LEVEL` | `info` | Logging level |
| `CORS_ORIGINS` | `http://localhost:4321,...` | Allowed CORS origins |
| `MONGODB_URI` | `mongodb://localhost:27017` | MongoDB connection string |
| `MONGODB_DB_NAME` | `astro_fastify_db` | MongoDB database name |

## Project Structure

```
backend/
├── src/
│   ├── models/
│   │   └── User.ts        # User data model and interfaces
│   ├── routes/
│   │   └── users.ts       # User API routes
│   ├── database.ts        # MongoDB connection and setup
│   └── server.ts          # Main server file
├── dist/                  # Build output (generated)
├── .env                   # Environment variables
├── .env.example           # Environment template
├── .gitignore
├── package.json
├── tsconfig.json          # TypeScript configuration
└── README.md
```

## Features & Middleware

- **CORS**: Configured for frontend integration
- **Validation**: JSON Schema validation for requests/responses
- **Error Handling**: Centralized error handling with proper HTTP codes
- **Logging**: Structured logging with Pino (pretty format in development)
- **TypeScript**: Full TypeScript support with strict typing
- **MongoDB**: Native MongoDB driver with connection pooling
- **Data Models**: Structured data models with TypeScript interfaces
- **CRUD Operations**: Complete Create, Read, Update, Delete operations for users

## Prerequisites

### MongoDB Setup
Make sure you have MongoDB installed and running:

**Option 1: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod --dbpath /path/to/your/data/directory
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

**Option 3: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Testing the API

### Basic Endpoints
```bash
# Basic info
curl http://localhost:3001/

# Health check
curl http://localhost:3001/health

# Ping
curl http://localhost:3001/ping

# Hello API
curl http://localhost:3001/api/hello?name=World
```

### User Management API
```bash
# Get all users
curl http://localhost:3001/api/users

# Create a new user
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# Get user by ID
curl http://localhost:3001/api/users/60f3b3b3b3b3b3b3b3b3b3b3

# Update user
curl -X PUT http://localhost:3001/api/users/60f3b3b3b3b3b3b3b3b3b3b3 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com"}'

# Delete user
curl -X DELETE http://localhost:3001/api/users/60f3b3b3b3b3b3b3b3b3b3b3
```