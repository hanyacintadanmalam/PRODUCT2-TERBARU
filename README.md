# Spotify Gift Card - Next.js App

Aplikasi ini adalah gift card bertemakan Spotify yang dibuat dengan Next.js, yang menggabungkan pengalaman Spotify dengan tiket konser sebagai hadiah spesial.

## Fitur Utama

1. **Halaman Login** - Halaman login dengan UI bergaya Spotify
2. **Playlist & Album** - Halaman yang menampilkan playlist lagu khusus
3. **Media Player** - Player musik untuk memutar lagu-lagu di playlist
4. **Music Player dengan Pesan** - Halaman bergaya pemutar musik Spotify dengan pesan personal dalam format lirik lagu
5. **Gift Page** - Halaman yang menampilkan tiket konser sebagai hadiah spesial

## Cara Menjalankan Aplikasi

### Prasyarat

- Node.js versi 14.17.0 atau lebih tinggi
- npm versi 6.14.13 atau lebih tinggi

### Langkah-langkah

1. Clone repositori ini
2. Install dependensi
   ```bash
   npm install
   ```
3. Jalankan aplikasi dalam mode pengembangan
   ```bash
   npm run dev
   ```
4. Buka http://localhost:3000 di browser Anda

## Petunjuk Penggunaan

1. Masuk melalui halaman login (gunakan username dan password apa saja untuk demo)
2. Jelajahi playlist dan putar lagu-lagu yang ada
3. Klik tombol "Click Me" untuk melihat pesan personal dalam format musik player
4. Baca pesan personal yang ditampilkan bergaya lirik lagu dan pesan di bawahnya
5. Lihat dan redeem tiket konser yang ditampilkan

## Cara Mengganti Media (Gambar dan Audio)

Aplikasi ini memungkinkan Anda mengganti gambar cover dan file audio tanpa harus mengubah kode. Semua file media terletak di folder `app/public/`.

### Struktur Folder Media
```
app/public/
├── images/
│   ├── covers/      # Untuk cover playlist
│   └── songs/       # Untuk gambar cover lagu individual dan halaman letter
└── audio/           # Untuk file MP3 lagu dan halaman letter
```

### Cara Mengganti Media
- **Cover Playlist**: Ganti file `playlist-cover.jpg` di folder `app/public/images/covers/`
- **Cover Lagu**: Ganti file `song1.jpg`, `song2.jpg`, dst. di folder `app/public/images/songs/`
- **Cover Letter**: Ganti file `letter-cover.jpg` di folder `app/public/images/songs/`
- **File Audio Playlist**: Ganti file `song1.mp3`, `song2.mp3`, dst. di folder `app/public/audio/`
- **File Audio Letter**: Ganti file `lagu-letter.mp3` di folder `app/public/audio/`

Untuk informasi lebih detail, lihat [Panduan Penggantian Media](app/public/README.md).

## Pengembangan

Proyek ini menggunakan:
- Next.js 14
- React.js
- Tailwind CSS
- TypeScript

## Kustomisasi

Anda dapat mengkustomisasi:
- Lagu-lagu di playlist (edit di `app/playlist/page.tsx`)
- Pesan dalam bentuk lirik dan pesan personal (edit di `app/letter/page.tsx`)
- Detail tiket (edit di `app/gift/page.tsx`)
- Warna dan tema (edit di `tailwind.config.js`) 