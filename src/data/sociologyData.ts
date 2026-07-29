import { DiagnosticQuestion, SociologyModule, ExpeditionPost } from '../types';

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    question: 'Saat tersesat di kota baru, apa yang kamu lakukan?',
    options: [
      { key: 'A', text: 'Membaca peta/petunjuk arah tertulis', type: 'Jurnalis' },
      { key: 'B', text: 'Mengamati bentuk bangunan atau landmark', type: 'Fotografer' },
      { key: 'C', text: 'Terus berjalan dan bertanya langsung pada warga', type: 'Petualang' },
    ],
  },
  {
    id: 2,
    question: 'Bagaimana caramu paling cepat mengingat materi sekolah?',
    options: [
      { key: 'A', text: 'Membaca catatan/buku berulang kali', type: 'Jurnalis' },
      { key: 'B', text: 'Membuat mind-map atau bagan warna-warni', type: 'Fotografer' },
      { key: 'C', text: 'Mempraktikkannya atau berdiskusi sambil bergerak', type: 'Petualang' },
    ],
  },
  {
    id: 3,
    question: 'Bentuk laporan ekspedisi seperti apa yang paling kamu suka buat?',
    options: [
      { key: 'A', text: 'Artikel jurnalistik yang detail', type: 'Jurnalis' },
      { key: 'B', text: 'Jurnal foto/video dokumenter', type: 'Fotografer' },
      { key: 'C', text: 'Presentasi interaktif di depan kelas', type: 'Petualang' },
    ],
  },
];

