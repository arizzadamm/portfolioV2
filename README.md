# 🧑‍💻 arizzadam — Personal Portfolio

My personal portfolio website built with React 19 + Vite, showcasing my projects, skills, and background as a developer.

🔗 **Live:** [react-portfolio-sage-five.vercel.app](https://react-portfolio-sage-five.vercel.app)

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI library |
| Vite | 6 | Build tool & dev server |
| React Router | v7 | Client-side routing |
| Framer Motion | 11 | Page & element animations |
| MUI | v6 | Icon components |
| SCSS | - | Styling |
| dayjs | - | Date utilities |

---

## ✨ Features

- 🌑 Dark / Light mode toggle (remembers preference)
- 📖 Multi-page navigation (Home, About, Portfolio, Contact)
- 📱 Fully responsive
- 🎨 Customizable color accent scheme
- ✨ Smooth animations with Framer Motion
- ⚡ Fast builds with Vite (vs old CRA)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Git](https://git-scm.com/)

### Install & Run

```bash
git clone https://github.com/arizzadamm/ReactPortfolioTemplate.git
cd ReactPortfolioTemplate
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview build locally
```

---

## 🎨 Customization

**Semua data personal ada di satu file: `src/info/Info.js`**

Edit file tersebut untuk mengubah:

- Nama, inisial, dan role/posisi
- Warna aksen (2 nilai RGB)
- Mini bio & hobi
- Link sosial media
- Daftar project portfolio

### Foto profil

Ganti file `src/img/self.png` dengan foto kamu sendiri.
Foto square tanpa background paling bagus — coba [remove.bg](https://remove.bg).

### Foto project (mockup)

Tambahkan screenshot project ke `src/img/` dengan nama `mock1.png`, `mock2.png`, dst.
Sesuaikan nama di array `portfolio` dalam `Info.js`.

---

## 📁 Struktur Project

```
src/
├── components/
│   ├── NavBar/
│   ├── HomePage/
│   ├── AboutPage/
│   ├── PortfolioPage/
│   ├── ContactPage/
│   └── BaseLayout/
├── img/              ← foto profil & mockup project
├── info/
│   └── Info.js       ← EDIT FILE INI untuk kustomisasi
└── styles/
    └── global.scss
```

---

## 🚢 Deployment (Vercel)

1. Push repo ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import repository
3. Framework preset: **Vite** (auto-detected)
4. Klik Deploy — selesai!

File `vercel.json` sudah dikonfigurasi untuk SPA routing.

---

## 📬 Contact

- GitHub: [@arizzadamm](https://github.com/arizzadamm)
