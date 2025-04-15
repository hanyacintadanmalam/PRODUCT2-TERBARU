# Panduan Penggantian Media (Gambar dan Audio)

Folder ini berisi semua file media yang digunakan dalam aplikasi Spotify Gift Card. Anda dapat dengan mudah mengganti gambar atau audio tanpa harus mengubah kode. Cukup ganti file di folder yang sesuai dengan nama file yang sama.

## Struktur Folder

```
public/
├── images/
│   ├── covers/
│   │   └── playlist-cover.jpg    # Cover utama playlist
│   └── songs/
│       ├── song1.jpg             # Cover lagu 1 (Satu Bulan - Hindia)
│       ├── song2.jpg             # Cover lagu 2 (Untungnya, Hidup Harus Tetap Berjalan - Kenanglah)
│       ├── song3.jpg             # Cover lagu 3 (Kata Mereka Ini Berlebihan - Kenanglah)
│       ├── song4.jpg             # Cover lagu 4 (Apa Mungkin - Hindia)
│       ├── song5.jpg             # Cover lagu 5 (Kini Mereka Tahu - Kenanglah)
│       └── letter-cover.jpg      # Cover untuk halaman letter (You Seemed so Happy - The Japanese House)
└── audio/
    ├── song1.mp3                 # File audio lagu 1
    ├── song2.mp3                 # File audio lagu 2
    ├── song3.mp3                 # File audio lagu 3
    ├── song4.mp3                 # File audio lagu 4
    ├── song5.mp3                 # File audio lagu 5
    └── lagu-letter.mp3           # File audio untuk halaman letter
```

## Cara Mengganti Media

### Mengganti Gambar Cover Playlist
1. Siapkan gambar pengganti dengan format JPG/PNG
2. Ubah nama file menjadi `playlist-cover.jpg`
3. Ganti file yang ada di folder `/images/covers/`

### Mengganti Gambar Cover Lagu
1. Siapkan gambar pengganti dengan format JPG/PNG
2. Ubah nama file sesuai dengan lagu yang ingin diganti (misalnya `song1.jpg` untuk lagu pertama)
3. Ganti file yang ada di folder `/images/songs/`

### Mengganti Gambar Cover Halaman Letter
1. Siapkan gambar cover lagu pengganti dengan format JPG/PNG
2. Ubah nama file menjadi `letter-cover.jpg`
3. Ganti file yang ada di folder `/images/songs/`

### Mengganti File Audio
1. Siapkan file audio pengganti dengan format MP3
2. Ubah nama file sesuai dengan lagu yang ingin diganti (misalnya `song1.mp3` untuk lagu pertama)
3. Ganti file yang ada di folder `/audio/`

### Mengganti File Audio Halaman Letter
1. Siapkan file audio pengganti dengan format MP3
2. Ubah nama file menjadi `lagu-letter.mp3`
3. Ganti file yang ada di folder `/audio/`

## Catatan Penting
- Pastikan file pengganti memiliki **nama file yang sama persis** dengan yang diganti
- Untuk gambar, disarankan menggunakan ukuran yang sama agar tampilan tetap konsisten:
  - Cover playlist: disarankan 300x300 pixel
  - Cover lagu: disarankan 100x100 pixel
- Untuk file audio, gunakan format MP3 dengan kualitas yang baik

## Perubahan Konten
Jika Anda ingin mengubah judul lagu, artis, atau jumlah pendengar, Anda perlu mengedit file `app/playlist/page.tsx`. Cari bagian `const playlistData` dan ubah nilai yang diinginkan. 