# Nihonkidz

Nihonkidz adalah sebuah website edukasi interaktif yang dirancang untuk membantu anak-anak belajar huruf Hiragana dan Katakana dengan cara yang menyenangkan. Website ini menggunakan teknologi frontend modern dengan **HTML, CSS, JavaScript, dan Bootstrap**, serta backend berbasis **Node.js dan Express** yang menggunakan arsitektur **Microservice**.

## Fitur Utama
- **Belajar Huruf**: Menyediakan daftar huruf Hiragana dan Katakana lengkap dengan pelafalan.
- **Kuis Interaktif**: Menguji pemahaman pengguna dengan kuis yang responsif dan menarik.
- **Artikel Edukasi**: Menyediakan artikel informatif seputar bahasa Jepang untuk anak-anak.
- **Autentikasi Pengguna**: Registrasi dan login untuk menyimpan progres belajar

## Teknologi yang Digunakan
### Frontend:
- **HTML, CSS, JavaScript**: Untuk struktur, gaya, dan interaktivitas website.
- **Bootstrap**: Untuk mempercepat pengembangan antarmuka responsif.

### Backend:
- **Node.js dan Express**: Untuk menangani permintaan dan logika server.
- **Microservices Architecture**: Backend dibagi menjadi beberapa layanan kecil yang menangani fungsi spesifik, seperti:
  - **Layanan Autentikasi**: Mengelola registrasi, login, dan logout pengguna.
  - **Layanan User**: Menyediakan API untuk memperbarui data pengguna.
  - **Layanan Quiz**: Mengelola pertanyaan, jawaban, dan tantangan kuis.
- **Mysql**: Untuk menyimpan data pengguna.
- **Google App Engine**: Untuk deployment backend.

## Cara Menjalankan Proyek
### 1. Clone Repository
```bash
git clone https://github.com/username/nihonkidz.git
cd nihonkidz
```

### 2. Menjalankan Frontend
Cukup buka file `index.html` di browser atau gunakan ekstensi **Live Server** di VS Code.

### 3. Menjalankan Backend
Pastikan **Node.js** sudah terinstal, lalu jalankan perintah berikut untuk setiap layanan microservice:
```bash
cd backend/authentication
npm install
npm start
```
```bash
cd backend/user
npm install
npm start
```
```bash
cd backend/quiz
npm install
npm start
```