export const SOCIOLOGY_MODULES: SociologyModule[] = [
  {
    id: 'gejala-sosial',
    title: 'Modul 1: Gejala Sosial',
    subtitle: 'Hakikat, Karakteristik, dan Tingkatan Realitas Sosial',
    icon: 'Activity',
    videoContent: {
      videoTitle: '🎬 Video Pembelajaran 1: Memahami Gejala Sosial & Rumus KOMODO TADI',
      duration: '03:45',
      speaker: 'Dr. Kirana S.Sos (Dosen Sosiologi Ekspedisi)',
      summary: 'Penjelasan animasi interaktif mengenai hakikat fakta sosial Émile Durkheim, rumus cepat KOMODO TADI, dan 3 skala Norman Blaikie.',
      videoScript: [
        'Halo Penjelajah Sosiologi! Selamat datang di Video Pembelajaran Modul 1.',
        'Pernahkah kamu memikirkan mengapa kemacetan atau tren fashion terjadi di masyarakat? Menurut Émile Durkheim, ini adalah Fakta Sosial—gejala eksternal di luar diri kita yang punya daya paksa.',
        'Untuk mengingat 5 karakteristik gejala sosial, kita punya rumus cepat: KOMODO TADI! (K: Kompleks, D: Dinamis, T: Tidak Universal, D: Dihasilkan Manusia).',
        'Selain itu, Norman Blaikie membaginya menjadi skala Mikro (interaksi langsung), Meso (komunitas/organisasi), dan Makro (sistem nasional seperti mudik Lebaran).'
      ],
      chapters: [
        { time: '00:00', title: 'Pengantar Fakta Sosial Durkheim', desc: 'Sifat eksternal dan memaksakan norma' },
        { time: '01:15', title: 'Rumus Cepat: KOMODO TADI', desc: 'Kompleks, Dinamis, Tidak Universal, Dihasilkan Manusia' },
        { time: '02:30', title: 'Skala Blaikie (Mikro, Meso, Makro)', desc: 'Tingkatan realitas sosial dalam kehidupan sehari-hari' }
      ]
    },
    jurnalisContent: {
      heading: 'Gejala Sosial menurut Tokoh Sosiologi',
      paragraphs: [
        'Menurut Émile Durkheim, gejala sosial adalah bagian dari fakta sosial—yaitu cara bertindak, berpikir, dan berperasaan yang berada di luar individu dan mempunyai kekuatan memaksa yang mengendalikan individu tersebut. Gejala sosial terjadi secara objektif dan saling mempengaruhi dalam realitas kemasyarakatan.',
        'Sosiolog Norman Blaikie membagi tingkatan gejala sosial menjadi tiga: Tingkat Mikro (interaksi tatap muka antarindividu), Tingkat Meso (interaksi dalam kelompok, organisasi, atau komunitas), dan Tingkat Makro (gejala sosial berskala besar seperti struktur masyarakat, regulasi nasional, atau globalisasi).',
      ],
      keyPoints: [
        'KOMODO TADI (Jembatan Keledai Karakteristik): Kompleks (melibatkan banyak faktor), Dinamis (selalu berubah), Tidak Universal (berbeda tiap wilayah), Kualitatif (sulit diukur pasti), Dihasilkan Manusia.',
        'Émile Durkheim: Gejala sosial sebagai fakta sosial objektif di luar diri individu.',
        'Norman Blaikie: Pembagian skala gejala sosial (Mikro, Meso, dan Makro).',
      ],
    },
    fotograferContent: {
      headline: 'Infografis Visual Gejala Sosial',
      gridItems: [
        {
          title: 'Fakta Sosial Durkheim',
          subtitle: 'Fakta Objektif Eksternal',
          colorBg: 'bg-emerald-800 text-amber-50',
          textColor: 'text-amber-100',
          visualBadge: 'Émile Durkheim',
          items: [
            'Di luar individu (eksternal)',
            'Memiliki daya paksa (coercive power)',
            'Berlaku secara umum dalam masyarakat',
          ],
        },
        {
          title: 'Akronim: KOMODO TADI',
          subtitle: 'Karakteristik Gejala Sosial',
          colorBg: 'bg-amber-900 text-amber-50',
          textColor: 'text-amber-200',
          visualBadge: 'Formula Cepat',
          items: [
            'K - Kompleks (Multifaktor)',
            'D - Dinamis (Terus Berubah)',
            'T - Tidak Universal (Lokal)',
            'D - Dihasilkan Manusia',
          ],
        },
        {
          title: 'Skala Norman Blaikie',
          subtitle: '3 Tingkat Gejala Sosial',
          colorBg: 'bg-amber-100 text-emerald-950 border border-emerald-800/30',
          textColor: 'text-emerald-900',
          visualBadge: 'Peta Skala',
          layoutType: 'stacked',
          items: [
            '🔴 MAKRO: Sistem Besar & Tradisi Nasional (Mudik, Inflasi)',
            '🟡 MESO: Komunitas, Organisasi, Suku, Lembaga',
            '🟢 MIKRO: Interaksi Tatap Muka Antar-Individu',
          ],
        },
      ],
    },
    petualangContent: {
      chestTitle: 'Peti Pengetahuan: Misteri Gejala Sosial',
      chestIcon: 'Compass',
      secretKnowledge: [
        {
          title: '🔑 Kunci Durkheim: Fakta Sosial',
          content: 'Gejala sosial itu seperti angin—kamu tidak bisa memegangnya, tapi kamu merasakan kekuatannya mendorongmu untuk menaati norma.',
          badge: 'Teori Dasar',
        },
        {
          title: '🐉 Rahasia KOMODO TADI',
          content: 'Kemacetan lalu lintas adalah contoh KOMODO TADI! Ada faktor gengsi mobil (psikologi), harga BBM (ekonomi), dan lebar jalan (regulasi). Mengapa dinamis? Karena pola macet berubah sesuai jam kerja!',
          badge: 'Trik Mengingat',
        },
        {
          title: '🔍 Lensa Blaikie: Dari Mikro ke Makro',
          content: 'Dua orang tawar-menawar di pasar = MIKRO. Rapat Karang Taruna = MESO. Tradisi Mudik Lebaran se-Indonesia = MAKRO!',
          badge: 'Tingkatan Skala',
        },
      ],
    },
  },
  {
    id: 'struktur-sosial',
    title: 'Modul 2: Struktur Sosial',
    subtitle: 'Diferensiasi Horizontal & Stratifikasi Vertikal',
    icon: 'Layers',
    videoContent: {
      videoTitle: '🎬 Video Pembelajaran 2: Bedah Struktur Sosial J. Nasikun',
      duration: '04:12',
      speaker: 'Prof. Bambang Sosiolog Nusantara',
      summary: 'Visualisasi garis horizontal (Diferensiasi Suku, Agama, Ras) dan garis vertikal (Stratifikasi Kasta, Kelas, dan Tanduk Kerbau Toraja).',
      videoScript: [
        'Selamat datang di Modul 2 tentang Struktur Sosial Masyarakat Indonesia.',
        'Sosiolog J. Nasikun menjelaskan bahwa masyarakat Indonesia tersusun dalam dua dimensi: Horizontal dan Vertikal.',
        'Dimensi Horizontal disebut Diferensiasi Sosial. Di sini semua kelompok suku (Jawa, Batak, Toraja), agama, dan ras berkedudukan SEJAJAR tanpa ada yang lebih tinggi.',
        'Sementara Dimensi Vertikal adalah Stratifikasi Sosial. Ini adalah pelapisan bertingkat berdasarkan kekayaan, jabatan, atau gelar kehormatan, seperti tingkatan status rumah adat Tongkonan di Toraja.'
      ],
      chapters: [
        { time: '00:00', title: 'Konsep Dua Dimensi J. Nasikun', desc: 'Pengenalan Horizontal vs Vertikal' },
        { time: '01:30', title: 'Diferensiasi Horizontal (Kesenderajatan)', desc: 'Keberagaman Suku, Agama, Ras, dan Gender' },
        { time: '02:50', title: 'Stratifikasi Vertikal (Hierarki)', desc: 'Pelapisan kelas atas, menengah, dan bawah' }
      ]
    },
    jurnalisContent: {
      heading: 'Pembagian Struktur Sosial menurut J. Nasikun',
      paragraphs: [
        'Menurut sosiolog Indonesia J. Nasikun, struktur sosial masyarakat Indonesia dapat ditinjau dari dua dimensi utama: horizontal dan vertikal.',
        'Dimensi Horizontal dinamakan Diferensiasi Sosial, yaitu pembelahan masyarakat secara sejajar berdasarkan ciri fisik (ras), sosial (suku bangsa, agama), dan budaya tanpa ada tingkatan tinggi-rendah. Semua kelompok dianggap sejajar (derajatnya sama).',
        'Dimensi Vertikal dinamakan Stratifikasi Sosial, yaitu pelapisan masyarakat secara hirarkis atau bertingkat (kelas atas, menengah, bawah) berdasarkan kekayaan, kekuasaan, pendidikan, atau kehormatan. Stratifikasi dapat bersifat terbuka (memungkinkan mobilitas), tertutup (seperti kasta), atau campuran.',
      ],
      keyPoints: [
        'J. Nasikun: Struktur sosial memiliki dimensi Horizontal (Diferensiasi) dan Vertikal (Stratifikasi).',
        'Diferensiasi Sosial = Sejajar / Tanpa Tingkatan (Ras, Agama, Suku, Gender).',
        'Stratifikasi Sosial = Bertingkat / Hirarkis (Kelas Atas, Menengah, Bawah).',
      ],
    },
    fotograferContent: {
      headline: 'Galeri Visual Struktur Sosial',
      gridItems: [
        {
          title: 'Diferensiasi Sosial',
          subtitle: 'Dimensi Horizontal (Sejajar)',
          colorBg: 'bg-emerald-900 text-amber-50',
          textColor: 'text-emerald-200',
          visualBadge: 'Horizontal ═',
          items: [
            'Suku Bangna (Jawa, Sunda, Batak, Toraja)',
            'Agama & Kepercayaan',
            'Ras & Ciri Fisik',
            'Status Kedudukan Sejajar',
          ],
        },
        {
          title: 'Stratifikasi Sosial',
          subtitle: 'Dimensi Vertikal (Bertingkat)',
          colorBg: 'bg-stone-800 text-amber-50',
          textColor: 'text-amber-200',
          visualBadge: 'Vertikal ║',
          layoutType: 'stacked',
          items: [
            '👑 KELAS ATAS (Atas/Pejabat/Kaya)',
            '💼 KELAS MENENGAH (Professional/Pemilik Usaha)',
            '🌾 KELAS BAWAH (Buruh/Masyarakat Umum)',
            'Contoh: Tanduk Kerbau Tongkonan Toraja',
          ],
        },
      ],
    },
    petualangContent: {
      chestTitle: 'Peti Pengetahuan: Struktur & Pelapisan Masyarakat',
      chestIcon: 'Map',
      secretKnowledge: [
        {
          title: '⚖️ Petunjuk Horizontal (Diferensiasi)',
          content: 'Suku Bugis, Suku Minang, Agama Islam, Kristen, Hindu, Buddha semuanya berdiri SEJAJAR. Tidak ada agama atau suku yang secara hukum sosiologis lebih tinggi dari yang lain.',
          badge: 'Konsep Horizontal',
        },
        {
          title: '🪜 Petunjuk Vertikal (Stratifikasi)',
          content: 'Di Desa Toraja, jumlah tanduk kerbau pada rumah adat Tongkonan menandakan tingkat kehormatan dan posisi ekonomi keluarga (Stratifikasi Vertikal).',
          badge: 'Konsep Vertikal',
        },
        {
          title: '💡 Kunci J. Nasikun',
          content: 'Ingat kata kuncinya: Horizontal = Berbeda tapi Sejajar (Diferensiasi). Vertikal = Berbeda dan Bertingkat (Stratifikasi).',
          badge: 'Inti Teori',
        },
      ],
    },
  },
  {
    id: 'prasangka-stereotipe',
    title: 'Modul 3: Prasangka & Stereotipe',
    subtitle: 'Membedakan Kognitif (Pikiran) dan Afektif (Perasaan)',
    icon: 'ShieldAlert',
    videoContent: {
      videoTitle: '🎬 Video Pembelajaran 3: Stereotipe (Kognitif) vs Prasangka (Afektif)',
      duration: '03:18',
      speaker: 'Anita Rahma S.Psi, M.Si (Pakar Sosiologi Komunitas)',
      summary: 'Analisis mendalam membedakan pelabelan kaku dalam pikiran (Stereotipe) dengan perasaan emosi negatif/bermusuhan (Prasangka).',
      videoScript: [
        'Di Modul 3 ini, kita belajar membedakan Stereotipe dan Prasangka.',
        'Banyak orang mengira keduanya sama, padahal domainnya berbeda!',
        'Stereotipe bekerja di domain KOGNITIF (Pikiran). Contohnya pelabelan kaku: "Orang dari daerah X pasti pelit" atau "Suku Y pasti konsumtif". Ini adalah generalisasi kaku dalam pemikiran.',
        'Sementara Prasangka bekerja di domain AFEKTIF (Perasaan). Ini adalah rasa tidak suka, curiga, atau benci secara emosional tanpa fakta objektif.'
      ],
      chapters: [
        { time: '00:00', title: 'Perbedaan Ranah Kognitif vs Afektif', desc: 'Pikiran (Stereotipe) vs Emosi (Prasangka)' },
        { time: '01:10', title: 'Anatomi Stereotipe', desc: 'Generalisasi dan Stigma Kaku' },
        { time: '02:05', title: 'Anatomi Prasangka & Diskriminasi', desc: 'Perasaan negatif hingga aksi membedakan' }
      ]
    },
    jurnalisContent: {
      heading: 'Membedakan Prasangka dan Stereotipe dalam Hubungan Antarkelompok',
      paragraphs: [
        'Dalam sosiologi multikultural, sangat penting membedakan antara Prasangka (Prejudice) dan Stereotipe (Stereotype) agar masyarakat tidak terjebak dalam prasangka sosial yang merusak keharmonisan.',
        'Prasangka (Prejudice) adalah sikap atau perasaan negatif/bermusuhan terhadap kelompok lain yang didasari oleh emosi tanpa adanya fakta atau pengalaman yang objektif (Domain Afektif/Perasaan).',
        'Stereotipe (Stereotype) adalah pelabelan, generalisasi kaku, atau citra konseptual yang menyederhanakan karakter seluruh anggota suatu kelompok (Domain Kognitif/Pikiran). Contohnya: menganggap suku tertentu pasti pelit, keras kepala, atau malas.',
      ],
      keyPoints: [
        'Stereotipe = Level Pikiran / Kognitif (Pelabelan / Citra kaku / Generalisasi kelompok).',
        'Prasangka = Level Perasaan / Afektif (Sikap bermusuhan / Benci tanpa fakta).',
        'Diskriminasi = Level Tindakan / Perilaku nyata (Aksi membedakan/memojokkan).',
      ],
    },
    fotograferContent: {
      headline: 'Matriks Visual: Stereotipe vs Prasangka',
      gridItems: [
        {
          title: 'STEREOTIPE',
          subtitle: 'Kognitif / Pikiran',
          colorBg: 'bg-amber-800 text-amber-50',
          textColor: 'text-amber-200',
          visualBadge: '🧠 Citra / Label',
          items: [
            'Pelabelan kaku pada kelompok',
            'Menyederhanakan karakter',
            'Contoh: "Suku X pasti keras kepala"',
            'Terjadi di ranah kognisi',
          ],
        },
        {
          title: 'PRASANGKA',
          subtitle: 'Afektif / Emosi',
          colorBg: 'bg-stone-900 text-amber-50',
          textColor: 'text-amber-300',
          visualBadge: '❤️ Sikap / Benci',
          items: [
            'Sikap bermusuhan tanpa fakta',
            'Sentimen emosional negatif',
            'Contoh: Rasa tidak suka secara tiba-tiba',
            'Terjadi di ranah afeksi/perasaan',
          ],
        },
      ],
    },
    petualangContent: {
      chestTitle: 'Peti Pengetahuan: Detektif Prasangka vs Stereotipe',
      chestIcon: 'BrainCircuit',
      secretKnowledge: [
        {
          title: '🧠 Kuis Cepat Kognitif: Stereotipe',
          content: 'Jika ada kalimat "Orang dari suku A pasti pandai berdagang" atau "Suku X pasti pelit", itu adalah STEREOTIPE karena itu adalah label/stigma dalam otak (kognitif).',
          badge: 'Label Otak',
        },
        {
          title: '💔 Kuis Cepat Afektif: Prasangka',
          content: 'Jika seseorang merasa benci atau curiga pada tetangga baru hanya karena ia berasal dari kelompok B tanpa mengenal perilakunya, itu adalah PRASANGKA (emosi/afektif).',
          badge: 'Rasa / Emosi',
        },
      ],
    },
  },
  {
    id: 'multikulturalisme',
    title: 'Modul 4: Multikulturalisme',
    subtitle: 'Ideologi Kebangsaan & Nilai Pendorong (H.A.R Tilaar)',
    icon: 'Users',
    videoContent: {
      videoTitle: '🎬 Video Pembelajaran 4: Indahnya Multikulturalisme & 3 Nilai H.A.R Tilaar',
      duration: '04:05',
      speaker: 'Drs. Hendra Utama (Pemerhati Budaya Nusantara)',
      summary: 'Dokumentasi harmoni Istiqlal-Katedral dan kupas tuntas 3 pendorong multikulturalisme: HAM, Globalisme, dan Demokratisasi.',
      videoScript: [
        'Selamat datang di Modul Puncak: Multikulturalisme!',
        'Multikulturalisme berbeda dari sekadar pluralisme. Multikulturalisme adalah ideologi yang menekankan KESEDERAJATAN dan penghormatan penuh terhadap hak-hak budaya.',
        'Menurut tokoh sosiologi pendidikan H.A.R Tilaar, ada 3 nilai pendorong utama: 1. Hak Asasi Manusia (HAM), 2. Globalisme (keterhubungan dunia), dan 3. Demokratisasi (kesetaraan hak warga negara).',
        'Contoh nyatanya adalah Masjid Istiqlal dan Gereja Katedral Jakarta yang berdiri berdampingan mesra dan saling berbagi lahan parkir saat perayaan hari besar.'
      ],
      chapters: [
        { time: '00:00', title: 'Multikulturalisme vs Pluralisme', desc: 'Prinsip utama kesederajatan hak budaya' },
        { time: '01:25', title: '3 Nilai Pendorong H.A.R Tilaar', desc: 'HAM, Globalisme, dan Demokratisasi' },
        { time: '02:40', title: 'Studi Kasus Harmoni Istiqlal-Katedral', desc: 'Simbol toleransi dan persaudaraan sejati' }
      ]
    },
    jurnalisContent: {
      heading: 'Multikulturalisme sebagai Puncak Ideologi Kesederajatan',
      paragraphs: [
        'Multikulturalisme bukan sekadar pluralisme atau keberadaan banyak budaya secara berdampingan. Multikulturalisme adalah ideologi paripurna yang menjunjung tinggi KESEDERAJATAN, keadilan, dan penghargaan hak-hak budaya dalam perbedaan.',
        'Menurut tokoh pendidikan dan sosiolog H.A.R Tilaar, terdapat 3 nilai utama yang menjadi pendorong berkembangnya multikulturalisme dalam masyarakat modern: 1. Hak Asasi Manusia (HAM), 2. Globalisme (keterhubungan dunia), dan 3. Demokratisasi (kesetaraan hak warga negara).',
      ],
      keyPoints: [
        'Multikulturalisme = Ideologi yang mengakui KESEDERAJATAN dalam perbedaan budaya.',
        'H.A.R Tilaar (3 Nilai Pendorong): Hak Asasi Manusia (HAM), Globalisme, Demokratisasi.',
        'Contoh Nyata: Masjid Istiqlal dan Gereja Katedral Jakarta saling berdampingan dan berbagi lahan parkir saat hari raya.',
      ],
    },
    fotograferContent: {
      headline: 'Pilar Utama Multikulturalisme Indonesia',
      gridItems: [
        {
          title: 'Prinsip Utama',
          subtitle: 'Kesederajatan Hak',
          colorBg: 'bg-emerald-900 text-amber-50',
          textColor: 'text-amber-200',
          visualBadge: '🕊️ Kesederajatan',
          items: [
            'Menghargai keberagaman',
            'Kesetaraan posisi hukum & sosial',
            'Saling toleransi dan kerjasama aktif',
          ],
        },
        {
          title: '3 Nilai H.A.R Tilaar',
          subtitle: 'Pendorong Multikulturalisme',
          colorBg: 'bg-amber-900 text-amber-50',
          textColor: 'text-amber-200',
          visualBadge: 'H.A.R Tilaar',
          items: [
            '1. Hak Asasi Manusia (HAM)',
            '2. Globalisme (Dunia Terhubung)',
            '3. Demokratisasi (Kesetaraan Warga)',
          ],
        },
      ],
    },
    petualangContent: {
      chestTitle: 'Peti Pengetahuan: Mahkota Multikulturalisme',
      chestIcon: 'Crown',
      secretKnowledge: [
        {
          title: '🕌 ⛪ Simbol Toleransi Ibu Kota',
          content: 'Masjid Istiqlal dan Gereja Katedral berdampingan mesra di Jakarta dan saling meminjamkan lahan parkir saat Idul Fitri maupun Natal. Ini bukti hidup ideologi Multikulturalisme!',
          badge: 'Contoh Nyata',
        },
        {
          title: '📜 Trinitas Nilai H.A.R Tilaar',
          content: 'Ingat 3 kata kunci pendorong multikulturalisme menurut H.A.R Tilaar: HAM, Globalisme, dan Demokratisasi!',
          badge: 'Kunci Ujian',
        },
      ],
    },
  },
];

