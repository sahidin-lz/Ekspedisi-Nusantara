export function generateSingleFileHTML(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ekspedisi Nusantara: Sosiologi Multikultural</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cinzel:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #f5f0e6;
      color: #2c221e;
    }
    .font-cinzel {
      font-family: 'Cinzel', serif;
    }
    .bg-earth-dark { background-color: #3d261a; }
    .bg-earth-primary { background-color: #5c3d2e; }
    .bg-earth-light { background-color: #784b31; }
    .bg-leaf-dark { background-color: #1e3f24; }
    .bg-leaf-primary { background-color: #2d6a4f; }
    .bg-leaf-light { background-color: #40916c; }
    .bg-beige-light { background-color: #faf7f0; }
    .bg-beige-card { background-color: #f0e6d2; }
    .border-earth { border-color: #b5838d; }
    .text-earth-dark { color: #3d261a; }
    .text-leaf-dark { color: #1e3f24; }
    
    .card-adventure {
      background: #ffffff;
      border: 2px solid #d4a373;
      border-radius: 16px;
      box-shadow: 0 8px 20px -4px rgba(61, 38, 26, 0.12);
    }
    .btn-primary {
      background: linear-gradient(135deg, #2d6a4f 0%, #1e3f24 100%);
      color: #faf7f0;
      transition: all 0.2s ease;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(45, 106, 79, 0.35);
    }
    .btn-secondary {
      background: linear-gradient(135deg, #784b31 0%, #5c3d2e 100%);
      color: #faf7f0;
      transition: all 0.2s ease;
    }
    .btn-secondary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(120, 75, 49, 0.35);
    }
  </style>
</head>
<body class="min-h-screen pb-12">
  <div id="game-container" class="max-w-5xl mx-auto px-4 py-6">
    <!-- Header -->
    <header class="bg-earth-dark text-amber-100 rounded-2xl p-6 mb-6 border-2 border-amber-600/30 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full bg-amber-600/20 border-2 border-amber-500/50 flex items-center justify-center text-2xl">
          🧭
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-cinzel font-bold text-amber-200">Ekspedisi Nusantara</h1>
          <p class="text-xs md:text-sm text-amber-300/80">Game Edukasi Sosiologi Multikultural • Kurikulum Merdeka</p>
        </div>
      </div>
      <div id="player-badge-container" class="hidden flex items-center gap-2 bg-amber-900/60 px-4 py-2 rounded-xl border border-amber-500/30">
        <span id="player-name-display" class="font-semibold text-amber-100"></span>
        <span id="player-type-badge" class="px-2 py-0.5 rounded text-xs font-bold uppercase"></span>
      </div>
    </header>

    <!-- LAYAR 1: ASESMEN DIAGNOSTIK -->
    <div id="screen-1" class="card-adventure p-6 md:p-8">
      <div class="text-center max-w-2xl mx-auto mb-8">
        <span class="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-semibold text-xs rounded-full mb-3 border border-amber-300">
          Layar 1: Asesmen Diagnostik (5 Menit)
        </span>
        <h2 class="text-2xl md:text-3xl font-cinzel font-bold text-earth-dark mb-2">Selamat Datang Penjelajah Sosiologi!</h2>
        <p class="text-stone-600 text-sm md:text-base">
          Sebelum memulai ekspedisi menjelajahi realitas multikultural Indonesia, mari ketahui gaya belajar penjelajahmu melalui 3 pertanyaan diagnostik cepat berikut.
        </p>
      </div>

      <form id="diagnostic-form" onsubmit="handleDiagnosticSubmit(event)" class="space-y-6 max-w-2xl mx-auto">
        <div>
          <label class="block font-bold text-stone-800 mb-2">Nama Penjelajah:</label>
          <input type="text" id="player-name-input" required placeholder="Masukkan nama lengkapmu..." class="w-full px-4 py-3 rounded-xl border-2 border-stone-300 focus:border-emerald-600 focus:outline-none bg-stone-50 text-stone-900 font-medium">
        </div>

        <!-- Question 1 -->
        <div class="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80">
          <p class="font-semibold text-stone-800 mb-3">1. Saat tersesat di kota baru, apa yang kamu lakukan?</p>
          <div class="space-y-2">
            <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-emerald-500 cursor-pointer transition">
              <input type="radio" name="q1" value="A" required class="accent-emerald-700">
              <span class="text-sm text-stone-700">A. Membaca peta/petunjuk arah tertulis</span>
            </label>
            <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-emerald-500 cursor-pointer transition">
              <input type="radio" name="q1" value="B" class="accent-emerald-700">
              <span class="text-sm text-stone-700">B. Mengamati bentuk bangunan atau landmark</span>
            </label>
            <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-emerald-500 cursor-pointer transition">
              <input type="radio" name="q1" value="C" class="accent-emerald-700">
              <span class="text-sm text-stone-700">C. Terus berjalan dan bertanya langsung pada warga</span>
            </label>
          </div>
        </div>

        <!-- Question 2 -->
        <div class="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80">
          <p class="font-semibold text-stone-800 mb-3">2. Bagaimana caramu paling cepat mengingat materi sekolah?</p>
          <div class="space-y-2">
            <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-emerald-500 cursor-pointer transition">
              <input type="radio" name="q2" value="A" required class="accent-emerald-700">
              <span class="text-sm text-stone-700">A. Membaca catatan/buku berulang kali</span>
            </label>
            <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-emerald-500 cursor-pointer transition">
              <input type="radio" name="q2" value="B" class="accent-emerald-700">
              <span class="text-sm text-stone-700">B. Membuat mind-map atau bagan warna-warni</span>
            </label>
            <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-emerald-500 cursor-pointer transition">
              <input type="radio" name="q2" value="C" class="accent-emerald-700">
              <span class="text-sm text-stone-700">C. Mempraktikkannya atau berdiskusi sambil bergerak</span>
            </label>
          </div>
        </div>

        <!-- Question 3 -->
        <div class="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80">
          <p class="font-semibold text-stone-800 mb-3">3. Bentuk laporan ekspedisi seperti apa yang paling kamu suka buat?</p>
          <div class="space-y-2">
            <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-emerald-500 cursor-pointer transition">
              <input type="radio" name="q3" value="A" required class="accent-emerald-700">
              <span class="text-sm text-stone-700">A. Artikel jurnalistik yang detail</span>
            </label>
            <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-emerald-500 cursor-pointer transition">
              <input type="radio" name="q3" value="B" class="accent-emerald-700">
              <span class="text-sm text-stone-700">B. Jurnal foto/video dokumenter</span>
            </label>
            <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-emerald-500 cursor-pointer transition">
              <input type="radio" name="q3" value="C" class="accent-emerald-700">
              <span class="text-sm text-stone-700">C. Presentasi interaktif di depan kelas</span>
            </label>
          </div>
        </div>

        <button type="submit" class="w-full py-4 btn-primary rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2">
          <span>Mulai Ekspedisi</span>
          <span>➔</span>
        </button>
      </form>
    </div>

    <!-- LAYAR 2: KEMAH BELAJAR -->
    <div id="screen-2" class="hidden card-adventure p-6 md:p-8">
      <div class="bg-amber-100/80 border-2 border-amber-300 rounded-2xl p-6 mb-8 text-earth-dark">
        <h2 class="text-2xl font-cinzel font-bold mb-1">
          Selamat datang di Kemah Belajar, <span id="camp-player-name" class="text-emerald-800"></span>!
        </h2>
        <p class="text-stone-700 font-medium">
          Sebagai seorang <span id="camp-player-type" class="font-bold underline decoration-amber-500 decoration-2"></span>, ini adalah panduan ekspedisimu yang disesuaikan khusus dengan gaya belajar terbaikmu.
        </p>
      </div>

      <!-- Modules Area -->
      <div id="modules-container" class="space-y-8 mb-10">
        <!-- Injected via JS -->
      </div>

      <div class="text-center pt-4 border-t-2 border-amber-200">
        <button onclick="goToScreen3()" class="px-8 py-4 btn-secondary rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transform transition">
          🚀 Mulai Misi Petualangan! (Uji Pengetahuanmu)
        </button>
      </div>
    </div>

    <!-- LAYAR 3: MISI EKSPEDISI GAME -->
    <div id="screen-3" class="hidden card-adventure p-6 md:p-8">
      <!-- Top Status Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-center bg-stone-900 text-stone-100 rounded-2xl p-4 mb-6 border border-stone-700 gap-4">
        <div class="flex items-center gap-4">
          <div class="bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-600">
            <span class="text-xs text-stone-400 block">Penjelajah:</span>
            <span id="game-player-name" class="font-bold text-amber-300"></span>
          </div>
          <div class="bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-600">
            <span class="text-xs text-stone-400 block">Gaya Belajar:</span>
            <span id="game-player-type" class="font-bold text-emerald-400"></span>
          </div>
        </div>
        <div class="flex items-center gap-2 bg-stone-800 px-4 py-2 rounded-xl border border-stone-600">
          <span class="text-xs text-stone-400 font-bold uppercase">Sisa Nyawa:</span>
          <div id="hearts-container" class="flex gap-1 text-2xl">
            ❤️ ❤️ ❤️
          </div>
        </div>
      </div>

      <!-- Question / Scenario Card -->
      <div id="quiz-area" class="space-y-6">
        <div class="flex items-center justify-between">
          <span id="pos-location" class="px-3 py-1 bg-amber-800 text-amber-100 font-bold text-xs rounded-full"></span>
          <span id="pos-step" class="text-xs font-bold text-stone-500">Pos 1 dari 5</span>
        </div>

        <h3 id="pos-title" class="text-2xl font-cinzel font-bold text-earth-dark"></h3>

        <div class="bg-amber-50/80 p-5 rounded-2xl border-2 border-amber-200">
          <p id="pos-scenario" class="text-stone-800 text-base md:text-lg leading-relaxed font-medium"></p>
        </div>

        <div id="options-container" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Injected via JS -->
        </div>

        <!-- Alert / Feedback Banner -->
        <div id="feedback-banner" class="hidden p-4 rounded-xl font-medium border text-sm"></div>

        <button id="next-btn" onclick="nextPos()" class="hidden w-full py-3.5 btn-primary rounded-xl font-bold text-base shadow-md">
          Lanjut ke Pos Berikutnya ➔
        </button>
      </div>

      <!-- Game Over View -->
      <div id="game-over-view" class="hidden text-center py-8 space-y-4">
        <div class="text-6xl mb-2">💔</div>
        <h3 class="text-3xl font-cinzel font-bold text-red-700">Game Over</h3>
        <p class="text-stone-600 max-w-md mx-auto">
          Nyawamu telah habis! Silakan pelajari kembali materi di Kemah Belajar dan coba lagi.
        </p>
        <div class="flex justify-center gap-4 pt-4">
          <button onclick="reviewMaterial()" class="px-6 py-3 bg-stone-200 text-stone-800 rounded-xl font-bold hover:bg-stone-300 transition">
            📖 Pelajari Materi
          </button>
          <button onclick="restartGame()" class="px-6 py-3 btn-primary rounded-xl font-bold shadow">
            🔄 Ulangi Ekspedisi
          </button>
        </div>
      </div>

      <!-- Victory Screen -->
      <div id="victory-view" class="hidden text-center py-8 space-y-6">
        <div class="w-20 h-20 bg-amber-100 border-4 border-amber-400 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
          🏆
        </div>
        <div class="space-y-2">
          <span class="px-4 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300">EKSPEDISI SELESAI</span>
          <h2 id="victory-message" class="text-2xl md:text-3xl font-cinzel font-bold text-emerald-950 max-w-2xl mx-auto leading-relaxed">
            <!-- Dynamic Message -->
          </h2>
        </div>

        <div class="bg-amber-50 p-6 rounded-2xl border-2 border-amber-300 max-w-xl mx-auto text-left space-y-3">
          <h4 class="font-bold text-stone-800 border-b border-amber-200 pb-2">📜 Ringkasan Pencapaian Misi:</h4>
          <ul class="space-y-2 text-sm text-stone-700">
            <li class="flex items-center gap-2">✅ Memahami Gejala Sosial KOMODO TADI (Durkehim & Blaikie)</li>
            <li class="flex items-center gap-2">✅ Menguasai Struktur Sosial Diferensiasi vs Stratifikasi (J. Nasikun)</li>
            <li class="flex items-center gap-2">✅ Membedakan Stereotipe Kognitif dan Prasangka Afektif</li>
            <li class="flex items-center gap-2">✅ Menjunjung Puncak Multikulturalisme & Nilai H.A.R Tilaar</li>
          </ul>
        </div>

        <button onclick="restartGame()" class="px-8 py-4 btn-secondary rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transform transition">
          🔄 Ekspedisi Baru
        </button>
      </div>
    </div>
  </div>

  <script>
    // Game State
    let state = {
      playerName: '',
      playerType: 'Jurnalis',
      answers: { q1: '', q2: '', q3: '' },
      currentPosIndex: 0,
      lives: 3,
      hasAnswered: false,
    };

    const POSTS = [
      {
        id: 1,
        location: 'Terminal Jakarta',
        title: 'Pos 1: Fenomena Kemacetan Ibu Kota',
        scenario: 'Kamu terjebak kemacetan panjang. Kemacetan ini melibatkan faktor gengsi beli mobil, regulasi jalan, dan ekonomi. Berdasarkan karakteristiknya, kemacetan ini membuktikan bahwa gejala sosial bersifat...',
        options: [
          { text: 'Kompleks dan Dinamis', isCorrect: true },
          { text: 'Universal dan Statis', isCorrect: false }
        ],
        explanation: {
          correct: 'Tepat sekali! Gejala sosial bersifat KOMPLEKS (melibatkan banyak faktor) dan DINAMIS (selalu berubah).',
          wrong: 'Kurang tepat! Gejala sosial tidak bersifat statis maupun universal, melainkan Kompleks dan Dinamis.'
        }
      },
      {
        id: 2,
        location: 'Jalur Pantura',
        title: 'Pos 2: Tradisi Mudik Lebaran',
        scenario: 'Saat Lebaran tiba, jutaan orang melakukan tradisi mudik secara nasional yang memicu perputaran ekonomi raksasa. Menurut Norman Blaikie, ini termasuk gejala sosial tingkat...',
        options: [
          { text: 'Makro (Bersistem besar/Nasional)', isCorrect: true },
          { text: 'Mikro (Tatap muka)', isCorrect: false }
        ],
        explanation: {
          correct: 'Luar biasa! Mudik Lebaran melibatkan pergerakan nasional berskala raksasa (Tingkat MAKRO).',
          wrong: 'Masih keliru! Mudik nasional adalah gejala sosial tingkat Makro.'
        }
      },
      {
        id: 3,
        location: 'Desa Toraja',
        title: 'Pos 3: Rumah Adat Tongkonan',
        scenario: 'Kamu melihat rumah adat Tongkonan. Semakin banyak tanduk kerbau yang dipajang di depannya, semakin tinggi status sosial keluarga tersebut. Konsep pelapisan masyarakat bertingkat ini disebut...',
        options: [
          { text: 'Stratifikasi Sosial (Vertikal)', isCorrect: true },
          { text: 'Diferensiasi Sosial (Horizontal)', isCorrect: false }
        ],
        explanation: {
          correct: 'Hebat! Pelapisan masyarakat secara hirarkis bertingkat adalah Stratifikasi Sosial (Vertikal).',
          wrong: 'Salah! Tanduk kerbau menandai tingkatan hierarki (Stratifikasi Sosial Vertikal).'
        }
      },
      {
        id: 4,
        location: 'Kafe di Bandung',
        title: 'Pos 4: Obrolan di Kota Kembang',
        scenario: 'Kamu mendengar seseorang berkata, "Ah, semua orang dari suku X itu pasti pelit dan keras kepala!". Pelabelan atau citra kaku yang menyederhanakan kelompok ini disebut...',
        options: [
          { text: 'Stereotipe', isCorrect: true },
          { text: 'Prasangka', isCorrect: false }
        ],
        explanation: {
          correct: 'Benar sekali! Pelabelan atau citra kaku dalam pikiran (kognitif) dinamakan STEREOTIPE.',
          wrong: 'Hampir tepat, tapi pelabelan kaku dalam pikiran adalah Stereotipe.'
        }
      },
      {
        id: 5,
        location: 'Jantung Ibu Kota',
        title: 'Pos 5: Simbol Kerukunan Bangsa',
        scenario: 'Kamu melihat Masjid Istiqlal dan Gereja Katedral berdiri berdampingan secara damai dan saling berbagi lahan parkir. Hal ini mencerminkan puncak ideologi di mana masyarakat menjunjung kesederajatan di dalam perbedaan. Ideologi ini disebut...',
        options: [
          { text: 'Multikulturalisme', isCorrect: true },
          { text: 'Etnosentrisme', isCorrect: false }
        ],
        explanation: {
          correct: 'Sempurna! Ideologi yang menjunjung KESEDERAJATAN dalam perbedaan adalah Multikulturalisme!',
          wrong: 'Salah! Jawaban yang tepat adalah Multikulturalisme.'
        }
      }
    ];

    function handleDiagnosticSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('player-name-input').value.trim();
      if (!name) return;

      const q1 = document.querySelector('input[name="q1"]:checked')?.value || 'A';
      const q2 = document.querySelector('input[name="q2"]:checked')?.value || 'B';
      const q3 = document.querySelector('input[name="q3"]:checked')?.value || 'C';

      let counts = { Jurnalis: 0, Fotografer: 0, Petualang: 0 };
      const mapVal = { A: 'Jurnalis', B: 'Fotografer', C: 'Petualang' };
      counts[mapVal[q1]]++;
      counts[mapVal[q2]]++;
      counts[mapVal[q3]]++;

      let maxType = 'Jurnalis';
      let maxCount = -1;
      for (const [type, count] of Object.entries(counts)) {
        if (count > maxCount) {
          maxCount = count;
          maxType = type;
        }
      }

      state.playerName = name;
      state.playerType = maxType;

      // Update UI Header
      document.getElementById('player-badge-container').classList.remove('hidden');
      document.getElementById('player-name-display').innerText = name;
      document.getElementById('player-type-badge').innerText = maxType;

      // Hide Screen 1, Show Screen 2
      document.getElementById('screen-1').classList.add('hidden');
      document.getElementById('screen-2').classList.remove('hidden');

      renderLearningCamp();
    }

    function renderLearningCamp() {
      document.getElementById('camp-player-name').innerText = state.playerName;
      document.getElementById('camp-player-type').innerText = state.playerType;

      const container = document.getElementById('modules-container');
      container.innerHTML = '';

      if (state.playerType === 'Jurnalis') {
        container.innerHTML = \`
          <div class="card-adventure p-6 border-l-8 border-l-amber-700">
            <h3 class="text-xl font-bold text-amber-900 mb-2">Modul 1: Gejala Sosial (Artikel Analitis)</h3>
            <p class="text-stone-700 text-sm mb-3">Menurut <strong>Émile Durkheim</strong>, gejala sosial adalah bagian dari fakta sosial objektif di luar individu yang bersifat memaksa. Karakteristiknya disingkat <strong>KOMODO TADI</strong> (Kompleks, Dinamis, Tidak Universal, Kualitatif, Dihasilkan Manusia).</p>
            <p class="text-stone-700 text-sm">Menurut <strong>Norman Blaikie</strong>, tingkatannya dibagi 3: <em>Mikro</em> (interaksi individu), <em>Meso</em> (kelompok/organisasi), dan <em>Makro</em> (sistem besar/nasional).</p>
          </div>

          <div class="card-adventure p-6 border-l-8 border-l-emerald-700">
            <h3 class="text-xl font-bold text-emerald-950 mb-2">Modul 2: Struktur Sosial (Teori J. Nasikun)</h3>
            <p class="text-stone-700 text-sm mb-2">Menurut <strong>J. Nasikun</strong>, struktur sosial terdiri dari dua dimensi:</p>
            <ul class="list-disc pl-5 text-sm text-stone-700 space-y-1">
              <li><strong>Horizontal (Diferensiasi Sosial):</strong> Pembelahan sejajar tanpa tingkatan (ras, suku, agama).</li>
              <li><strong>Vertikal (Stratifikasi Sosial):</strong> Pelapisan bertingkat hirarkis (kelas atas, menengah, bawah).</li>
            </ul>
          </div>

          <div class="card-adventure p-6 border-l-8 border-l-stone-700">
            <h3 class="text-xl font-bold text-stone-900 mb-2">Modul 3: Prasangka vs Stereotipe</h3>
            <p class="text-stone-700 text-sm mb-2"><strong>Prasangka:</strong> Sikap bermusuhan berdasarkan emosi/perasaan tanpa fakta (Domain Afektif).</p>
            <p class="text-stone-700 text-sm"><strong>Stereotipe:</strong> Pelabelan atau citra kaku yang menyederhanakan kelompok (Domain Kognitif/Pikiran).</p>
          </div>

          <div class="card-adventure p-6 border-l-8 border-l-amber-800">
            <h3 class="text-xl font-bold text-amber-950 mb-2">Modul 4: Multikulturalisme (H.A.R Tilaar)</h3>
            <p class="text-stone-700 text-sm mb-2">Ideologi yang menjunjung <strong>KESEDERAJATAN</strong> dalam perbedaan. 3 Nilai Pendorong pemicunya menurut <strong>H.A.R Tilaar</strong> adalah: 1. HAM, 2. Globalisme, 3. Demokratisasi.</p>
          </div>
        \`;
      } else if (state.playerType === 'Fotografer') {
        container.innerHTML = \`
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-emerald-900 text-amber-50 p-6 rounded-2xl border-2 border-emerald-700">
              <span class="px-2 py-0.5 bg-emerald-700 text-xs rounded font-bold uppercase mb-2 inline-block">Modul 1: Visual</span>
              <h4 class="text-lg font-bold text-amber-200 mb-2">Gejala Sosial & KOMODO TADI</h4>
              <ul class="text-xs space-y-1.5 text-emerald-100">
                <li>• <strong>Durkheim:</strong> Fakta sosial eksternal</li>
                <li>• <strong>KOMODO TADI:</strong> Kompleks, Dinamis, Tidak Universal</li>
                <li>• <strong>Blaikie Skala:</strong> Mikro ➔ Meso ➔ Makro</li>
              </ul>
            </div>

            <div class="bg-stone-800 text-amber-50 p-6 rounded-2xl border-2 border-stone-600">
              <span class="px-2 py-0.5 bg-amber-600 text-xs rounded font-bold uppercase mb-2 inline-block">Modul 2: Grid</span>
              <h4 class="text-lg font-bold text-amber-300 mb-2">Struktur J. Nasikun</h4>
              <div class="space-y-2 text-xs">
                <div class="bg-stone-700 p-2 rounded border border-stone-500">══ Horizontal: Diferensiasi (Sejajar: Agama/Suku)</div>
                <div class="bg-amber-900/80 p-2 rounded border border-amber-500">║║ Vertikal: Stratifikasi (Bertingkat: Atas/Bawah)</div>
              </div>
            </div>

            <div class="bg-amber-800 text-amber-50 p-6 rounded-2xl border-2 border-amber-600">
              <span class="px-2 py-0.5 bg-amber-600 text-xs rounded font-bold uppercase mb-2 inline-block">Modul 3: Kontras</span>
              <h4 class="text-lg font-bold text-amber-200 mb-2">Stereotipe vs Prasangka</h4>
              <p class="text-xs text-amber-100 mb-1">🧠 <strong>Stereotipe:</strong> Label Pikiran (Kognitif)</p>
              <p class="text-xs text-amber-100">❤️ <strong>Prasangka:</strong> Sikap Emosi (Afektif)</p>
            </div>

            <div class="bg-emerald-950 text-amber-50 p-6 rounded-2xl border-2 border-emerald-600">
              <span class="px-2 py-0.5 bg-emerald-800 text-xs rounded font-bold uppercase mb-2 inline-block">Modul 4: Pilar</span>
              <h4 class="text-lg font-bold text-amber-200 mb-2">Multikulturalisme</h4>
              <p class="text-xs text-amber-100 mb-2">🤝 Kesederajatan dalam perbedaan.</p>
              <p class="text-xs font-bold text-emerald-300">Nilai H.A.R Tilaar: HAM • Globalisme • Demokratisasi</p>
            </div>
          </div>
        \`;
      } else {
        container.innerHTML = \`
          <div class="space-y-4">
            <details class="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4 cursor-pointer">
              <summary class="font-bold text-stone-800 text-lg flex items-center gap-2">
                <span>📦 Buka Peti 1: Gejala Sosial</span>
              </summary>
              <div class="mt-3 text-sm text-stone-700 pt-3 border-t border-amber-200">
                Émile Durkheim menyebut gejala sosial sebagai fakta objektif. Karakteristiknya <strong>KOMODO TADI</strong>. Norman Blaikie membaginya jadi Mikro, Meso, dan Makro!
              </div>
            </details>

            <details class="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4 cursor-pointer">
              <summary class="font-bold text-stone-800 text-lg flex items-center gap-2">
                <span>📦 Buka Peti 2: Struktur Sosial</span>
              </summary>
              <div class="mt-3 text-sm text-stone-700 pt-3 border-t border-amber-200">
                Menurut J. Nasikun: Horizontal = Diferensiasi (Sejajar: Ras, Suku, Agama). Vertikal = Stratifikasi (Bertingkat: Kelas Sosial).
              </div>
            </details>

            <details class="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4 cursor-pointer">
              <summary class="font-bold text-stone-800 text-lg flex items-center gap-2">
                <span>📦 Buka Peti 3: Prasangka & Stereotipe</span>
              </summary>
              <div class="mt-3 text-sm text-stone-700 pt-3 border-t border-amber-200">
                Stereotipe terjadi di pikiran (kognitif/pelabelan). Prasangka terjadi di perasaan (afektif/sikap bermusuhan).
              </div>
            </details>

            <details class="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4 cursor-pointer">
              <summary class="font-bold text-stone-800 text-lg flex items-center gap-2">
                <span>📦 Buka Peti 4: Multikulturalisme</span>
              </summary>
              <div class="mt-3 text-sm text-stone-700 pt-3 border-t border-amber-200">
                Menjunjung Kesederajatan! Pendorong H.A.R Tilaar: HAM, Globalisme, dan Demokratisasi.
              </div>
            </details>
          </div>
        \`;
      }
    }

    function goToScreen3() {
      document.getElementById('screen-2').classList.add('hidden');
      document.getElementById('screen-3').classList.remove('hidden');

      document.getElementById('game-player-name').innerText = state.playerName;
      document.getElementById('game-player-type').innerText = state.playerType;

      state.currentPosIndex = 0;
      state.lives = 3;
      state.hasAnswered = false;

      renderHearts();
      renderPos();
    }

    function renderHearts() {
      const container = document.getElementById('hearts-container');
      let str = '';
      for (let i = 0; i < 3; i++) {
        if (i < state.lives) str += '❤️ ';
        else str += '🖤 ';
      }
      container.innerText = str;
    }

    function renderPos() {
      const pos = POSTS[state.currentPosIndex];
      state.hasAnswered = false;

      document.getElementById('quiz-area').classList.remove('hidden');
      document.getElementById('game-over-view').classList.add('hidden');
      document.getElementById('victory-view').classList.add('hidden');
      document.getElementById('feedback-banner').classList.add('hidden');
      document.getElementById('next-btn').classList.add('hidden');

      document.getElementById('pos-location').innerText = pos.location;
      document.getElementById('pos-step').innerText = \`Pos \${state.currentPosIndex + 1} dari 5\`;
      document.getElementById('pos-title').innerText = pos.title;
      document.getElementById('pos-scenario').innerText = pos.scenario;

      const optsContainer = document.getElementById('options-container');
      optsContainer.innerHTML = '';

      pos.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'p-4 rounded-xl border-2 border-amber-300 bg-white hover:bg-amber-100 font-bold text-left text-stone-800 transition text-sm md:text-base shadow-sm';
        btn.innerText = opt.text;
        btn.onclick = () => selectOption(opt.isCorrect, pos);
        optsContainer.appendChild(btn);
      });
    }

    function selectOption(isCorrect, pos) {
      if (state.hasAnswered) return;
      state.hasAnswered = true;

      const feedback = document.getElementById('feedback-banner');
      feedback.classList.remove('hidden');

      if (isCorrect) {
        feedback.className = 'p-4 rounded-xl font-medium border text-sm bg-emerald-100 text-emerald-900 border-emerald-300';
        feedback.innerText = '✅ ' + pos.explanation.correct;
        document.getElementById('next-btn').classList.remove('hidden');
      } else {
        state.lives--;
        renderHearts();

        feedback.className = 'p-4 rounded-xl font-medium border text-sm bg-red-100 text-red-900 border-red-300';
        feedback.innerText = '❌ ' + pos.explanation.wrong;

        if (state.lives <= 0) {
          setTimeout(() => {
            document.getElementById('quiz-area').classList.add('hidden');
            document.getElementById('game-over-view').classList.remove('hidden');
          }, 1500);
        } else {
          state.hasAnswered = false; // Allow retry
        }
      }
    }

    function nextPos() {
      if (state.currentPosIndex < POSTS.length - 1) {
        state.currentPosIndex++;
        renderPos();
      } else {
        // Victory!
        document.getElementById('quiz-area').classList.add('hidden');
        document.getElementById('victory-view').classList.remove('hidden');
        document.getElementById('victory-message').innerText = \`Luar Biasa, \${state.playerName}! Kamu telah membuktikan dirimu sebagai Pelopor Masyarakat Multikultural Indonesia!\`;

        if (typeof confetti === 'function') {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
      }
    }

    function reviewMaterial() {
      document.getElementById('screen-3').classList.add('hidden');
      document.getElementById('screen-2').classList.remove('hidden');
    }

    function restartGame() {
      document.getElementById('screen-3').classList.add('hidden');
      document.getElementById('screen-1').classList.remove('hidden');
    }
  </script>
</body>
</html>`;
}
