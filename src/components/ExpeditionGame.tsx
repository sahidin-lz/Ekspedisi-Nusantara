import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PlayerProfile, ProfileType, ExpeditionPost } from '../types';
import { EXPEDITION_POSTS } from '../data/sociologyData';
import { getAvatarById } from '../data/avatarData';
import { soundFx } from '../utils/audio';
import { saveStudentToFirestore } from '../lib/firestoreService';
import { ExpeditionMap } from './ExpeditionMap';
import {
  Heart,
  MapPin,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Trophy,
  Sparkles,
  ShieldAlert,
  Award,
  Compass,
  Zap,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

interface ExpeditionGameProps {
  player: PlayerProfile;
  onRestartGame: () => void;
  onGoToCamp: () => void;
  onUpdateProfileType?: (newType: ProfileType) => void;
}

export const ExpeditionGame: React.FC<ExpeditionGameProps> = ({
  player,
  onRestartGame,
  onGoToCamp,
  onUpdateProfileType,
}) => {
  const [currentPosIndex, setCurrentPosIndex] = useState<number>(0);
  const [completedPosIndexes, setCompletedPosIndexes] = useState<number[]>([]);
  const [lives, setLives] = useState<number>(3);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [usedClassSkill, setUsedClassSkill] = useState<boolean>(false);
  const [showSkillHint, setShowSkillHint] = useState<boolean>(false);

  const avatar = getAvatarById(player.avatarId);
  const currentPos: ExpeditionPost = EXPEDITION_POSTS[currentPosIndex];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2d6a4f', '#d4a373', '#e0a96d', '#1e3f24'],
      });
    } catch {
      // Fallback silent fail if confetti library unmounted
    }
  };

  const handleUseSkill = () => {
    if (usedClassSkill) return;
    soundFx.playChestOpen();
    setUsedClassSkill(true);
    setShowSkillHint(true);
  };

  const handleSelectOption = (optionId: 'correct' | 'wrong', isCorrect: boolean) => {
    setSelectedOptionId(optionId);

    if (isCorrect) {
      soundFx.playCorrect();
      setHasAnsweredCorrectly(true);
      if (!completedPosIndexes.includes(currentPosIndex)) {
        setCompletedPosIndexes((prev) => [...prev, currentPosIndex]);
      }
      setFeedbackMsg({
        isCorrect: true,
        text: currentPos.explanation.correct,
      });
    } else {
      soundFx.playWrong();
      const newLives = lives - 1;
      setLives(newLives);

      setFeedbackMsg({
        isCorrect: false,
        text: currentPos.explanation.wrong,
      });

      if (newLives <= 0) {
        setTimeout(() => {
          setIsGameOver(true);
        }, 1200);
      }
    }
  };

  const handleNextPos = () => {
    soundFx.playClick();
    const updatedPostsCount = completedPosIndexes.length;
    
    // Save progress to Firestore
    saveStudentToFirestore({
      id: `std-${player.name.toLowerCase().replace(/\s+/g, '-')}`,
      studentName: player.name,
      avatarId: player.avatarId,
      profileType: player.profileType,
      pretestScore: 100,
      postsCompleted: updatedPostsCount,
      livesRemaining: lives,
      evalScore: Math.round((updatedPostsCount / 5) * 100),
      grade: updatedPostsCount >= 5 ? 'A' : updatedPostsCount >= 4 ? 'B' : 'Perlu Remedial',
      status: updatedPostsCount >= 5 ? 'Selesai' : 'Sedang Belajar',
      teacherNotes: `Telah menyelesaikan ${updatedPostsCount} pos ekspedisi.`,
      updatedAt: new Date().toLocaleDateString('id-ID'),
    });

    if (currentPosIndex < EXPEDITION_POSTS.length - 1) {
      setCurrentPosIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnsweredCorrectly(false);
      setFeedbackMsg(null);
      setShowSkillHint(false);
    } else {
      // Reached Victory
      soundFx.playVictory();
      setIsVictory(true);
      triggerConfetti();
    }
  };

  return (
    <div className="relative bg-[#faf3e0] rounded-3xl border-4 border-[#8c5a3c] p-6 md:p-10 shadow-2xl max-w-4xl mx-auto my-4 space-y-6 text-[#2b1810]">
      {/* Ancient Wooden Decor Corners */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#8c5a3c]"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#8c5a3c]"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#8c5a3c]"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#8c5a3c]"></div>

      {/* RPG Game Status Bar with Avatar Profile */}
      <div className="bg-gradient-to-r from-[#21140e] via-[#3d261a] to-[#1e100a] text-amber-100 p-4 md:p-5 rounded-2xl border-2 border-amber-600/40 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-3">
          {/* Avatar Icon */}
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-inner shrink-0">
            {avatar.emoji}
          </div>

          <div className="bg-[#100906] px-3.5 py-1.5 rounded-xl border border-amber-600/40 shadow-inner">
            <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider block">
              {avatar.name}
            </span>
            <span className="text-sm font-bold text-amber-200">{player.name}</span>
          </div>

          {/* Interactive Gaya Belajar / Jenis Petualangan Switcher */}
          <div className="bg-[#100906] p-1.5 rounded-xl border border-emerald-600/50 shadow-inner flex flex-col gap-1">
            <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider block px-1">
              Gaya Belajar / Petualangan:
            </span>
            <div className="flex items-center gap-1">
              {(['Jurnalis', 'Fotografer', 'Petualang'] as ProfileType[]).map((mode) => {
                const isActive = player.profileType === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      if (onUpdateProfileType) onUpdateProfileType(mode);
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition ${
                      isActive
                        ? 'bg-amber-400 text-emerald-950 font-black shadow'
                        : 'text-amber-200 hover:text-white hover:bg-amber-900/50'
                    }`}
                    title={`Ganti Gaya Belajar ke ${mode}`}
                  >
                    {mode === 'Jurnalis' && '🗞️ Jurnalis'}
                    {mode === 'Fotografer' && '📸 Fotografer'}
                    {mode === 'Petualang' && '🧭 Petualang'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Health Hearts & Skill Button */}
        <div className="flex items-center gap-3">
          <div className="bg-[#100906] px-3.5 py-2 rounded-xl border border-amber-500/40 flex items-center gap-2 shadow-inner">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider hidden xs:inline">Nyawa:</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 transition-all ${
                    i <= lives
                      ? 'text-red-500 fill-red-500 drop-shadow scale-105'
                      : 'text-stone-700 fill-stone-800 scale-90 opacity-60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Class RPG Special Ability Skill Button */}
          <button
            onClick={handleUseSkill}
            disabled={usedClassSkill}
            className={`px-3 py-2 rounded-xl font-extrabold text-xs flex items-center gap-1.5 border transition shadow-md ${
              usedClassSkill
                ? 'bg-stone-800 text-stone-500 border-stone-700 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-100 border-amber-300 animate-pulse'
            }`}
            title={usedClassSkill ? 'Skill Khusus telah digunakan 1x' : 'Gunakan Skill Khusus Class!'}
          >
            <Zap className="w-4 h-4 text-amber-200" />
            <span className="hidden md:inline">{avatar.specialSkill}</span>
            <span className="md:hidden">Skill</span>
          </button>
        </div>
      </div>

      {/* Avatar Cute Dialogue Speech Bubble */}
      <div className="bg-[#ebd2b0]/90 p-4 rounded-2xl border-2 border-[#a67c52] flex items-center gap-3.5 shadow-sm">
        <span className="text-3xl shrink-0 animate-bounce">{avatar.emoji}</span>
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wider block">
            {avatar.name} Berbisik:
          </span>
          <p className="text-xs md:text-sm font-serif italic text-[#3d261a] font-semibold">
            "{avatar.quote}"
          </p>
        </div>
      </div>

      {/* Special Skill Hint Modal Banner */}
      {showSkillHint && (
        <div className="bg-[#1c3a2a] text-amber-100 p-4 rounded-2xl border-2 border-emerald-400 shadow-xl space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
            <Zap className="w-5 h-5 text-amber-300 animate-spin-slow" />
            <span>Skill Khusus Teraktivasi: {avatar.specialSkill}</span>
          </div>
          <p className="text-xs md:text-sm font-medium leading-relaxed text-amber-200">
            💡 <strong>Petunjuk Khusus Gaya Belajar {player.profileType}:</strong> {avatar.skillDesc}
          </p>
          <div className="p-3 bg-[#0e2117] rounded-xl text-xs text-emerald-200 font-mono border border-emerald-600/40">
            {player.profileType === 'Jurnalis' && 'Fokus pada narasi gejala sosial atau norma terstruktur dalam scenario untuk menemukan fakta otentik.'}
            {player.profileType === 'Fotografer' && 'Bandingkan komponen visual horizontal (diferensiasi) vs vertikal (stratifikasi) pada pilihan jawaban.'}
            {player.profileType === 'Petualang' && 'Pilih tindakan lapangan yang paling mendorong dialog lintas budaya dan tindakan langsung!'}
          </div>
        </div>
      )}

      {/* Interactive Expedition Map */}
      <ExpeditionMap
        currentPosIndex={currentPosIndex}
        completedPosIndexes={completedPosIndexes}
        onSelectPos={(idx) => {
          if (completedPosIndexes.includes(idx) || idx <= currentPosIndex) {
            setCurrentPosIndex(idx);
            setSelectedOptionId(null);
            setHasAnsweredCorrectly(completedPosIndexes.includes(idx));
            setFeedbackMsg(null);
          }
        }}
        interactive={true}
      />

      {/* GAME OVER VIEW */}
      {isGameOver ? (
        <div className="text-center py-10 space-y-6 bg-red-950/20 rounded-2xl border-4 border-red-800 p-6 md:p-10 animate-fadeIn text-red-950">
          <div className="w-20 h-20 bg-red-900 text-red-100 rounded-full flex items-center justify-center mx-auto border-4 border-red-600 shadow-xl">
            <ShieldAlert className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-3xl font-serif font-bold text-red-950">
              Misi Terhenti - Game Over
            </h3>
            <p className="text-stone-800 text-sm md:text-base leading-relaxed font-semibold">
              Indikator nyawamu telah habis saat menghadapi tantangan pos ekspedisi. Jangan berkecil hati! Kembali ke Kemah Belajar untuk mengulas teori sosiologi multikultural.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => {
                soundFx.playClick();
                onGoToCamp();
              }}
              className="px-6 py-3.5 bg-[#5c3a28] hover:bg-[#784b31] text-amber-100 rounded-xl font-bold shadow-lg flex items-center gap-2 transition border-2 border-amber-600/40"
            >
              <BookOpen className="w-5 h-5 text-amber-300" />
              <span>Kembali ke Kemah Belajar</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onRestartGame();
              }}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-amber-100 rounded-xl font-bold shadow-lg flex items-center gap-2 transition border-2 border-emerald-500/50"
            >
              <RotateCcw className="w-5 h-5 text-amber-300" />
              <span>Ulangi Ekspedisi</span>
            </button>
          </div>
        </div>
      ) : isVictory ? (
        /* VICTORY SCREEN */
        <div className="text-center py-8 space-y-8 bg-[#ebd2b0]/90 rounded-2xl border-4 border-[#b89b72] p-6 md:p-10 animate-fadeIn shadow-inner">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-[#5c3a28] text-amber-300 border-4 border-amber-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
            </div>
            <Sparkles className="w-8 h-8 text-amber-500 absolute -top-2 -right-2 animate-pulse" />
          </div>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-1 bg.emerald-900 text-emerald-100 font-extrabold text-xs rounded-full border border-emerald-500 shadow">
              <Award className="w-4 h-4 text-amber-300" />
              MISI EKSPEDISI SELESAI DENGAN GEMILANG
            </span>

            {/* Exact required victory message */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#3d261a] max-w-2xl mx-auto leading-relaxed px-2">
              Luar Biasa, <span className="text-emerald-900 underline decoration-amber-500">{player.name}</span>! Kamu telah membuktikan dirimu sebagai Pelopor Masyarakat Multikultural Indonesia!
            </h2>
          </div>

          {/* Achievement Summary Card */}
          <div className="bg-[#fcf8ef] p-6 rounded-2xl border-2 border-[#b89b72] max-w-xl mx-auto text-left space-y-3 shadow-md">
            <h4 className="font-bold text-[#3d261a] text-sm md:text-base border-b-2 border-[#b89b72] pb-2 flex items-center gap-2 font-serif">
              <Sparkles className="w-4 h-4 text-amber-700" />
              Sertifikat Penguasaan Sosiologi Multikultural:
            </h4>
            <ul className="space-y-2 text-xs md:text-sm text-stone-800 font-semibold">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>Gejala Sosial KOMODO TADI, Fakta Durkheim, & Skala Norman Blaikie</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>Struktur Sosial Horizontal (Diferensiasi) & Vertikal (Stratifikasi J. Nasikun)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>Diferensiasi Stereotipe (Kognitif) vs Prasangka Sosial (Afektif)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>Puncak Ideologi Multikulturalisme & 3 Nilai H.A.R Tilaar</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => {
                soundFx.playClick();
                onGoToCamp();
              }}
              className="px-6 py-3.5 bg-[#5c3a28] hover:bg-[#784b31] text-amber-100 rounded-xl font-bold transition flex items-center gap-2 border-2 border-amber-600/40 shadow-md"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Review Kemah Belajar</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onRestartGame();
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-amber-100 rounded-2xl font-bold shadow-xl transition transform active:scale-98 flex items-center gap-2 border-2 border-emerald-500/50"
            >
              <RotateCcw className="w-5 h-5 text-amber-300" />
              <span>Mulai Ekspedisi Baru</span>
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE POS QUIZ AREA */
        <div className="space-y-6">
          {/* Pos Location Header */}
          <div className="flex items-center justify-between border-b-2 border-[#b89b72] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#5c3a28] text-amber-200 flex items-center justify-center font-bold text-xs shadow">
                <MapPin className="w-4 h-4 text-amber-400" />
              </span>
              <span className="font-bold text-[#3d261a] text-sm md:text-base font-serif">
                {currentPos.location}
              </span>
            </div>

            <span className="px-3.5 py-1 bg-[#5c3a28] text-amber-200 text-xs font-black rounded-full border border-amber-500/40 shadow-sm">
              Pos {currentPosIndex + 1} / 5
            </span>
          </div>

          {/* Pos Scenario Content */}
          <div className="bg-[#ebd2b0]/80 p-6 rounded-2xl border-2 border-[#b89b72] shadow-md space-y-3">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#3d261a]">
              {currentPos.title}
            </h3>
            <p className="text-[#2b1810] text-base md:text-lg leading-relaxed font-semibold bg-[#fcf8ef] p-4 rounded-xl border border-[#cbb08b]">
              "{currentPos.scenario}"
            </p>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPos.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <button
                  key={option.id}
                  disabled={hasAnsweredCorrectly}
                  onClick={() => handleSelectOption(option.id, option.isCorrect)}
                  className={`p-5 rounded-2xl border-2 text-left font-bold text-base md:text-lg transition-all shadow-md flex items-center justify-between gap-3 ${
                    isSelected && option.isCorrect
                      ? 'bg-[#1c4d37] text-amber-100 border-[#0f3022] ring-2 ring-emerald-500'
                      : isSelected && !option.isCorrect
                      ? 'bg-red-950 text-amber-100 border-red-700'
                      : 'bg-[#fcf8ef] text-[#2b1810] border-[#b89b72] hover:border-emerald-700 hover:bg-[#f3ead7]'
                  } ${hasAnsweredCorrectly && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span>{option.text}</span>
                  {isSelected && option.isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />}
                  {isSelected && !option.isCorrect && <XCircle className="w-6 h-6 text-red-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback Banner */}
          {feedbackMsg && (
            <div
              className={`p-5 rounded-2xl border-2 font-semibold text-sm md:text-base leading-relaxed space-y-1 animate-fadeIn shadow-sm ${
                feedbackMsg.isCorrect
                  ? 'bg-emerald-900/10 text-emerald-950 border-emerald-700'
                  : 'bg-red-900/10 text-red-950 border-red-700'
              }`}
            >
              <div className="font-bold flex items-center gap-2 text-base">
                {feedbackMsg.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-800" />
                    <span>Jawaban Benar!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-800" />
                    <span>Jawaban Belum Tepat! (Kurang 1 Nyawa)</span>
                  </>
                )}
              </div>
              <p>{feedbackMsg.text}</p>
            </div>
          )}

          {/* Next Button */}
          {hasAnsweredCorrectly && (
            <button
              onClick={handleNextPos}
              className="w-full py-4 bg-gradient-to-r from-[#214a36] to-[#122e21] hover:from-[#2a5d44] hover:to-[#193d2d] text-amber-100 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition transform active:scale-98 flex items-center justify-center gap-2 border-2 border-emerald-500/50 animate-fadeIn font-serif"
            >
              <span>Lanjut ke Pos Berikutnya</span>
              <ArrowRight className="w-5 h-5 text-amber-300" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
