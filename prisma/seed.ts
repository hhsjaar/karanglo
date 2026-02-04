import { PrismaClient, IdmStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Starting Seeding Process...");

    // 1. Admin
    const password = await bcrypt.hash("Temonanjing123", 10);
    await prisma.admin.upsert({
        where: { username: "karanglo" },
        update: {},
        create: {
            username: "karanglo",
            password: password,
            role: "admin",
        },
    });
    console.log("✅ Admin seeded");

    // 2. Village Profile
    await prisma.villageProfile.upsert({
        where: { id: "default" },
        update: {},
        create: {
            id: "default",
            name: "Desa Karanglo",
            description: "Desa Karanglo adalah desa wisata yang terletak di Kecamatan Polanharjo, Kabupaten Klaten, Jawa Tengah. Dikenal dengan keindahan alam, sumber mata air yang jernih, dan masyarakat yang ramah.",
            vision: "Terwujudnya Desa Karanglo yang Mandiri, Sejahtera, Berbudaya, dan Berwawasan Lingkungan melalui Pengembangan Potensi Wisata dan Ekonomi Kreatif.",
            mission: `1. Mewujudkan tata kelola pemerintahan desa yang baik, transparan, dan akuntabel.
2. Meningkatkan kualitas sumber daya manusia melalui pendidikan dan kesehatan.
3. Mengembangkan potensi ekonomi desa berbasis pariwisata dan UMKM.
4. Melestarikan seni budaya dan kearifan lokal.
5. Meningkatkan pembangunan infrastruktur yang berkelanjutan.`,
            history: `Desa Karanglo memiliki sejarah panjang yang erat kaitannya dengan penyebaran agama Islam di wilayah Klaten. Konon, desa ini didirikan oleh seorang tokoh bernama Kyai Karang yang membabat alas (hutan) di wilayah ini.
            
Seiring berjalannya waktu, Desa Karanglo berkembang menjadi pemukiman yang subur dan makmur berkat keberadaan sumber mata air yang melimpah. Pada era modern, Desa Karanglo bertransformasi menjadi Desa Wisata dengan menonjolkan potensi wisata air (River Tubing) dan kuliner khas.`,
            areaSize: 156.5,
            populationCount: 3500,
            idmStatus: "MAJU",
            address: "Jl. Raya Karanglo No. 1, Polanharjo, Klaten, Jawa Tengah 57474",
            phone: "0812-3456-7890",
            email: "pemdes@karanglo.desa.id",
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.2697839356345!2d110.6384!3d-7.6543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzknMTUuNSJTIDExMMKwMzgnMTguMiJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid",
        }
    });

    // 3. Village Officials
    await prisma.villageOfficial.deleteMany();
    await prisma.villageOfficial.createMany({
        data: [
            { name: "H. Yudi Kusuma", position: "Kepala Desa", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop", order: 1 },
            { name: "Siti Aminah, S.Pd", position: "Sekretaris Desa", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop", order: 2 },
            { name: "Budi Santoso, S.E", position: "Kaur Keuangan", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop", order: 3 },
            { name: "Rina Wati", position: "Kaur Umum", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop", order: 4 },
            { name: "Joko Susilo", position: "Kasi Pemerintahan", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop", order: 5 },
            { name: "Sri Mulyani", position: "Kasi Kesejahteraan", image: "https://images.unsplash.com/photo-1598550832205-d8b555167551?w=400&h=500&fit=crop", order: 6 },
        ]
    });
    console.log("✅ Officials seeded");

    // 4. Demographics
    await prisma.demographicStat.deleteMany();
    const statsData = [
        // Gender
        { category: "GENDER", label: "Laki-laki", count: 1750, year: 2024 },
        { category: "GENDER", label: "Perempuan", count: 1750, year: 2024 },

        // Age
        { category: "AGE", label: "0-14 Tahun", count: 800, year: 2024 },
        { category: "AGE", label: "15-64 Tahun", count: 2400, year: 2024 },
        { category: "AGE", label: "65+ Tahun", count: 300, year: 2024 },

        // Religion
        { category: "RELIGION", label: "Islam", count: 3200, year: 2024 },
        { category: "RELIGION", label: "Kristen", count: 150, year: 2024 },
        { category: "RELIGION", label: "Katolik", count: 100, year: 2024 },
        { category: "RELIGION", label: "Hindu", count: 50, year: 2024 },

        // Profession
        { category: "PROFESSION", label: "Petani", count: 1200, year: 2024 },
        { category: "PROFESSION", label: "Buruh Tani", count: 500, year: 2024 },
        { category: "PROFESSION", label: "PNS/TNI/Polri", count: 200, year: 2024 },
        { category: "PROFESSION", label: "Wiraswasta", count: 600, year: 2024 },
        { category: "PROFESSION", label: "Karyawan Swasta", count: 400, year: 2024 },
        { category: "PROFESSION", label: "Pelajar/Mahasiswa", count: 600, year: 2024 },
    ];
    await prisma.demographicStat.createMany({ data: statsData });
    console.log("✅ Demographics seeded");

    // 5. APB Desa
    await prisma.budget.deleteMany();
    await prisma.budget.createMany({
        data: [
            // Income
            { year: 2024, type: "INCOME", category: "Dana Desa (DD)", amount: 850000000 },
            { year: 2024, type: "INCOME", category: "Alokasi Dana Desa (ADD)", amount: 450000000 },
            { year: 2024, type: "INCOME", category: "Pendapatan Asli Desa (PAD)", amount: 120000000 },
            { year: 2024, type: "INCOME", category: "Bantuan Keuangan Provinsi", amount: 150000000 },
            { year: 2024, type: "INCOME", category: "Bantuan Keuangan Kabupaten", amount: 100000000 },

            // Expense
            { year: 2024, type: "EXPENSE", category: "Bidang Penyelenggaraan Pemerintahan Desa", amount: 550000000 },
            { year: 2024, type: "EXPENSE", category: "Bidang Pembangunan Desa", amount: 800000000 },
            { year: 2024, type: "EXPENSE", category: "Bidang Pembinaan Kemasyarakatan", amount: 150000000 },
            { year: 2024, type: "EXPENSE", category: "Bidang Pemberdayaan Masyarakat", amount: 120000000 },
            { year: 2024, type: "EXPENSE", category: "Bidang Penanggulangan Bencana", amount: 50000000 },
        ]
    });
    console.log("✅ APB Desa seeded");

    // 6. IDM
    await prisma.idmRecord.deleteMany();
    await prisma.idmRecord.createMany({
        data: [
            { year: 2022, scoreIks: 0.75, scoreIke: 0.65, scoreIkl: 0.70, scoreTotal: 0.7000, status: "BERKEMBANG" },
            { year: 2023, scoreIks: 0.78, scoreIke: 0.72, scoreIkl: 0.75, scoreTotal: 0.7500, status: "MAJU" },
            { year: 2024, scoreIks: 0.82, scoreIke: 0.78, scoreIkl: 0.80, scoreTotal: 0.8000, status: "MAJU", target: 0.85, recommendations: "Perlu peningkatan akses ekonomi digital dan pengelolaan sampah mandiri." },
        ]
    });
    console.log("✅ IDM seeded");

    // 7. Potency (Wisata & UMKM)
    await prisma.potency.deleteMany();
    await prisma.potency.createMany({
        data: [
            {
                title: "River Tubing Kali Pusur",
                slug: "river-tubing-kali-pusur",
                category: "POTENCY",
                description: "Petualangan menyusuri sungai jernih dengan ban, aman dan menyenangkan untuk keluarga.",
                content: "River Tubing Kali Pusur menawarkan sensasi petualangan menyusuri sungai sepanjang 2 KM. Air yang jernih berasal dari mata air pegunungan, dikelilingi pemandangan sawah dan pepohonan hijau. Fasilitas lengkap mulai dari perlengkapan safety (helm, pelampung), pemandu profesional, hingga warung makan dengan menu khas desa.",
                thumbnail: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
                images: [],
                economicVal: "Omset Rp 500jt/tahun",
                location: "Dusun II"
            },
            {
                title: "Umbul Besuki",
                slug: "umbul-besuki",
                category: "POTENCY",
                description: "Pemandian alam dengan air yang sejuk dan asri, cocok untuk terapi kesehatan.",
                content: "Umbul Besuki merupakan sumber mata air alami yang telah ditata menjadi kolam renang yang asri. Airnya sangat jernih dan segar, tanpa kaporit. Dipercaya memiliki khasiat untuk terapi kesehatan, khususnya relaksasi otot dan peredaran darah.",
                thumbnail: "https://images.unsplash.com/photo-1519810755548-397586617fb0?w=800&q=80",
                images: [],
                economicVal: "Omset Rp 300jt/tahun",
                location: "Dusun III"
            },
            {
                title: "Keripik Belut Ibu Ani",
                slug: "keripik-belut-ibu-ani",
                category: "UMKM",
                description: "Oleh-oleh khas Karanglo yang renyah, gurih, dan bergizi tinggi.",
                content: "Keripik Belut Ibu Ani diproduksi menggunakan belut sawah segar pilihan dan bumbu rempah warisan leluhur. Digoreng garing sehingga renyah dan tidak berminyak. Tersedia dalam berbagai kemasan dan rasa (Original, Pedas, Balado).",
                thumbnail: "https://images.unsplash.com/photo-1621251390310-4c330df32e8f?w=800&q=80",
                images: [],
                economicVal: "Laku 1000 pcs/bulan",
                location: "Dusun I"
            },
            {
                title: "Batik Tulis Karanglo",
                slug: "batik-tulis-karanglo",
                category: "UMKM",
                description: "Kain batik tulis dengan motif khas 'Bunga Karang' yang elegan.",
                content: "Batik Tulis Karanglo dikerjakan oleh ibu-ibu PKK desa sebagai upaya pelestarian budaya. Motif 'Bunga Karang' terinspirasi dari keindahan alam desa. Pewarnaan menggunakan bahan alami sehingga ramah lingkungan dan warna lebih natural.",
                thumbnail: "https://images.unsplash.com/photo-1596263576924-4af8a2d3ad7a?w=800&q=80",
                images: [],
                economicVal: "Harga mulai Rp 250rb",
                location: "Dusun IV"
            },
            {
                title: "Pengolahan Sampah Terpadu",
                slug: "kkn-pengolahan-sampah",
                category: "KKN_PROGRAM",
                description: "Program KKN UGM 2024: Bank Sampah dan Pembuatan Pupuk Kompos.",
                content: "Mahasiswa KKN UGM menginisiasi program Pengolahan Sampah Terpadu. Kegiatan meliputi sosialisasi pemilahan sampah, pembentukan Bank Sampah 'Karanglo Berseri', dan pelatihan pembuatan pupuk kompos dari sampah organik.",
                thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
                images: [],
                location: "Balai Desa"
            }
        ]
    });
    console.log("✅ Potency seeded");

    // 8. Activities (News & Events)
    await prisma.activity.deleteMany();
    await prisma.activity.createMany({
        data: [
            {
                title: "Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) 2025",
                slug: "musrenbangdes-2025",
                category: "EVENT",
                excerpt: "Forum musyawarah tahunan untuk menyepakati RKP Desa Tahun Anggaran 2025.",
                content: `Desa Karanglo Sukses Gelar Musrenbangdes TA 2025.
                
Bertempat di Balai Desa Karanglo, Pemerintah Desa menggelar Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) untuk Tahun Anggaran 2025. Acara dihadiri oleh seluruh elemen masyarakat, mulai dari BPD, LPMD, Karang Taruna, PKK, hingga tokoh masyarakat.

Dalam sambutannya, Kepala Desa Karanglo menekankan pentingnya sinergi antara pembangunan fisik dan pemberdayaan masyarakat. "Tahun 2025 kita akan fokus pada pengembangan potensi wisata untuk mendongkrak PADes," ujarnya.`,
                thumbnail: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
                publishedAt: new Date(),
                author: "Admin Desa"
            },
            {
                title: "Penyaluran BLT Dana Desa Tahap I Bulan Januari",
                slug: "penyaluran-blt-dd-januari-2024",
                category: "NEWS",
                excerpt: "Sebanyak 50 KPM menerima Bantuan Langsung Tunai (BLT) Dana Desa.",
                content: "Pemerintah Desa Karanglo kembali menyalurkan Bantuan Langsung Tunai (BLT) yang bersumber dari Dana Desa. Penyaluran tahap I untuk bulan Januari 2024 ini diberikan kepada 50 Keluarga Penerima Manfaat (KPM) yang telah terverifikasi melalui Musyawarah Desa Khusus.",
                thumbnail: "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&q=80",
                publishedAt: new Date(Date.now() - 3600000 * 24 * 2),
                author: "Sekretaris Desa"
            },
            {
                title: "Kerja Bakti Massal 'Jumat Bersih'",
                slug: "kerja-bakti-jumat-bersih",
                category: "EVENT",
                excerpt: "Warga antusias mengikuti kerja bakti membersihkan lingkungan dan saluran irigasi.",
                content: "Ratusan warga Desa Karanglo turun ke jalan untuk mengikuti kegiatan Kerja Bakti Massal 'Jumat Bersih'. Fokus kegiatan kali ini adalah pembersihan saluran irigasi tersier untuk mengantisipasi musim hujan dan mencegah banjir.",
                thumbnail: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=800&q=80",
                publishedAt: new Date(Date.now() - 3600000 * 24 * 7),
                author: "Kepala Dusun I"
            },
            {
                title: "Pelatihan Digital Marketing untuk UMKM",
                slug: "pelatihan-digital-marketing-umkm",
                category: "NEWS",
                excerpt: "Meningkatkan daya saing produk lokal melalui pemasaran online.",
                content: "Bekerjasama dengan Dinas Koperasi dan UKM Kabupaten Klaten, Pemdes Karanglo mengadakan pelatihan Digital Marketing bagi pelaku UMKM. Materi meliputi foto produk menggunakan HP, copywriting, dan cara berjualan di Marketplace.",
                thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
                publishedAt: new Date(Date.now() - 3600000 * 24 * 10),
                author: "Kasi Kesejahteraan"
            },
            {
                title: "Pendaftaran Turnamen Voli Antar RW",
                slug: "turnamen-voli-antar-rw",
                category: "ANNOUNCEMENT",
                excerpt: "Segera daftarkan tim voli RW Anda! Total hadiah jutaan rupiah.",
                content: "Dalam rangka memeriahkan HUT RI ke-79, Karang Taruna Desa Karanglo akan menyelenggarakan Turnamen Bola Voli Antar RW. Pendaftaran dibuka mulai tanggal 1-10 Agustus 2024 di Sekretariat Karang Taruna.",
                thumbnail: "https://images.unsplash.com/photo-1612872087720-48ca45b0d6b3?w=800&q=80",
                publishedAt: new Date(Date.now() - 3600000 * 24 * 15),
                author: "Ketua Karang Taruna"
            }
        ]
    });
    console.log("✅ Activities seeded");

    // 9. Banners
    await prisma.banner.deleteMany();
    const banners = [
        {
            title: "Selamat Datang di Desa Karanglo",
            description: "Desa Wisata yang Asri, Sejuk, dan Menyenangkan.",
            image: "https://images.unsplash.com/photo-1588668214407-6ea9e6d8c278?q=80&w=2574&auto=format&fit=crop",
            order: 1,
            link: "/profil",
        },
        {
            title: "Nikmati Kesegaran Wisata Air",
            description: "River Tubing & Umbul Alami yang Menyegarkan Pikiran.",
            image: "https://images.unsplash.com/photo-1473183577329-87c2db1b7c25?q=80&w=3540&auto=format&fit=crop",
            order: 2,
            link: "/potensi",
        },
        {
            title: "Dukung UMKM Lokal",
            description: "Belanja Produk Asli Desa, Majukan Ekonomi Warga.",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=3540&auto=format&fit=crop",
            order: 3,
            link: "/potensi?cat=UMKM",
        }
    ];
    await prisma.banner.createMany({ data: banners });
    console.log("✅ Banners seeded");

    // 10. Residents
    await prisma.resident.deleteMany();
    const residents = [
        {
            nik: "3310010101700001",
            name: "Supardi",
            gender: "LAKI-LAKI",
            birthPlace: "Klaten",
            birthDate: new Date("1970-05-12"),
            religion: "Islam",
            education: "SMA",
            profession: "Petani",
            maritalStatus: "Kawin",
            address: "Dusun I",
            rt: "01",
            rw: "01"
        },
        {
            nik: "3310014203850002",
            name: "Siti Fatimah",
            gender: "PEREMPUAN",
            birthPlace: "Klaten",
            birthDate: new Date("1985-03-22"),
            religion: "Islam",
            education: "S1",
            profession: "Guru",
            maritalStatus: "Kawin",
            address: "Dusun II",
            rt: "02",
            rw: "01"
        },
        {
            nik: "3310011508980003",
            name: "Bambang Wijaya",
            gender: "LAKI-LAKI",
            birthPlace: "Boyolali",
            birthDate: new Date("1998-08-15"),
            religion: "Kristen",
            education: "D3",
            profession: "Wiraswasta",
            maritalStatus: "Belum Kawin",
            address: "Dusun III",
            rt: "01",
            rw: "02"
        },
        {
            nik: "3310014512050004",
            name: "Putri Lestari",
            gender: "PEREMPUAN",
            birthPlace: "Klaten",
            birthDate: new Date("2005-12-05"),
            religion: "Islam",
            education: "SMA",
            profession: "Pelajar/Mahasiswa",
            maritalStatus: "Belum Kawin",
            address: "Dusun I",
            rt: "03",
            rw: "01"
        }
    ];
    await prisma.resident.createMany({ data: residents });
    console.log("✅ Residents seeded");

    console.log("✅ All data seeded successfully!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