// PERTANYAAN BUKTI BELAJAR (PRE-MISSION GATEWAY CHECK)
// Harus dijawab benar oleh siswa sebagai verifikasi bahwa mereka telah mempelajari materi di Kemah Belajar sebelum misi lapangan!
export const PRE_MISSION_QUESTIONS = [
  {
    id: 1,
    question: 'Apa acronim rumus cepat untuk mengingat 5 karakteristik gejala sosial (Kompleks, Dinamis, Tidak Universal, Kualitatif, Dihasilkan Manusia)?',
    options: [
      { key: 'A', text: 'KOMODO TADI', isCorrect: true },
      { key: 'B', text: 'PANCASILA INDONESIA', isCorrect: false },
      { key: 'C', text: 'BHINNEKA TUNGGAL IKA', isCorrect: false },
    ],
    explanation: 'Benar! KOMODO TADI adalah akronim cepat untuk mengingat: Kompleks, Dinamis, Tidak Universal, Dihasilkan manusia.',
    moduleReference: 'Modul 1: Gejala Sosial'
  },
  {
    id: 2,
    question: 'Menurut J. Nasikun, pembagian masyarakat secara horizontal/sejajar tanpa tingkatan (seperti suku bangsa, agama, dan ras) dinamakan...',
    options: [
      { key: 'A', text: 'Stratifikasi Sosial (Vertikal)', isCorrect: false },
      { key: 'B', text: 'Diferensiasi Sosial (Horizontal)', isCorrect: true },
      { key: 'C', text: 'Diskriminasi Sosial', isCorrect: false },
    ],
    explanation: 'Tepat sekali! Diferensiasi Sosial adalah dimensi horizontal di mana semua kelompok suku, agama, dan ras dianggap SEJAJAR.',
    moduleReference: 'Modul 2: Struktur Sosial'
  },
  {
    id: 3,
    question: 'Manakah pernyataan yang tepat mengenai perbedaan Stereotipe dan Prasangka?',
    options: [
      { key: 'A', text: 'Stereotipe pada ranah Kognitif (pikiran/label kaku), sedangkan Prasangka pada ranah Afektif (emosi/sikap)', isCorrect: true },
      { key: 'B', text: 'Stereotipe adalah tindakan nyata, sedangkan Prasangka adalah undang-undang', isCorrect: false },
      { key: 'C', text: 'Keduanya persis sama tanpa ada perbedaan domain', isCorrect: false },
    ],
    explanation: 'Hebat! Stereotipe adalah label dalam otak (kognitif), sedangkan Prasangka adalah sikap emosi negatif (afektif).',
    moduleReference: 'Modul 3: Prasangka & Stereotipe'
  },
  {
    id: 4,
    question: 'Menurut sosiolog H.A.R Tilaar, apakah 3 nilai pendorong berkembangnya ideologi Multikulturalisme?',
    options: [
      { key: 'A', text: 'Hak Asasi Manusia (HAM), Globalisme, dan Demokratisasi', isCorrect: true },
      { key: 'B', text: 'Etnosentrisme, Chauvinisme, dan Primordialisme', isCorrect: false },
      { key: 'C', text: 'Feodalisme, Militerisme, dan Otokrasi', isCorrect: false },
    ],
    explanation: 'Sempurna! 3 nilai pendorong menurut H.A.R Tilaar adalah HAM, Globalisme, dan Demokratisasi.',
    moduleReference: 'Modul 4: Multikulturalisme'
  }
];

