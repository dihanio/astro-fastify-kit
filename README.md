# 🚀 Astro-Fastify Starter Kit

Kit starter full-stack dengan Astro + React (frontend) dan Fastify (backend) - dalam bahasa Indonesia.

## ✨ Fitur Utama

- 🚀 **Astro 5.14+** - Generator situs statis modern dengan arsitektur island
- ⚛️ **React 19+** - Komponen interaktif dengan hidrasi sesuai permintaan
- ⚡ **Fastify 5.6+** - Framework backend yang cepat dan efisien
- 🗄️ **MongoDB 6.20+** - Database NoSQL untuk penyimpanan data
- 🏃‍♂️ **Bun** - Runtime JavaScript dan package manager ultra-cepat
- 📦 **TypeScript 5.9+** - Type safety untuk frontend dan backend
- 🎨 **Tailwind CSS 4** - Framework CSS utility-first terbaru
- 🎉 **Partytown** - Optimasi performa untuk skrip pihak ketiga
- 🔄 **Hot Reload** - Pengalaman development yang lancar
- 🌐 **API Proxy** - Integrasi seamless antara frontend dan backend
- 🇮🇩 **Bahasa Indonesia** - Interface dan pesan dalam bahasa Indonesia

## 📋 Prasyarat

- [Bun](https://bun.sh) - Runtime JavaScript dan package manager
- [MongoDB](https://www.mongodb.com/) - Database (opsional untuk development)
- Node.js 18+ - Sebagai fallback jika tidak menggunakan Bun

## 🚀 Memulai Cepat

### Opsi 1: Menggunakan Script Root (Direkomendasikan)

```bash
# Install semua dependencies
bun install

# Install dependencies untuk frontend dan backend
npm run install:all

# Start development servers (frontend + backend)
npm run dev
```

### Opsi 2: Setup Manual

```bash
# Install dependencies backend
cd backend
bun install

# Install dependencies frontend  
cd ../frontend
bun install

# Terminal 1 - Start backend (port 3001)
cd backend
bun run dev

# Terminal 2 - Start frontend (port 4321)  
cd frontend
bun run dev
```

### 3. Buka Browser

- Frontend: http://localhost:4321
- Backend API: http://localhost:3001

## 📁 Struktur Proyek

```
astro-fastify-kit/
├── backend/           # Server API Fastify
│   ├── src/
│   │   ├── server.ts     # File server utama
│   │   ├── database.ts   # Koneksi MongoDB
│   │   ├── models/       # Model data
│   │   │   └── User.ts   # Model pengguna
│   │   └── routes/       # Route API
│   │       └── users.ts  # Route pengguna
│   ├── package.json
│   └── tsconfig.json
├── frontend/          # Frontend Astro
│   ├── src/
│   │   ├── pages/        # Halaman Astro
│   │   │   └── index.astro
│   │   ├── components/   # Komponen reusable
│   │   │   ├── ApiStatus.tsx
│   │   │   ├── UserList.tsx
│   │   │   └── PartytownDemo.tsx
│   │   ├── layouts/      # Layout halaman
│   │   │   └── Layout.astro
│   │   └── styles/       # File CSS
│   │       └── global.css (dengan Tailwind CSS)
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🔧 Script yang Tersedia

### Backend
- `bun run dev` - Jalankan server development
- `bun run build` - Build untuk production
- `bun run start` - Jalankan server production
- `bun run clean` - Bersihkan folder dist

### Frontend  
- `bun run dev` - Jalankan server development
- `bun run build` - Build untuk production
- `bun run preview` - Preview build production

## 🌐 Endpoint API

- `GET /` - Pesan selamat datang dan informasi API
- `GET /health` - Pemeriksaan status kesehatan server
- `GET /ping` - Tes ping untuk konektivitas
- `GET /api/hello` - API hello dengan parameter opsional
- `GET /api/users` - Endpoint untuk mengelola pengguna
- `POST /api/users` - Membuat pengguna baru
- `GET /api/users/:id` - Mendapatkan pengguna berdasarkan ID
- `PUT /api/users/:id` - Memperbarui pengguna
- `DELETE /api/users/:id` - Menghapus pengguna

## 🔗 Integrasi

Frontend sudah dikonfigurasi untuk proxy API calls ke backend. Anda bisa langsung fetch dari frontend:

```javascript
// Otomatis di-proxy ke backend
const response = await fetch('/api/hello');
const data = await response.json();

// Contoh mengambil data pengguna
const users = await fetch('/api/users');
const userData = await users.json();
```

## 📦 Stack Teknologi

- **Frontend**: Astro 5.14 + React 19, TypeScript 5.9, Tailwind CSS 4
- **Backend**: Fastify 5.6, TypeScript 5.9, MongoDB 6.20
- **Runtime**: Bun (ultra-fast JavaScript runtime)
- **Database**: MongoDB dengan driver resmi
- **UI Optimization**: Partytown untuk skrip pihak ketiga

## 🆕 Fitur Terbaru (Update 2025)

### 🎨 Tailwind CSS 4
- **Plugin Vite Terbaru**: Menggunakan `@tailwindcss/vite` untuk performa optimal
- **Konfigurasi Otomatis**: Setup otomatis dengan `astro add tailwind`
- **Import Sederhana**: Cukup `@import "tailwindcss"` di CSS
- **Kompatibilitas Penuh**: Bekerja sempurna dengan Astro dan React

### 🇮🇩 Lokalisasi Indonesia
- **Interface Lengkap**: Semua teks UI dalam bahasa Indonesia
- **Pesan Error**: Error handling dengan pesan bahasa Indonesia
- **Komponen Terlokalisasi**: Semua komponen menggunakan bahasa Indonesia
- **HTML Lang**: Atribut `lang="id"` untuk SEO dan aksesibilitas

### 📦 Dependencies Terbaru
- **Backend**: Semua package diupdate ke versi terbaru (Fastify 5.6+, MongoDB 6.20+)
- **Frontend**: Astro 5.14+, React 19+, TypeScript 5.9+
- **Keamanan**: Patch keamanan terbaru untuk semua dependencies

## ⚛️ Integrasi React

Starter kit ini sudah include integrasi React menggunakan `@astrojs/react`! 

### Setup yang sudah dikonfigurasi:
- ✅ Integrasi `@astrojs/react` di `astro.config.mjs`
- ✅ Konfigurasi TypeScript untuk React JSX
- ✅ Komponen React dengan hidrasi
- ✅ Arsitektur hybrid Astro + React
- ✅ React 19 dengan fitur-fitur terbaru

### Cara menggunakan:

#### Komponen Astro (.astro)
- Server-side rendering
- Zero JavaScript by default
- Sempurna untuk konten statis

#### Komponen React (.tsx/.jsx)
- Interaktivitas client-side
- Ekosistem React lengkap
- Hidrasi sesuai permintaan dengan client directives

```jsx
// Contoh: src/components/Counter.tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={() => setCount(count + 1)}
    >
      Hitungan: {count}
    </button>
  );
}
```

```astro
---
// Gunakan di file .astro
import Counter from '../components/Counter.tsx';
---

