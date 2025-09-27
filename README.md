# 🚀 Astro-Fastify Starter Kit

Full-stack starter kit dengan Astro + React (frontend) dan Fastify (backend).

## ✨ Features

- 🚀 **Astro** - Modern static site generator with island architecture
- ⚛️ **React** - Interactive components with hydration on demand
- ⚡ **Fastify** - Fast and efficient backend framework
- 🗄️ **MongoDB** - NoSQL database untuk data storage
- 🏃‍♂️ **Bun** - Ultra-fast JavaScript runtime and package manager
- 📦 **TypeScript** - Type safety untuk frontend dan backend
- 🎨 **CSS Modules** - Styled components dengan modern CSS
- 🔄 **Hot Reload** - Development experience yang smooth
- 🌐 **API Proxy** - Frontend dan backend integration yang seamless

## 📋 Prerequisites

- [Bun](https://bun.sh) - JavaScript runtime dan package manager
- [MongoDB](https://www.mongodb.com/) - Database (optional untuk development)

## 🚀 Quick Start

### Option 1: Use Root Scripts (Recommended)

```bash
# Install semua dependencies
bun install

# Install dependencies untuk frontend dan backend
npm run install:all

# Start development servers (frontend + backend)
npm run dev
```

### Option 2: Manual Setup

```bash
# Install backend dependencies
cd backend
bun install

# Install frontend dependencies  
cd ../frontend
bun install

# Terminal 1 - Start backend (port 3001)
cd backend
bun run dev

# Terminal 2 - Start frontend (port 4321)  
cd frontend
bun run dev
```

### 3. Open Browser

- Frontend: http://localhost:4321
- Backend API: http://localhost:3001

## 📁 Project Structure

```
astro-fastify/
├── backend/           # Fastify API server
│   ├── src/
│   │   ├── server.ts     # Main server file
│   │   ├── database.ts   # MongoDB connection
│   │   ├── models/       # Data models
│   │   └── routes/       # API routes
│   └── package.json
├── frontend/          # Astro frontend
│   ├── src/
│   │   ├── pages/        # Astro pages
│   │   ├── components/   # Reusable components
│   │   └── layouts/      # Page layouts
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

### Backend
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server

### Frontend  
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build

## 🌐 API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /ping` - Ping test
- `GET /api/hello` - Hello API
- `GET /api/users` - Users endpoint

## 🔗 Integration

Frontend sudah dikonfigurasi untuk proxy API calls ke backend. Anda bisa langsung fetch dari frontend:

```javascript
// Otomatis di-proxy ke backend
const response = await fetch('/api/hello');
const data = await response.json();
```

## 📦 Tech Stack

- **Frontend**: Astro + React, TypeScript
- **Backend**: Fastify, TypeScript, MongoDB
- **Runtime**: Bun
- **Database**: MongoDB

## ⚛️ React Integration

Starter kit ini sudah include React integration menggunakan `@astrojs/react`! 

### Setup yang sudah dikonfigurasi:
- ✅ `@astrojs/react` integration di `astro.config.mjs`
- ✅ TypeScript konfigurasi untuk React JSX
- ✅ React components dengan hydration
- ✅ Astro + React hybrid architecture

### Cara menggunakan:

#### Astro Components (.astro)
- Server-side rendering
- Zero JavaScript by default
- Perfect untuk static content

#### React Components (.tsx/.jsx)
- Client-side interactivity
- Full React ecosystem
- Hydration on demand dengan client directives

```jsx
// Example: src/components/Counter.tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

```astro
---
// Use in .astro files
import Counter from '../components/Counter.tsx';
---

<!-- Hydrate on page load -->
<Counter client:load />

<!-- Hydrate when visible -->
<Counter client:visible />

<!-- Hydrate on interaction -->
<Counter client:idle />
```

### Client Directives:
- `client:load` - Hydrate immediately on page load
- `client:idle` - Hydrate when page becomes idle
- `client:visible` - Hydrate when component enters viewport
- `client:media` - Hydrate based on media query
- `client:only` - Skip server rendering, only run on client

## 🚀 Next Steps

1. **Components**: 
   - Tambahkan Astro components di `frontend/src/components/`
   - Buat React components untuk interactivity
2. **API**: Buat routes baru di `backend/src/routes/`
3. **Database**: Konfigurasi models di `backend/src/models/`
4. **Deploy**: Deploy ke platform favorit Anda

## 🔗 Useful Links

- [Astro Docs](https://docs.astro.build)
- [Astro + React Guide](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Fastify Documentation](https://www.fastify.io/docs/)

Happy coding! 🎉