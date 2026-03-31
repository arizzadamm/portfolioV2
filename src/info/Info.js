// =============================================
// 🎨 WARNA AKSEN — ubah sesuai selera
// Cek di light mode DAN dark mode ya!
// =============================================
export let colors = ["rgb(0,255,164)", "rgb(166,104,255)"];

// =============================================
// 👤 DATA DIRI — isi semua bagian di bawah ini
// =============================================
const info = {
    // --- IDENTITAS ---
    firstName: "Ariza",        // ← ganti
    lastName: "Damara Al-khaf",          // ← ganti
    initials: "ARZ",            // ← 2 huruf inisial kamu
    position: "Cyber Security Engineer/.NET Developer", // ← posisi/role kamu

    // --- FOTO PROFIL ---
    // Taruh foto kamu di src/img/self.png
    // Foto square tanpa background paling bagus (coba remove.bg)
    selfPortrait: "self",

    // --- GRADIENT NAMA (otomatis dari colors di atas) ---
    gradient: `-webkit-linear-gradient(135deg, ${colors})`,
    baseColor: colors[0],

    // --- MINI BIO (tampil di halaman Home) ---
    // Bisa pakai emoji! Mac: Ctrl+Cmd+Space | Win: Win+.
    miniBio: [
        {
            emoji: "☕",
            text: "fueled by coffee"
        },
        {
            emoji: "🌏",
            text: "based in Indonesia"
        },
        {
            emoji: "💼",
            text: "working at The Ministry of National Development Planning/"  // ← ganti
        },
        {
            emoji: "🎓",
            text: "studied at Telkom University" // ← ganti
        }
    ],

    // --- HOBI (tampil di halaman About) ---
    hobbies: [
        {
            label: "coding",
            emoji: "💻"
        },
        {
            label: "Analyzing data",
            emoji: "📊"
        },
        {
            label: "gaming",
            emoji: "🎮"
        },
        {
            label: "Cycling",
            emoji: "🚴"
        }
    ],

    // --- SOSIAL MEDIA ---
    // Hapus atau tambah sesuai kebutuhan
    socials: {
        // twitter: "https://twitter.com/username",
        github: "https://github.com/arizzadamm",   // ← ganti kalau perlu
        linkedin: "https://linkedin.com/in/arizzadamm", // ← ganti
        // instagram: "https://instagram.com/username",
        // email: "mailto:kamu@email.com",
    },

    // --- PORTFOLIO PROJECTS ---
    // Tambah/kurangi object sesuai jumlah project kamu
    // Foto mockup: taruh di src/img/ dengan nama mock1.png, mock2.png, dst.
    portfolio: [
        {
            title: "Project 1",
            live: "https://yourproject.com",    // ← link demo live
            source: "https://github.com/arizzadamm/project-1", // ← link repo
            image: "mock1"
        },
        {
            title: "Project 2",
            live: "https://yourproject2.com",
            source: "https://github.com/arizzadamm/project-2",
            image: "mock2"
        },
        {
            title: "Project 3",
            live: "https://yourproject3.com",
            source: "https://github.com/arizzadamm/project-3",
            image: "mock3"
        },
    ]
};

export default info;