<!-- Hidrasi saat halaman dimuat -->
<Counter client:load />

<!-- Hidrasi saat terlihat -->
<Counter client:visible />

<!-- Hidrasi saat idle -->
<Counter client:idle />
```

### Client Directives:
- `client:load` - Hidrasi langsung saat halaman dimuat
- `client:idle` - Hidrasi saat halaman menjadi idle
- `client:visible` - Hidrasi saat komponen masuk viewport
- `client:media` - Hidrasi berdasarkan media query
- `client:only` - Skip server rendering, hanya jalankan di client

## 🎨 Tailwind CSS 4

### Fitur Terbaru:
- **Plugin Vite**: Menggunakan `@tailwindcss/vite` untuk integrasi optimal
- **Import Sederhana**: Cukup `@import "tailwindcss"` di CSS
- **Performa Tinggi**: Build time lebih cepat dengan arsitektur baru
- **Kompatibilitas**: Bekerja sempurna dengan Astro dan React

### Contoh Penggunaan:
```tsx
// Komponen dengan Tailwind CSS
export default function Card({ children }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      {children}
    </div>
  );
}
```

## 🚀 Langkah Selanjutnya

1. **Komponen**: 
   - Tambahkan komponen Astro di `frontend/src/components/`
   - Buat komponen React untuk interaktivitas
   - Gunakan Tailwind CSS untuk styling yang cepat

2. **API**: 
   - Buat route baru di `backend/src/routes/`
   - Implementasikan CRUD operations untuk data Anda
   - Tambahkan validasi dan error handling

3. **Database**: 
   - Konfigurasi model di `backend/src/models/`
   - Setup koneksi MongoDB yang sesuai
   - Implementasikan schema dan indeks

4. **Styling**: 
   - Manfaatkan Tailwind CSS 4 untuk design system
   - Kustomisasi tema sesuai brand Anda
   - Implementasikan responsive design

5. **Deploy**: 
   - Deploy ke platform favorit Anda (Vercel, Netlify, dll.)
   - Setup environment variables untuk production
   - Konfigurasi CI/CD pipeline

## 🔗 Link Berguna

- [Dokumentasi Astro](https://docs.astro.build)
- [Panduan Astro + React](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Dokumentasi Fastify](https://www.fastify.io/docs/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/)
- [Bun Documentation](https://bun.sh/docs)

## 📝 Changelog

### v1.1.0 (September 2025)
- ✅ Update semua dependencies ke versi terbaru
- ✅ Lokalisasi lengkap ke bahasa Indonesia
- ✅ Integrasi Tailwind CSS 4 dengan Vite plugin
- ✅ Perbaikan error handling dan validasi data
- ✅ Optimasi struktur komponen dan API
- ✅ Dokumentasi lengkap dalam bahasa Indonesia

### v1.0.0 (Initial Release)
- ✅ Setup dasar Astro + Fastify
- ✅ Integrasi React dan TypeScript
- ✅ Koneksi MongoDB
- ✅ API proxy dan hot reload

Selamat coding! 🎉