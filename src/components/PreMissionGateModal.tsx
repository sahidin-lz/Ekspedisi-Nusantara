import React, { useState } from 'react';
import { PRE_MISSION_QUESTIONS } from '../data/sociologyData';
import { ProfileType } from '../types';
import { soundFx } from '../utils/audio';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
  Award,
  Lock,
  Unlock,
  Headphones,
  Eye,
  Activity,
} from 'lucide-react';

interface PreMissionGateModalProps {
  onPassGate: () => void;
  onCancel: () => void;
  activeProfileType?: ProfileType;
  onUpdateProfileType?: (newType: ProfileType) => void;
}

export const PreMissionGateModal: React.FC<PreMissionGateModalProps> = ({
  onPassGate,
  onCancel,
  activeProfileType = 'Jurnalis',
  onUpdateProfileType,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedProfile, setSelectedProfile] = useState<ProfileType>(activeProfileType);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = PRE_MISSION_QUESTIONS[currentIdx];

  const handleSelectOption = (key: string, isCorrect: boolean) => {
    if (isAnswered) return;

    setSelectedKey(key);
    setIsAnswered(true);
    setShowExplanation(true);

    if (isCorrect) {
      soundFx.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      soundFx.playWrong();
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    if (currentIdx + 1 < PRE_MISSION_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedKey(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative bg-[#faf3e0] text-[#2b1810] rounded-3xl border-4 border-[#8c5a3c] p-6 md:p-8 max-w-2xl w-full shadow-2xl my-auto space-y-6">
        {/* Parchment Corner Accents */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#8c5a3c]"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#8c5a3c]"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#8c5a3c]"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#8c5a3c]"></div>

        {/* Modal Header */}
        <div className="text-center space-y-2 border-b-2 border-[#b89b72] pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#5c3a28] text-amber-200 text-xs font-bold rounded-full border border-amber-500/40 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>GERBANG EKSPEDISI: Verifikasi Bukti Belajar</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#3d261a]">
            Ujian Sebelum Misi Lapangan
          </h3>

          <p className="text-xs md:text-sm text-stone-700 font-semibold max-w-lg mx-auto">
            Jawab pertanyaan pemahaman materi Kemah Belajar ini sebagai syarat pembuktian pengetahuan sebelum terjun ke 5 pos ekspedisi!
          </p>
        </div>

        {/* FINISHED GATE UNLOCKED VIEW */}
        {isFinished ? (
          <div className="text-center space-y-6 py-4 animate-fadeIn">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-emerald-800 text-amber-100 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-400 shadow-2xl">
                {score >= 3 ? (
                  <Unlock className="w-10 h-10 text-amber-300 animate-bounce" />
                ) : (
                  <Lock className="w-10 h-10 text-amber-300" />
                )}
              </div>
              <Sparkles className="w-6 h-6 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 bg-amber-200 text-amber-950 font-extrabold text-xs rounded-full border border-amber-400">
                Skor Bukti Belajar: {score} / {PRE_MISSION_QUESTIONS.length} Benar
              </span>
              <h4 className="text-xl md:text-2xl font-serif font-bold text-[#3d261a]">
                {score >= 3
                  ? '🎉 Selamat! Paspor Penjelajah Multikultural Terverifikasi!'
                  : '⚠️ Kamu Perlu Memantapkan Materi Kembali'}
              </h4>
              <p className="text-xs md:text-sm text-stone-800 font-semibold max-w-md mx-auto leading-relaxed">
                {score >= 3
                  ? 'Kamu terbukti telah mempelajari video dan materi di Kemah Belajar dengan sungguh-sungguh. Gerbang ekspedisi telah terbuka lebar!'
                  : 'Kamu belum memenuhi skor minimal. Disarankan untuk menonton ulang video atau membaca rangkuman di Kemah Belajar.'}
              </p>
            </div>

            {/* JENIS PETUALANGAN SELECTOR */}
            <div className="bg-[#ebd2b0]/80 p-4 rounded-2xl border-2 border-[#b89b72] space-y-2 max-w-md mx-auto">
              <span className="text-xs font-bold text-[#3d261a] block">
                🧭 Konfirmasi / Pilih Jenis Petualangan Lapangan:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {(['Jurnalis', 'Fotografer', 'Petualang'] as ProfileType[]).map((type) => {
                  const isSel = selectedProfile === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedProfile(type);
                        if (onUpdateProfileType) onUpdateProfileType(type);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow ${
                        isSel
                          ? 'bg-[#214a36] text-amber-100 ring-2 ring-emerald-400 border border-emerald-300 font-black scale-105'
                          : 'bg-[#fcf8ef] text-[#3d261a] border border-[#b89b72] hover:bg-amber-100'
                      }`}
                    >
                      {type === 'Jurnalis' && <Headphones className="w-3.5 h-3.5 text-amber-300" />}
                      {type === 'Fotografer' && <Eye className="w-3.5 h-3.5 text-amber-300" />}
                      {type === 'Petualang' && <Activity className="w-3.5 h-3.5 text-amber-300" />}
                      <span>{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onCancel}
                className="w-full sm:w-auto px-5 py-3 bg-[#5c3a28] hover:bg-[#784b31] text-amber-100 rounded-xl font-bold text-sm transition border border-amber-600/40 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Ulas Kemah Belajar</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onPassGate();
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#214a36] to-[#122e21] hover:from-[#2a5d44] hover:to-[#193d2d] text-amber-100 rounded-xl font-black text-base shadow-xl transition transform active:scale-95 border-2 border-emerald-500/50 flex items-center justify-center gap-2 font-serif"
              >
                <span>Masuk Misi Ekspedisi Lapangan!</span>
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE QUESTION VIEW */
          <div className="space-y-5">
            {/* Question Counter Header */}
            <div className="flex justify-between items-center text-xs border-b border-[#cbb08b] pb-2">
              <span className="font-bold text-[#3d261a] font-serif">
                {currentQ.moduleReference}
              </span>
              <span className="px-2.5 py-0.5 bg-[#ebd2b0] text-amber-950 font-mono font-bold rounded-lg border border-[#b89b72]">
                Soal {currentIdx + 1} dari {PRE_MISSION_QUESTIONS.length}
              </span>
            </div>

            {/* Question Text */}
            <div className="bg-[#ebd2b0]/70 p-5 rounded-2xl border-2 border-[#b89b72] shadow-inner space-y-2">
              <p className="font-bold text-[#3d261a] text-base md:text-lg leading-relaxed">
                "{currentQ.question}"
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedKey === opt.key;
                return (
                  <button
                    key={opt.key}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt.key, opt.isCorrect)}
                    className={`w-full p-4 rounded-xl border-2 text-left font-semibold text-sm transition-all flex items-center justify-between gap-3 ${
                      isSelected && opt.isCorrect
                        ? 'bg-[#1c4d37] text-amber-100 border-[#0f3022] ring-2 ring-emerald-500 shadow-md'
                        : isSelected && !opt.isCorrect
                        ? 'bg-red-950 text-amber-100 border-red-700 shadow-md'
                        : isAnswered && opt.isCorrect
                        ? 'bg-[#1c4d37]/80 text-amber-100 border-emerald-600'
                        : 'bg-[#fcf8ef] text-[#2b1810] border-[#b89b72] hover:border-emerald-700 hover:bg-[#f3ead7]'
                    } ${isAnswered && !isSelected ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected
                            ? 'bg-amber-400 text-emerald-950'
                            : 'bg-[#e2d4be] text-stone-900 border border-[#b89b72]'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </div>

                    {isAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Banner */}
            {showExplanation && (
              <div className="p-4 bg-[#f2e2c9] border-2 border-[#b89b72] rounded-xl text-xs md:text-sm text-stone-900 font-medium space-y-1 animate-fadeIn">
                <span className="font-bold text-[#3d261a] block">💡 Penjelasan / Catatan Belajar:</span>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Modal Controls */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={onCancel}
                className="text-xs text-stone-600 font-bold hover:underline"
              >
                Batal / Kembali Ke Kemah
              </button>

              {isAnswered && (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-[#214a36] to-[#122e21] hover:from-[#2a5d44] hover:to-[#193d2d] text-amber-100 rounded-xl font-bold text-sm shadow-lg transition flex items-center gap-2 border border-emerald-500/40"
                >
                  <span>
                    {currentIdx + 1 < PRE_MISSION_QUESTIONS.length
                      ? 'Pertanyaan Selanjutnya'
                      : 'Lihat Hasil Verifikasi'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