export const EXPEDITION_POSTS: ExpeditionPost[] = [
  {
    id: 1,
    location: 'Terminal Jakarta',
    title: 'Pos 1: Fenomena Kemacetan Ibu Kota',
    description: 'Petualanganmu dimulai di ibu kota Jakarta yang sibuk.',
    scenario:
      'Kamu terjebak kemacetan panjang. Kemacetan ini melibatkan faktor gengsi beli mobil, regulasi jalan, dan ekonomi. Berdasarkan karakteristiknya, kemacetan ini membuktikan bahwa gejala sosial bersifat...',
    options: [
      { id: 'correct', text: 'Kompleks dan Dinamis', isCorrect: true },
      { id: 'wrong', text: 'Universal dan Statis', isCorrect: false },
    ],
    explanation: {
      correct:
        'Tepat sekali! Gejala sosial bersifat KOMPLEKS (melibatkan banyak faktor seperti ekonomi, gengsi, regulasi) dan DINAMIS (selalu berubah sesuai situasi). (Ingat rumus KOMODO TADI!)',
      wrong:
        'Kurang tepat! Gejala sosial tidak bersifat statis maupun universal, melainkan Kompleks dan Dinamis.',
    },
  },
  {
    id: 2,
    location: 'Jalur Pantura',
    title: 'Pos 2: Tradisi Mudik Lebaran',
    description: 'Perjalanan berlanjut menyusuri Jalur Pantai Utara Jawa.',
    scenario:
      'Saat Lebaran tiba, jutaan orang melakukan tradisi mudik secara nasional yang memicu perputaran ekonomi raksasa. Menurut Norman Blaikie, ini termasuk gejala sosial tingkat...',
    options: [
      { id: 'correct', text: 'Makro (Bersistem besar/Nasional)', isCorrect: true },
      { id: 'wrong', text: 'Mikro (Tatap muka)', isCorrect: false },
    ],
    explanation: {
      correct:
        'Luar biasa! Mudik Lebaran melibatkan pergerakan nasional berskala raksasa, sehingga menurut Norman Blaikie tergolong tingkat MAKRO.',
      wrong:
        'Masih keliru! Tingkat Mikro hanya mencakup interaksi tatap muka antarindividu. Mudik nasional adalah tingkat Makro.',
    },
  },
  {
    id: 3,
    location: 'Desa Toraja',
    title: 'Pos 3: Rumah Adat Tongkonan',
    description: 'Tiba di perbukitan indah Desa Adat Toraja, Sulawesi Selatan.',
    scenario:
      'Kamu melihat rumah adat Tongkonan. Semakin banyak tanduk kerbau yang dipajang di depannya, semakin tinggi status sosial keluarga tersebut. Konsep pelapisan masyarakat bertingkat ini disebut...',
    options: [
      { id: 'correct', text: 'Stratifikasi Sosial (Vertikal)', isCorrect: true },
      { id: 'wrong', text: 'Diferensiasi Sosial (Horizontal)', isCorrect: false },
    ],
    explanation: {
      correct:
        'Hebat! Pelapisan masyarakat secara hirarkis bertingkat (seperti jumlah tanduk kerbau yang menandai posisi atas/bawah) adalah Stratifikasi Sosial (Vertikal).',
      wrong:
        'Salah! Diferensiasi sosial bersifat horizontal/sejajar. Tanduk kerbau menandai tingkatan hierarki (Stratifikasi Sosial Vertikal).',
    },
  },
  {
    id: 4,
    location: 'Kafe di Bandung',
    title: 'Pos 4: Obrolan di Kota Kembang',
    description: 'Singgah sejenak di sebuah kafe santai di kota Bandung.',
    scenario:
      'Kamu mendengar seseorang berkata, "Ah, semua orang dari suku X itu pasti pelit dan keras kepala!". Pelabelan atau citra kaku yang menyederhanakan kelompok ini disebut...',
    options: [
      { id: 'correct', text: 'Stereotipe', isCorrect: true },
      { id: 'wrong', text: 'Prasangka', isCorrect: false },
    ],
    explanation: {
      correct:
        'Benar sekali! Pelabelan atau citra kaku pada ranah kognitif (pikiran) yang menyederhanakan karakter kelompok dinamakan STEREOTIPE.',
      wrong:
        'Hampir tepat, tapi Prasangka adalah ranah emosi/afektif. Sedangkan pelabelan kaku dalam pikiran adalah Stereotipe.',
    },
  },
  {
    id: 5,
    location: 'Jantung Ibu Kota',
    title: 'Pos 5: Simbol Kerukunan Bangsa',
    description: 'Pos Akhir di kawasan Istiqlal & Katedral Jakarta.',
    scenario:
      'Kamu melihat Masjid Istiqlal dan Gereja Katedral berdiri berdampingan secara damai dan saling berbagi lahan parkir. Hal ini mencerminkan puncak ideologi di mana masyarakat menjunjung kesederajatan di dalam perbedaan. Ideologi ini disebut...',
    options: [
      { id: 'correct', text: 'Multikulturalisme', isCorrect: true },
      { id: 'wrong', text: 'Etnosentrisme', isCorrect: false },
    ],
    explanation: {
      correct:
        'Sempurna! Ideologi yang menghargai dan menjunjung KESEDERAJATAN di dalam keberagaman budaya adalah Multikulturalisme!',
      wrong:
        'Salah! Etnosentrisme justru menganggap budayanya sendiri paling unggul. Jawaban yang tepat adalah Multikulturalisme.',
    },
  },
];
