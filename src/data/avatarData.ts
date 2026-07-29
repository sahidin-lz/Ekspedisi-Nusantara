import { AvatarConfig, ProfileType } from '../types';

export const AVATARS: AvatarConfig[] = [
  {
    id: 'rio',
    name: 'Rio Penjelajah Cerdas',
    role: 'Jurnalis',
    emoji: '🕵️‍♂️',
    bgGradient: 'from-amber-600 to-yellow-500',
    badge: 'Detektif Muda',
    specialSkill: '📰 Analisis Catatan Kritis',
    skillDesc: 'Membuka poin rangkuman dan poin kunci materi sosiologi.',
    quote: 'Fakta sosiologis harus diteliti secara teliti dan bijaksana!',
    accessories: ['Pena Emas ✒️', 'Buku Catatan 📓', 'Kacamata Cerdas 👓']
  },
  {
    id: 'siti',
    name: 'Siti Warta Cerdas',
    role: 'Jurnalis',
    emoji: '🕵️‍♀️',
    bgGradient: 'from-[#8c5a3c] to-[#d4a373]',
    badge: 'Penyiar Antusias',
    specialSkill: '🎙️ Wawancara Mendalam',
    skillDesc: 'Mendengarkan analisis narasi untuk petunjuk pos.',
    quote: 'Suara masyarakat adalah kunci memahami keberagaman Indonesia!',
    accessories: ['Mikrofon Pers 🎙️', 'Topi Detektif 🎩', 'Buku Resensi 📚']
  },
  {
    id: 'fiko',
    name: 'Fiko Lensa Visual',
    role: 'Fotografer',
    emoji: '📸',
    bgGradient: 'from-emerald-600 to-teal-500',
    badge: 'Lensa Kreatif',
    specialSkill: '📷 Pemindai Lensa Infografis',
    skillDesc: 'Menampilkan diagram visual mindmap perbandingan dua kelompok.',
    quote: 'Satu foto sosiologis bermakna seribu kata toleransi!',
    accessories: ['Kamera DSLR 📷', 'Topi Safari 🧢', 'Lensa Telephoto 🔍']
  },
  {
    id: 'maya',
    name: 'Maya Dokumenter Alam',
    role: 'Fotografer',
    emoji: '🖼️',
    bgGradient: 'from-cyan-600 to-blue-500',
    badge: 'Seniman Visual',
    specialSkill: '🎨 Panorama Multikultural',
    skillDesc: 'Sorotan diagram warna-warni untuk membedakan stratifikasi & diferensiasi.',
    quote: 'Keindahan Indonesia terletak pada mozaik ragam budayanya!',
    accessories: ['Kamera Instant 📸', 'Galeri Foto 🎨', 'Album Budaya 🗂️']
  },
  {
    id: 'bima',
    name: 'Bima Ranger Nusantara',
    role: 'Petualang',
    emoji: '🤠',
    bgGradient: 'from-amber-700 to-orange-600',
    badge: 'Ranger Pemberani',
    specialSkill: '🧭 Kompas Lapangan Ajaib',
    skillDesc: 'Menghapus 1 pilihan jawaban keliru di pos ekspedisi.',
    quote: 'Mari jelajahi setiap sudut budaya Indonesia dari Sabang sampai Merauke!',
    accessories: ['Kompas Emas 🧭', 'Ransel Ekspedisi 🎒', 'Obor Penjelajah 🕯️']
  },
  {
    id: 'tara',
    name: 'Tara Penjelajah Rimba',
    role: 'Petualang',
    emoji: '🧗‍♀️',
    bgGradient: 'from-[#5c3a28] to-[#8c5a3c]',
    badge: 'Penjelajah Tangguh',
    specialSkill: '🔑 Kunci Peti Rahasia',
    skillDesc: 'Buka peti rahasia pengetahuan kinestetik secara instan.',
    quote: 'Aksi nyata di lapangan adalah cara terbaik membuktikan ilmu!',
    accessories: ['Tali Panjat 🪢', 'Peta Kuno 🗺️', 'Sepatu Boot 🥾']
  }
];

export const getAvatarById = (id: string): AvatarConfig => {
  return AVATARS.find((a) => a.id === id) || AVATARS[0];
};

export const getAvatarsByRole = (role: ProfileType): AvatarConfig[] => {
  return AVATARS.filter((a) => a.role === role);
};
