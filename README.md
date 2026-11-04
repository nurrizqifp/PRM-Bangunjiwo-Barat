# Portal Resmi PRM Bangunjiwo Barat
> **Meninggikan Akhlak, Membumikan Dakwah, Membangun Ekonomi Umat**  
> Cabang & Ranting Berdaya Nasional - LPCR-PM Pimpinan Pusat Muhammadiyah

Portal web modern, interaktif, dan terstruktur penuh untuk **Pimpinan Ranting Muhammadiyah (PRM) Bangunjiwo Barat**, PCM Kasihan, PDM Bantul, D.I. Yogyakarta. Dibangun dengan pendekatan **Clean Code, Semantic HTML5, DRY Architecture, dan Performa Ekstrem (0 Initial iFrames)** sebagai pembaruan komprehensif atas Google Sites terdahulu (83 halaman & sub-halaman).

---

## 🌟 Fitur Utama & Keunggulan Arsitektur

1. **Design System "Warm Stone & Deep Emerald":**
   - Palet warna kebanggaan persyarikatan (Deep Emerald `#00473e`, Surya Gold `#f3a81a`, dan Warm Stone `#f8f7f4`).
   - Tipografi modern menggunakan *Plus Jakarta Sans*.
   - Dukungan tema otomatis & manual (Light & Dark Mode) dengan transisi mulus.
   - Micro-interactions dan spring ease transitions yang nyaman di mata.

2. **Direktori 26 Masjid & Mushola Interaktif:**
   - Pemetaan 18 Masjid dan 8 Mushola binaan di wilayah Bangunjiwo Barat.
   - Filter instan per padukuhan (*Sambikerep, Lemahdadi, Karangjati, Wonotawang, Kalibatok, Gendeng, Ngentak, Cikalan*).
   - Integrasi navigasi Google Maps (Plus Codes) dan profil detail masing-masing tempat ibadah.

3. **Dashboard Transparansi Keuangan Real-Time:**
   - Visualisasi penerimaan (*Inflow*) dan penyaluran (*Outflow*) dana kas ranting senilai **Rp 87.340.000**.
   - Breakdown persentase infak, donasi, potongan arisan, serta alokasi dakwah operasional.
   - Tingkat penyerapan anggaran 100% yang terverifikasi.

4. **PerpustakaanMu Digital (Zero Initial iFrames):**
   - Katalog buku panduan resmi Muhammadiyah, Himpunan Putusan Tarjih (HPT), Risalah Islam Berkemajuan (RIB), dan dokumen Muktamar.
   - Membaca dokumen via modal popup on-demand sehingga waktu muat halaman awal tetap super cepat (< 1 detik).

5. **Pencarian Cepat Cerdas (Command Palette `Ctrl + K`):**
   - Modal pencarian instan yang mengindeks seluruh 83 rute halaman secara menyeluruh.
   - Navigasi keyboard-friendly (`Ctrl+K` atau `Cmd+K`, navigasi panah, dan `ESC` untuk menutup).

6. **Amal Usaha Pendidikan Terpadu:**
   - Profil 7 lembaga pendidikan (PAUD, 4 TK 'Aisyiyah Bustanul Athfal, SD Muhammadiyah, MTs, dan SMK Muhammadiyah Bangunjiwo).

7. **Aksesibilitas Mobile (iOS Touch Targets $\ge 44\text{px}$):**
   - Navigasi melayang di bawah layar (*Bottom Mobile Dock*) khusus layar ponsel untuk akses satu jempol yang ergonomis.

---

## 📁 Struktur Direktori Repositori

```text
PRM-Bangunjiwo-Barat/
├── index.html                           # Landing Page Utama (Serambi)
├── profil/index.html                    # Profil Lengkap & Sejarah Ranting
├── sejarah-awal/index.html              # Sejarah Rintisan 1985 & SK PCM 1997
├── laporan-keuangan/index.html          # Dashboard Transparansi Kas & Program
├── kepengurusan-periode-2022-2027/      # Pimpinan PRM & Majelis PRA
│   ├── index.html
│   └── ortom/index.html
├── progam-kerja-dan-pelaksanaannya/     # Agenda Kerja 2022-2027
│   ├── index.html
│   ├── 2023/index.html
│   ├── 2024/index.html
│   ├── 2025/index.html
│   ├── 2026/index.html
│   └── pelaksanaan-progam-kerja/index.html
├── masjid-mushola-binaan-prm/           # Direktori 26 Masjid & Mushola
│   ├── index.html
│   ├── 1-masjid-al-yaqin-ngentak/
│   ├── 4-masjid-al-mustaqiem-karangjati/
│   └── ... (26 sub-direktori masjid)
├── amal-usaha-pendidikan/               # 7 Lembaga Pendidikan Sekolah
│   ├── index.html
│   ├── sd-unggulan-muhammadiyah-lemahdadi/
│   └── ... (6 sub-direktori sekolah)
├── perpustakaanmu/index.html            # Khazanah Pustaka Digital
├── unit-layanan-lazismu/index.html      # Kantor Layanan Zakat, Infaq & Shadaqah
├── tokomu-bb-mart/index.html            # Unit Retail Ekonomi Ranting
├── warta-kegiatan/index.html            # Warta Dakwah & Dokumentasi
├── aisyiyah/index.html                  # Pimpinan Ranting 'Aisyiyah
├── amm/index.html                       # Pemuda Muhammadiyah & Nasyiatul 'Aisyiyah
├── tapak-suci/index.html                # Perguruan Bela Diri Tapak Suci
├── assets/
│   ├── css/
│   │   └── main.css                     # Design Tokens, Layout, Spring Animations
│   ├── js/
│   │   ├── core/
│   │   │   ├── dom-utils.js             # XSS Safe Helpers & Formatters
│   │   │   ├── layout-shell.js          # Dynamic Header, Mega-Menu, Dock, Search
│   │   │   └── page-renderer.js         # Interactive Component Controllers
│   │   ├── data/
│   │   │   └── site-database.js         # Single Source of Truth 83 Rute
│   │   └── main.js                      # Main App Bootstrapper
│   └── images/
│       └── favicon.svg                  # Lambang Resmi Beresolusi Vektor
├── vercel.json                          # CleanUrls & Security Headers Config
└── package.json                         # Project Manifest (ESM)
```

---

## 🚀 Menjalankan Secara Lokal

Repositori ini sepenuhnya berbasis web standar modern tanpa build-step rumit:

```bash
# Menggunakan web server lokal apa pun (misal: Live Server di VS Code, atau Node.js)
npx serve .
# Atau dengan Python
python -m http.server 3000
```
Buka peramban di `http://localhost:3000`.

---

## 🌐 Panduan Deployment

### Deploy ke Vercel (Rekomendasi)
File `vercel.json` telah disiapkan dengan konfigurasi `cleanUrls: true` serta security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, dll.):
1. Push repositori ini ke GitHub / GitLab.
2. Impor proyek di dasbor Vercel.
3. Klik **Deploy** (tanpa perlu mengisi build command).

---

## 📄 Lisensi & Hak Cipta
Hak Cipta &copy; 2026 **Pimpinan Ranting Muhammadiyah (PRM) Bangunjiwo Barat**. Seluruh Hak Dilindungi.

