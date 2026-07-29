import React, { useState } from 'react';
import { DIAGNOSTIC_QUESTIONS } from '../data/sociologyData';
import { AVATARS, getAvatarById } from '../data/avatarData';
import { PlayerProfile, ProfileType } from '../types';
import { soundFx } from '../utils/audio';
import {
  User,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Award,
  Zap,
  Star,
  Compass,
  Headphones,
  Eye,
  Activity,
} from 'lucide-react';

interface DiagnosticAssessmentProps {
  onComplete: (profile: PlayerProfile) => void;
}

export const DiagnosticAssessment: React.FC<DiagnosticAssessmentProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>('rio');
  const [errorMsg, setErrorMsg] = useState('');

  // Assessment States
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [calculatedRole, setCalculatedRole] = useState<ProfileType>('Jurnalis');

  const handleOptionSelect = (questionId: number, key: string) => {
    soundFx.playClick();
    setAnswers((prev) => ({ ...prev, [questionId]: key }));
    setErrorMsg('');
  };

  const handleCalculateResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Mohon isi Nama Penjelajah terlebih dahulu.');
      return;
    }
    if (Object.keys(answers).length < DIAGNOSTIC_QUESTIONS.length) {
      setErrorMsg('Mohon jawab ketiga pertanyaan diagnostik di bawah ini.');
      return;
    }

    // Determine dominant learning style
    let counts = { Jurnalis: 0, Fotografer: 0, Petualang: 0 };
    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      const selectedKey = answers[q.id];
      const foundOpt = q.options.find((o) => o.key === selectedKey);
      if (foundOpt) {
        counts[foundOpt.type]++;
      }
    });

    let maxType: ProfileType = 'Jurnalis';
    let maxCount = -1;
    (Object.keys(counts) as ProfileType[]).forEach((type) => {
      if (counts[type] > maxCount) {
        maxCount = counts[type];
        maxType = type;
      }
    });

    soundFx.playVictory();
    setCalculatedRole(maxType);
    setIsCalculated(true);
  };

  const handleStartAdventure = () => {
    soundFx.playChestOpen();
    onComplete({
      name: name.trim(),
      profileType: calculatedRole,
      avatarId: selectedAvatarId,
      answers,
    });
  };

  const avatar = getAvatarById(selectedAvatarId);

  return (
    <div className="relative bg-[#faf3e0] rounded-3xl border-4 border-[#8c5a3c] p-6 md:p-10 shadow-2xl max-w-4xl mx-auto my-4 transition-all text-[#2b1810]">
      {/* Ancient Scroll Corners */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#8c5a3c]"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#8c5a3c]"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#8c5a3c]"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#8c5a3c]"></div>

      {/* Header Badge */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#5c3a28] text-amber-200 font-bold text-xs rounded-full border border-amber-500/40 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          📜 PROLOG: Pilih Profil Avatar & Pemetaan Diagnostik Gaya Belajar
        </span>
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#3d261a] tracking-tight drop-shadow-sm">
          Ekspedisi Nusantara: Sosiologi Multikultural
        </h2>
        <p className="text-stone-700 text-sm md:text-base leading-relaxed">
          Selamat datang, Penjelajah Muda! Pilih Profil Avatar favoritmu, lalu selesaikan 3 pertanyaan pretest untuk mengidentifikasi <strong>Status Gaya Belajar RPG</strong>-mu!
        </p>
      </div>

      {/* REVEALED STATUS RESULT SCREEN */}
      {isCalculated ? (
        <div className="bg-[#ebd2b0]/90 p-6 md:p-8 rounded-3xl border-4 border-[#8c5a3c] shadow-2xl space-y-6 text-center animate-fadeIn">
          <div className="inline-block relative">
            <div className="w-24 h-24 rounded-3xl bg-amber-500/20 border-4 border-amber-600 flex items-center justify-center text-5xl shadow-2xl mx-auto">
              {avatar.emoji}
            </div>
            <span className="absolute -bottom-2 -right-2 bg-amber-400 text-amber-950 p-1.5 rounded-full border border-amber-600 shadow">
              <Award className="w-5 h-5" />
            </span>
          </div>

          <div className="space-y-2">
            <span className="px-4 py-1 bg-[#5c3a28] text-amber-200 font-extrabold text-xs rounded-full border border-amber-500/40 shadow">
              PEMETAAN GAYA BELAJAR SELESAI
            </span>

            <h3 className="text-2xl md:text-3xl font-serif font-black text-[#3d261a]">
              Selamat, Hero <span className="text-amber-800 underline">{name}</span>!
            </h3>

            {/* STATUS CLASS BADGE */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#214a36] to-[#10291d] text-amber-100 rounded-2xl border-2 border-emerald-400 shadow-xl text-lg font-bold font-serif">
                {calculatedRole === 'Jurnalis' && <Headphones className="w-6 h-6 text-amber-300" />}
                {calculatedRole === 'Fotografer' && <Eye className="w-6 h-6 text-amber-300" />}
                {calculatedRole === 'Petualang' && <Activity className="w-6 h-6 text-amber-300" />}
                <span>STATUS RPG CLASS: {calculatedRole.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* CHARACTER & LEARNING STYLE BREAKDOWN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto pt-2">
            <div className="bg-[#fcf8ef] p-4 rounded-2xl border-2 border-[#b89b72] space-y-1.5">
              <span className="text-xs font-bold text-amber-900 block flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-600" />
                Gaya Belajar Utama:
              </span>
              <p className="text-xs text-stone-800 leading-relaxed font-medium">
                {calculatedRole === 'Jurnalis' &&
                  'Auditori & Teks: Kamu sangat peka terhadap rekaman narasi audio, teks laporan jurnalistik, dan wawancara opini sosiologis.'}
                {calculatedRole === 'Fotografer' &&
                  'Visual & Grafis: Kamu memproses informasi terbaik lewat infografis, dokumenter foto, mindmap visual, dan peta konsep.'}
                {calculatedRole === 'Petualang' &&
                  'Kinestetik & Aksi: Kamu belajar paling optimal lewat simulasi praktis, peti eksplorasi interaktif, dan analisis kasus langsung.'}
              </p>
            </div>

            <div className="bg-[#fcf8ef] p-4 rounded-2xl border-2 border-[#b89b72] space-y-1.5">
              <span className="text-xs font-bold text-amber-900 block flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600" />
                Skill Khusus Terbuka:
              </span>
              <p className="text-xs text-stone-800 font-bold">
                {avatar.specialSkill}
              </p>
              <p className="text-[11px] text-stone-600 leading-tight">
                {avatar.skillDesc}
              </p>
            </div>
          </div>

          <p className="text-xs md:text-sm text-stone-700 font-semibold max-w-lg mx-auto">
            Kemah Belajar dan 5 Pos Ekspedisi Lapangan telah disesuaikan dengan profil gaya belajarmu. Mari kita mulai petualangan!
          </p>

          <button
            onClick={handleStartAdventure}
            className="px-10 py-4 bg-gradient-to-r from-[#214a36] via-[#173a2a] to-[#0e241a] hover:from-[#2a5d44] hover:to-[#193d2d] text-amber-100 rounded-2xl font-black text-lg md:text-xl shadow-2xl transition transform active:scale-95 border-2 border-emerald-500/50 flex items-center justify-center gap-3 mx-auto font-serif"
          >
            <span>Masuk Ke Kemah Belajar! ⛺</span>
            <ArrowRight className="w-6 h-6 text-amber-300" />
          </button>
        </div>
      ) : (
        /* FORM STEP: NAME, AVATAR PROFILE, & PRETEST */
        <form onSubmit={handleCalculateResult} className="space-y-8 max-w-2xl mx-auto">
          {/* Name Input */}
          <div className="bg-[#ebd2b0] p-5 rounded-2xl border-2 border-[#a67c52] shadow-inner space-y-2">
            <label className="block font-bold text-[#3d261a] text-sm md:text-base flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-900" />
              Nama Penjelajah (Hero Name):
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorMsg('');
              }}
              placeholder="Ketik nama lengkap atau nama panggilanmu..."
              className="w-full px-4 py-3 rounded-xl border-2 border-[#8c5a3c] focus:border-emerald-800 focus:outline-none bg-[#fcf8ef] text-stone-900 font-semibold text-base transition shadow-sm"
            />
          </div>

          {/* Cute Avatar Profile Picker */}
          <div className="space-y-3">
            <label className="block font-serif font-bold text-[#3d261a] text-base border-b-2 border-[#b89b72] pb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700" />
              Pilih Karakter Avatar Hero Favoritmu:
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVATARS.map((av) => {
                const isSelected = selectedAvatarId === av.id;
                return (
                  <button
                    type="button"
                    key={av.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedAvatarId(av.id);
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#2b4c3f] text-amber-100 border-amber-400 ring-2 ring-emerald-400 shadow-xl scale-102'
                        : 'bg-[#fcf8ef] text-[#2b1810] border-[#b89b72] hover:bg-[#f3ead7]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl filter drop-shadow">{av.emoji}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isSelected
                            ? 'bg-amber-400 text-emerald-950 border-amber-200'
                            : 'bg-[#ebd2b0] text-amber-950 border-[#b89b72]'
                        }`}
                      >
                        {av.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs md:text-sm font-serif line-clamp-1">{av.name}</h4>
                      <p
                        className={`text-[10px] leading-tight italic ${
                          isSelected ? 'text-amber-200' : 'text-stone-600'
                        }`}
                      >
                        "{av.quote}"
                      </p>
                    </div>

                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 bg-amber-400 text-emerald-950 p-0.5 rounded-full">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Pretest Questions */}
          <div className="space-y-6">
            <h3 className="font-bold text-[#3d261a] text-base md:text-lg border-b-2 border-[#b89b72] pb-2 flex items-center gap-2 font-serif">
              <BookOpen className="w-5 h-5 text-amber-800" />
              Soal Pretest Pemetaan Gaya Belajar (3 Pertanyaan):
            </h3>

            {DIAGNOSTIC_QUESTIONS.map((q) => (
              <div
                key={q.id}
                className="bg-[#ebd2b0]/70 p-5 rounded-2xl border-2 border-[#cbb08b] shadow-sm space-y-3"
              >
                <p className="font-bold text-[#3d261a] text-sm md:text-base leading-snug flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#5c3a28] text-amber-200 flex items-center justify-center text-xs shrink-0 mt-0.5 font-mono font-bold">
                    {q.id}
                  </span>
                  <span>{q.question}</span>
                </p>

                <div className="space-y-2.5 pl-2">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.key;
                    return (
                      <button
                        type="button"
                        key={opt.key}
                        onClick={() => handleOptionSelect(q.id, opt.key)}
                        className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center gap-3 text-sm font-semibold ${
                          isSelected
                            ? 'bg-[#2b4c3f] text-amber-100 border-[#1c352b] shadow-lg translate-x-1 ring-2 ring-emerald-500/50'
                            : 'bg-[#fcf8ef] text-[#2b1810] border-[#cbb08b] hover:border-emerald-700 hover:bg-[#f3ead7]'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center text-xs shrink-0 ${
                            isSelected
                              ? 'bg-amber-400 text-emerald-950 font-black'
                              : 'bg-[#e2d4be] text-stone-800 border border-[#b89b72]'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-900/10 border-2 border-red-800 text-red-950 text-sm font-bold rounded-xl text-center shadow">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Submit Pretest & Calculate Status */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[#214a36] to-[#122e21] hover:from-[#2a5d44] hover:to-[#193d2d] text-amber-100 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-2xl transition transform active:scale-98 flex items-center justify-center gap-2 border-2 border-emerald-500/50 tracking-wide font-serif"
          >
            <span>Proses Pretest & Cek Status Gaya Belajar</span>
            <ArrowRight className="w-5 h-5 text-amber-300" />
          </button>
        </form>
      )}
    </div>
  );
};
