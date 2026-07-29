import React, { useState, useEffect } from 'react';
import {
  StudentEvaluation,
  SociologyModule,
  DiagnosticQuestion,
  ExpeditionPost,
  ProfileType,
} from '../types';
import {
  SOCIOLOGY_MODULES as DEFAULT_MODULES,
  DIAGNOSTIC_QUESTIONS as DEFAULT_DIAGNOSTICS,
  EXPEDITION_POSTS as DEFAULT_POSTS,
} from '../data/sociologyData';
import { AVATARS, getAvatarById } from '../data/avatarData';
import { soundFx } from '../utils/audio';
import {
  subscribeStudents,
  saveStudentToFirestore,
  deleteStudentFromFirestore,
  saveModuleToFirestore,
  savePostToFirestore,
} from '../lib/firestoreService';
import {
  ShieldCheck,
  Users,
  BookOpen,
  FileSpreadsheet,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Award,
  Lock,
  Printer,
  Download,
  X,
  Sparkles,
  HelpCircle,
  Video,
  Eye,
  Activity,
  Headphones,
  Check,
} from 'lucide-react';

interface AdminDashboardProps {
  onCloseAdmin: () => void;
  activePlayerName?: string;
}

// Initial Mock Student Data for Teacher Demonstration
const INITIAL_STUDENTS: StudentEvaluation[] = [
  {
    id: 'std-1',
    studentName: 'Ahmad Budi Prasetyo',
    avatarId: 'rio',
    profileType: 'Jurnalis',
    pretestScore: 100,
    postsCompleted: 5,
    livesRemaining: 3,
    evalScore: 100,
    grade: 'A',
    status: 'Selesai',
    teacherNotes: 'Sangat menguasai analisis fakta sosial Durkheim & konsep KOMODO TADI.',
    updatedAt: '25/07/2026',
  },
  {
    id: 'std-[#2]',
    studentName: 'Siti Nurhaliza',
    avatarId: 'fiko',
    profileType: 'Fotografer',
    pretestScore: 100,
    postsCompleted: 4,
    livesRemaining: 2,
    evalScore: 80,
    grade: 'B',
    status: 'Sedang Belajar',
    teacherNotes: 'Paham pemetaan visual Nasikun, disarankan memperdalam pos stereotipe.',
    updatedAt: '25/07/2026',
  },
  {
    id: 'std-3',
    studentName: 'Rizky Petualang Utama',
    avatarId: 'bima',
    profileType: 'Petualang',
    pretestScore: 66,
    postsCompleted: 2,
    livesRemaining: 1,
    evalScore: 40,
    grade: 'Perlu Remedial',
    status: 'Remedial',
    teacherNotes: 'Memerlukan bimbingan ulang pada pilar Multikulturalisme Tilaar.',
    updatedAt: '24/07/2026',
  },
  {
    id: 'std-4',
    studentName: 'Dewi Ayu Pertiwi',
    avatarId: 'siti',
    profileType: 'Jurnalis',
    pretestScore: 100,
    postsCompleted: 5,
    livesRemaining: 3,
    evalScore: 95,
    grade: 'A',
    status: 'Selesai',
    teacherNotes: 'Hasil kerja memuaskan, sangat aktif mencatat resume jurnalistik.',
    updatedAt: '25/07/2026',
  },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onCloseAdmin, activePlayerName }) => {
  // Authentication State
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Main Tab State
  const [activeTab, setActiveTab] = useState<'students' | 'modules' | 'questions'>('students');

  // Student State
  const [students, setStudents] = useState<StudentEvaluation[]>(() => {
    const saved = localStorage.getItem('sosiologi_student_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_STUDENTS;
      }
    }
    return INITIAL_STUDENTS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Selesai' | 'Sedang Belajar' | 'Remedial'>('All');

  // Student Edit Modal
  const [selectedStudent, setSelectedStudent] = useState<StudentEvaluation | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  // New Student Form State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentAvatar, setNewStudentAvatar] = useState('rio');
  const [newStudentRole, setNewStudentRole] = useState<ProfileType>('Jurnalis');

  // Modules CRUD State
  const [modules, setModules] = useState<SociologyModule[]>(() => {
    const saved = localStorage.getItem('sosiologi_custom_modules');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return DEFAULT_MODULES; }
    }
    return DEFAULT_MODULES;
  });
  const [editingModule, setEditingModule] = useState<SociologyModule | null>(null);

  // Questions CRUD State
  const [expeditionPosts, setExpeditionPosts] = useState<ExpeditionPost[]>(() => {
    const saved = localStorage.getItem('sosiologi_custom_posts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return DEFAULT_POSTS; }
    }
    return DEFAULT_POSTS;
  });
  const [editingPost, setEditingPost] = useState<ExpeditionPost | null>(null);

  // Subscribe to Firestore for live student data
  useEffect(() => {
    const unsubscribe = subscribeStudents((data) => {
      setStudents(data);
    }, INITIAL_STUDENTS);

    return () => unsubscribe();
  }, []);

  // Save to LocalStorage whenever state changes as backup
  useEffect(() => {
    localStorage.setItem('sosiologi_student_records', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('sosiologi_custom_modules', JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem('sosiologi_custom_posts', JSON.stringify(expeditionPosts));
  }, [expeditionPosts]);

  // Auth Submit
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput.toLowerCase() === 'guru' || pinInput === '') {
      soundFx.playChestOpen();
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      soundFx.playClick();
      setAuthError('PIN Salah. Masukkan PIN 1234 atau tekan Buka Langsung.');
    }
  };

  // Student CRUD Functions
  const handleSaveStudentNotes = () => {
    if (!selectedStudent) return;
    soundFx.playClick();
    setStudents((prev) =>
      prev.map((s) => (s.id === selectedStudent.id ? selectedStudent : s))
    );
    saveStudentToFirestore(selectedStudent);
    setShowStudentModal(false);
    setSelectedStudent(null);
  };

  const handleResetStudentProgress = (id: string) => {
    soundFx.playClick();
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const updated = {
            ...s,
            postsCompleted: 0,
            livesRemaining: 3,
            evalScore: 0,
            grade: 'Perlu Remedial' as const,
            status: 'Sedang Belajar' as const,
            teacherNotes: 'Akses perbaikan/remedial diizinkan oleh guru.',
          };
          saveStudentToFirestore(updated);
          return updated;
        }
        return s;
      })
    );
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    soundFx.playChestOpen();
    const newEntry: StudentEvaluation = {
      id: `std-${Date.now()}`,
      studentName: newStudentName.trim(),
      avatarId: newStudentAvatar,
      profileType: newStudentRole,
      pretestScore: 100,
      postsCompleted: 0,
      livesRemaining: 3,
      evalScore: 0,
      grade: 'Perlu Remedial',
      status: 'Sedang Belajar',
      teacherNotes: 'Siswa baru ditambahkan oleh guru.',
      updatedAt: new Date().toLocaleDateString('id-ID'),
    };

    setStudents((prev) => [newEntry, ...prev]);
    saveStudentToFirestore(newEntry);
    setNewStudentName('');
    setShowAddStudentModal(false);
  };

  const handleDeleteStudent = (id: string) => {
    soundFx.playClick();
    setStudents((prev) => prev.filter((s) => s.id !== id));
    deleteStudentFromFirestore(id);
  };

  const handleExportCSV = () => {
    soundFx.playClick();
    const headers = ['ID', 'Nama Siswa', 'Gaya Belajar', 'Nilai Pretest', 'Pos Selesai', 'Skor Akhir', 'Grade', 'Status', 'Catatan Guru'];
    const rows = students.map((s) => [
      s.id,
      `"${s.studentName}"`,
      s.profileType,
      s.pretestScore,
      `${s.postsCompleted}/5`,
      s.evalScore,
      s.grade,
      s.status,
      `"${s.teacherNotes}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Evaluasi_Siswa_Sosiologi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Students
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#ebd2b0] rounded-3xl border-4 border-[#8c5a3c] p-4 md:p-8 shadow-2xl my-4 text-[#2b1810] space-y-6 relative">
      {/* Parchment Corner Accents */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#8c5a3c]"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#8c5a3c]"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#8c5a3c]"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#8c5a3c]"></div>

      {/* LOGIN MODAL PIN GATEWAY */}
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto my-12 bg-[#faf3e0] p-6 md:p-8 rounded-3xl border-4 border-[#8c5a3c] shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-[#5c3a28] text-amber-300 border-2 border-amber-500/50 flex items-center justify-center mx-auto shadow-xl">
            <ShieldCheck className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-[#3d261a]">
              Portal Dashboard Guru / Admin
            </h3>
            <p className="text-xs md:text-sm text-stone-700 font-medium mt-1">
              Kelola Materi Pembelajaran, Edit Soal Evaluasi, dan Pantau Perkembangan Siswa secara Realtime.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-[#3d261a] flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-800" />
                Masukkan PIN Admin Guru (Default: 1234):
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Ketik PIN 1234 atau biarkan kosong..."
                className="w-full px-4 py-3 rounded-xl border-2 border-[#8c5a3c] bg-[#fcf8ef] text-center font-mono font-bold text-lg focus:outline-none focus:border-emerald-800"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-800 font-bold bg-red-100 p-2 rounded-lg border border-red-300">
                ⚠️ {authError}
              </p>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCloseAdmin}
                className="flex-1 py-3 bg-stone-300 hover:bg-stone-400 text-stone-900 rounded-xl font-bold text-xs shadow"
              >
                Kembali ke Game
              </button>

              <button
                type="submit"
                className="flex-1 py-3 bg-[#214a36] hover:bg-[#2a5d44] text-amber-100 rounded-xl font-bold text-xs shadow-lg border border-emerald-500/50"
              >
                Buka Dashboard Guru 🔓
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* AUTHENTICATED DASHBOARD CONTENT */
        <div className="space-y-6">
          {/* Top Admin Header */}
          <div className="bg-[#2b1810] text-amber-100 p-5 rounded-2xl border-2 border-amber-600/40 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-inner shrink-0">
                <ShieldCheck className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-200 leading-tight">
                  Dashboard Evaluasi Guru & Pengontrol Siswa
                </h2>
                <p className="text-xs text-amber-300/80 font-medium">
                  Sosiologi Multikultural SMA • Kurikulum Merdeka
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-amber-100 rounded-xl text-xs font-bold border border-emerald-500/50 flex items-center gap-1.5 shadow"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Export CSV Rekap</span>
              </button>

              <button
                onClick={onCloseAdmin}
                className="px-3.5 py-2 bg-red-900/80 hover:bg-red-800 text-amber-100 rounded-xl text-xs font-bold border border-red-500/40 flex items-center gap-1.5 shadow"
              >
                <X className="w-4 h-4" />
                <span>Tutup Dashboard</span>
              </button>
            </div>
          </div>

          {/* KPI Analytics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#fcf8ef] p-4 rounded-2xl border-2 border-[#b89b72] shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-800" /> Total Siswa
              </span>
              <span className="text-2xl font-serif font-black text-[#3d261a]">
                {students.length} Siswa
              </span>
              <span className="text-[10px] text-emerald-800 font-bold block">✓ Terdaftar di Kelas</span>
            </div>

            <div className="bg-[#fcf8ef] p-4 rounded-2xl border-2 border-[#b89b72] shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-800" /> Rata-Rata Nilai
              </span>
              <span className="text-2xl font-serif font-black text-emerald-900">
                {Math.round(students.reduce((acc, s) => acc + s.evalScore, 0) / (students.length || 1))} / 100
              </span>
              <span className="text-[10px] text-stone-600 block">Evaluasi Pos Ekspedisi</span>
            </div>

            <div className="bg-[#fcf8ef] p-4 rounded-2xl border-2 border-[#b89b72] shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> Tuntas Ekspedisi
              </span>
              <span className="text-2xl font-serif font-black text-blue-950">
                {students.filter((s) => s.postsCompleted === 5).length} Siswa
              </span>
              <span className="text-[10px] text-blue-800 font-bold block">Telah Lulus Pos 1-5</span>
            </div>

            <div className="bg-[#fcf8ef] p-4 rounded-2xl border-2 border-[#b89b72] shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-red-800" /> Perlu Remedial
              </span>
              <span className="text-2xl font-serif font-black text-red-900">
                {students.filter((s) => s.status === 'Remedial').length} Siswa
              </span>
              <span className="text-[10px] text-red-800 font-bold block">Butuh Pendampingan Guru</span>
            </div>
          </div>

          {/* Navigation Main Tabs */}
          <div className="flex border-b-2 border-[#a67c52] gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('students');
              }}
              className={`px-5 py-3 font-serif font-bold text-sm rounded-t-2xl border-2 border-b-0 transition flex items-center gap-2 ${
                activeTab === 'students'
                  ? 'bg-[#214a36] text-amber-100 border-[#10291d] shadow-lg'
                  : 'bg-[#ebd2b0] text-[#3d261a] border-[#b89b72] hover:bg-[#e2c5a0]'
              }`}
            >
              <Users className="w-4 h-4 text-amber-300" />
              <span>1. Rekapitulasi & Kontrol Siswa ({students.length})</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('modules');
              }}
              className={`px-5 py-3 font-serif font-bold text-sm rounded-t-2xl border-2 border-b-0 transition flex items-center gap-2 ${
                activeTab === 'modules'
                  ? 'bg-[#214a36] text-amber-100 border-[#10291d] shadow-lg'
                  : 'bg-[#ebd2b0] text-[#3d261a] border-[#b89b72] hover:bg-[#e2c5a0]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>2. Kelola Materi Pembelajaran (CRUD)</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('questions');
              }}
              className={`px-5 py-3 font-serif font-bold text-sm rounded-t-2xl border-2 border-b-0 transition flex items-center gap-2 ${
                activeTab === 'questions'
                  ? 'bg-[#214a36] text-amber-100 border-[#10291d] shadow-lg'
                  : 'bg-[#ebd2b0] text-[#3d261a] border-[#b89b72] hover:bg-[#e2c5a0]'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span>3. Kelola Soal & Pos Evaluasi</span>
            </button>
          </div>

          {/* TAB 1: STUDENT EVALUATION & PROGRESS CONTROL */}
          {activeTab === 'students' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Controls Bar: Search, Filter, Add Student */}
              <div className="bg-[#faf3e0] p-4 rounded-2xl border-2 border-[#b89b72] flex flex-col md:flex-row justify-between items-center gap-3 shadow-sm">
                <div className="flex items-center gap-2 w-full md:w-auto flex-1">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama siswa..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#8c5a3c] bg-[#fcf8ef] text-xs font-semibold focus:outline-none focus:border-emerald-800"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e: any) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-[#8c5a3c] bg-[#fcf8ef] text-xs font-bold text-stone-800"
                  >
                    <option value="All">Semua Status</option>
                    <option value="Selesai">Tuntas Selesai</option>
                    <option value="Sedang Belajar">Sedang Belajar</option>
                    <option value="Remedial">Remedial</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    setShowAddStudentModal(true);
                  }}
                  className="w-full md:w-auto px-4 py-2 bg-[#214a36] hover:bg-[#2a5d44] text-amber-100 font-bold text-xs rounded-xl shadow border border-emerald-500/50 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Tambah Data Siswa Baru</span>
                </button>
              </div>

              {/* Student Roster Table */}
              <div className="bg-[#fcf8ef] rounded-2xl border-2 border-[#b89b72] overflow-x-auto shadow-md">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#5c3a28] text-amber-100 font-serif border-b-2 border-[#8c5a3c]">
                      <th className="p-3">Siswa & Hero Avatar</th>
                      <th className="p-3">Gaya Belajar (RPG Class)</th>
                      <th className="p-3 text-center">Pretest Score</th>
                      <th className="p-3 text-center">Progres Pos</th>
                      <th className="p-3 text-center">Skor Evaluasi</th>
                      <th className="p-3 text-center">Grade</th>
                      <th className="p-3">Catatan Evaluasi Guru</th>
                      <th className="p-3 text-center">Aksi Guru</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ebd2b0]">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-stone-600 font-medium italic">
                          Tidak ditemukan data siswa yang cocok dengan pencarian.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((std) => {
                        const avatar = getAvatarById(std.avatarId);
                        return (
                          <tr key={std.id} className="hover:bg-[#f5eedb] transition">
                            <td className="p-3 font-bold text-[#3d261a]">
                              <div className="flex items-center gap-2.5">
                                <span className="text-2xl">{avatar.emoji}</span>
                                <div>
                                  <span className="block text-sm font-serif">{std.studentName}</span>
                                  <span className="text-[10px] text-stone-500 font-normal">
                                    Hero: {avatar.name}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="p-3 font-semibold">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-bold bg-[#ebd2b0] text-amber-950 border-[#b89b72]">
                                {std.profileType === 'Jurnalis' && '🗞️ Auditori (Jurnalis)'}
                                {std.profileType === 'Fotografer' && '📸 Visual (Fotografer)'}
                                {std.profileType === 'Petualang' && '🧭 Kinestetik (Petualang)'}
                              </span>
                            </td>

                            <td className="p-3 text-center font-bold text-emerald-900 font-mono">
                              {std.pretestScore} / 100
                            </td>

                            <td className="p-3 text-center">
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-200 text-amber-950 border border-amber-400">
                                {std.postsCompleted} / 5 Pos
                              </span>
                            </td>

                            <td className="p-3 text-center font-mono font-bold text-sm text-[#3d261a]">
                              {std.evalScore}
                            </td>

                            <td className="p-3 text-center">
                              <span
                                className={`px-2.5 py-1 rounded-lg font-black text-xs border ${
                                  std.grade === 'A'
                                    ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                                    : std.grade === 'B'
                                    ? 'bg-blue-100 text-blue-900 border-blue-400'
                                    : 'bg-red-100 text-red-900 border-red-400'
                                }`}
                              >
                                Grade {std.grade}
                              </span>
                            </td>

                            <td className="p-3 text-stone-700 italic max-w-xs text-[11px]">
                              "{std.teacherNotes}"
                            </td>

                            <td className="p-3 text-center space-x-1">
                              <button
                                onClick={() => {
                                  soundFx.playClick();
                                  setSelectedStudent(std);
                                  setShowStudentModal(true);
                                }}
                                className="p-1.5 bg-[#214a36] hover:bg-[#2a5d44] text-amber-100 rounded-lg shadow"
                                title="Edit Catatan & Nilai Guru"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleResetStudentProgress(std.id)}
                                className="p-1.5 bg-amber-700 hover:bg-amber-800 text-amber-100 rounded-lg shadow"
                                title="Reset Progres (Izinkan Remedial)"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDeleteStudent(std.id)}
                                className="p-1.5 bg-red-800 hover:bg-red-900 text-white rounded-lg shadow"
                                title="Hapus Siswa"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SOCIOLOGY MODULES CRUD */}
          {activeTab === 'modules' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-[#faf3e0] rounded-2xl border-2 border-[#b89b72] flex justify-between items-center">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#3d261a]">
                    Manajemen Modul Pembelajaran Sosiologi ({modules.length} Modul)
                  </h4>
                  <p className="text-xs text-stone-600">
                    Edit rangkuman teks, konten audio/video, infografis visual, dan peti pengetahuan secara fleksibel.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules.map((mod) => (
                  <div
                    key={mod.id}
                    className="bg-[#fcf8ef] p-5 rounded-2xl border-2 border-[#b89b72] shadow-sm space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="px-2.5 py-0.5 bg-[#5c3a28] text-amber-200 text-[10px] font-bold rounded-full border border-amber-600/40">
                          {mod.id}
                        </span>
                        <span className="text-xs font-mono text-stone-500">
                          Video: {mod.videoContent.duration} Min
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-base text-[#3d261a]">{mod.title}</h4>
                      <p className="text-xs text-stone-600 font-medium">{mod.subtitle}</p>

                      <div className="p-3 bg-[#ebd2b0] rounded-xl text-xs space-y-1 text-stone-900 border border-[#b89b72]">
                        <span className="font-bold block text-emerald-950">
                          {mod.videoContent.videoTitle}
                        </span>
                        <p className="text-[11px] text-stone-700 italic">
                          "{mod.videoContent.summary}"
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setEditingModule(mod);
                      }}
                      className="w-full py-2.5 bg-[#214a36] hover:bg-[#2a5d44] text-amber-100 font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                      <span>Edit Isi Modul Ini</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: QUESTIONS & EXPEDITION POSTS CRUD */}
          {activeTab === 'questions' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-[#faf3e0] rounded-2xl border-2 border-[#b89b72]">
                <h4 className="font-serif font-bold text-base text-[#3d261a]">
                  Daftar 5 Pos Ekspedisi Sosiologi Multikultural
                </h4>
                <p className="text-xs text-stone-600">
                  Guru dapat mengubah lokasi studi kasus, scenario narasi, pilihan jawaban benar/salah, serta penjelasan umpan balik.
                </p>
              </div>

              <div className="space-y-3">
                {expeditionPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#fcf8ef] p-4 rounded-2xl border-2 border-[#b89b72] shadow-sm space-y-2"
                  >
                    <div className="flex justify-between items-center border-b border-[#b89b72] pb-2">
                      <span className="font-serif font-bold text-sm text-[#3d261a] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#5c3a28] text-amber-200 flex items-center justify-center text-xs font-mono">
                          {post.id}
                        </span>
                        {post.title} ({post.location})
                      </span>

                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setEditingPost(post);
                        }}
                        className="px-3 py-1 bg-[#214a36] text-amber-100 hover:bg-[#2a5d44] rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" /> Edit Pos Ini
                      </button>
                    </div>

                    <p className="text-xs text-stone-800 font-medium leading-relaxed">
                      📜 <strong>Scenario:</strong> "{post.scenario}"
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-950 font-semibold">
                        ✓ Correct: {post.options.find((o) => o.isCorrect)?.text}
                      </div>
                      <div className="p-2 bg-red-50 border border-red-300 rounded-lg text-red-950 font-semibold">
                        ✗ Wrong: {post.options.find((o) => !o.isCorrect)?.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* EDIT STUDENT NOTES MODAL */}
      {showStudentModal && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#faf3e0] text-[#2b1810] rounded-3xl border-4 border-[#8c5a3c] p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#3d261a] border-b border-[#b89b72] pb-2">
              Evaluasi & Catatan Guru: {selectedStudent.studentName}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Skor Evaluasi (0 - 100):</label>
                <input
                  type="number"
                  value={selectedStudent.evalScore}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      evalScore: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#8c5a3c] bg-[#fcf8ef] font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Grade Akhir Sosiologi:</label>
                <select
                  value={selectedStudent.grade}
                  onChange={(e: any) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      grade: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#8c5a3c] bg-[#fcf8ef] font-bold"
                >
                  <option value="A">Grade A (Istimewa)</option>
                  <option value="B">Grade B (Baik)</option>
                  <option value="C">Grade C (Cukup)</option>
                  <option value="Perlu Remedial">Perlu Remedial</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Catatan Evaluasi Guru:</label>
                <textarea
                  rows={3}
                  value={selectedStudent.teacherNotes}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      teacherNotes: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#8c5a3c] bg-[#fcf8ef] font-medium"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowStudentModal(false)}
                className="px-4 py-2 bg-stone-300 rounded-xl text-xs font-bold"
              >
                Batal
              </button>
              <button
                onClick={handleSaveStudentNotes}
                className="px-5 py-2 bg-[#214a36] text-amber-100 rounded-xl text-xs font-bold shadow"
              >
                Simpan Evaluasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD STUDENT MODAL */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateStudent}
            className="bg-[#faf3e0] text-[#2b1810] rounded-3xl border-4 border-[#8c5a3c] p-6 max-w-md w-full shadow-2xl space-y-4"
          >
            <h3 className="text-lg font-serif font-bold text-[#3d261a] border-b border-[#b89b72] pb-2">
              ➕ Tambah Data Siswa Baru Manual
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nama Lengkap Siswa:</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Ketik nama siswa..."
                  className="w-full px-3 py-2 rounded-xl border border-[#8c5a3c] bg-[#fcf8ef] font-semibold"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Gaya Belajar (RPG Class):</label>
                <select
                  value={newStudentRole}
                  onChange={(e: any) => setNewStudentRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#8c5a3c] bg-[#fcf8ef] font-bold"
                >
                  <option value="Jurnalis">Jurnalis (Auditori & Teks)</option>
                  <option value="Fotografer">Fotografer (Visual & Diagram)</option>
                  <option value="Petualang">Petualang (Kinestetik & Aksi)</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Pilih Avatar Hero:</label>
                <div className="grid grid-cols-3 gap-2">
                  {AVATARS.map((av) => (
                    <button
                      type="button"
                      key={av.id}
                      onClick={() => setNewStudentAvatar(av.id)}
                      className={`p-2 rounded-xl border text-center font-bold text-xs ${
                        newStudentAvatar === av.id
                          ? 'bg-[#214a36] text-amber-100 border-amber-400'
                          : 'bg-[#fcf8ef] text-stone-800'
                      }`}
                    >
                      <span className="text-xl block">{av.emoji}</span>
                      <span className="text-[10px] line-clamp-1">{av.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddStudentModal(false)}
                className="px-4 py-2 bg-stone-300 rounded-xl text-xs font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#214a36] text-amber-100 rounded-xl text-xs font-bold shadow"
              >
                Simpan Siswa
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT MODULE MODAL */}
      {editingModule && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#faf3e0] text-[#2b1810] rounded-3xl border-4 border-[#8c5a3c] p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <h3 className="text-lg font-serif font-bold text-[#3d261a] border-b border-[#b89b72] pb-2">
              Edit Modul Pembelajaran: {editingModule.title}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Judul Subtitle Modul:</label>
                <input
                  type="text"
                  value={editingModule.subtitle}
                  onChange={(e) =>
                    setEditingModule({
                      ...editingModule,
                      subtitle: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#8c5a3c] bg-[#fcf8ef] font-semibold"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Judul Video Pembelajaran:</label>
                <input
                  type="text"
                  value={editingModule.videoContent.videoTitle}
                  onChange={(e) =>
                    setEditingModule({
                      ...editingModule,
                      videoContent: {
                        ...editingModule.videoContent,
                        videoTitle: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#8c5a3c] bg-[#fcf8ef] font-semibold"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Rangkuman Singkat Video:</label>
                <textarea
                  rows={2}
                  value={editingModule.videoContent.summary}
                  onChange={(e) =>
                    setEditingModule({
                      ...editingModule,
                      videoContent: {
                        ...editingModule.videoContent,
                        summary: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#8c5a3c] bg-[#fcf8ef] font-medium"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingModule(null)}
                className="px-4 py-2 bg-stone-300 rounded-xl text-xs font-bold"
              >
                Batal
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setModules((prev) =>
                    prev.map((m) => (m.id === editingModule.id ? editingModule : m))
                  );
                  saveModuleToFirestore(editingModule);
                  setEditingModule(null);
                }}
                className="px-5 py-2 bg-[#214a36] text-amber-100 rounded-xl text-xs font-bold shadow"
              >
                Simpan Modul
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT POST SCENARIO MODAL */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#faf3e0] text-[#2b1810] rounded-3xl border-4 border-[#8c5a3c] p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#3d261a] border-b border-[#b89b72] pb-2">
              Edit Pos Ekspedisi {editingPost.id}: {editingPost.title}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Lokasi:</label>
                <input
                  type="text"
                  value={editingPost.location}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#8c5a3c] bg-[#fcf8ef] font-semibold"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Scenario Pertanyaan Kasus:</label>
                <textarea
                  rows={3}
                  value={editingPost.scenario}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      scenario: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#8c5a3c] bg-[#fcf8ef] font-medium"
                ></textarea>
              </div>

              <div>
                <label className="font-bold block mb-1">Pilihan Jawaban Benar:</label>
                <input
                  type="text"
                  value={editingPost.options.find((o) => o.isCorrect)?.text || ''}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      options: editingPost.options.map((o) =>
                        o.isCorrect ? { ...o, text: e.target.value } : o
                      ),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Pilihan Jawaban Salah:</label>
                <input
                  type="text"
                  value={editingPost.options.find((o) => !o.isCorrect)?.text || ''}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      options: editingPost.options.map((o) =>
                        !o.isCorrect ? { ...o, text: e.target.value } : o
                      ),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-red-400 bg-red-50 text-red-950 font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 bg-stone-300 rounded-xl text-xs font-bold"
              >
                Batal
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setExpeditionPosts((prev) =>
                    prev.map((p) => (p.id === editingPost.id ? editingPost : p))
                  );
                  savePostToFirestore(editingPost);
                  setEditingPost(null);
                }}
                className="px-5 py-2 bg-[#214a36] text-amber-100 rounded-xl text-xs font-bold shadow"
              >
                Simpan Pertanyaan Pos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
