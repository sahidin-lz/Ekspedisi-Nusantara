import React, { useState } from 'react';
import { PlayerProfile, ProfileType } from '../types';
import { SOCIOLOGY_MODULES } from '../data/sociologyData';
import { getAvatarById } from '../data/avatarData';
import { soundFx } from '../utils/audio';
import { ExpeditionMap } from './ExpeditionMap';
import { VideoLessonPlayer } from './VideoLessonPlayer';
import { PreMissionGateModal } from './PreMissionGateModal';
import {
  BookOpen,
  Camera,
  Compass,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Key,
  ShieldAlert,
  Layers,
  Activity,
  Users,
  Eye,
  CheckCircle2,
  FileText,
  Map,
  Tv,
  ShieldCheck,
} from 'lucide-react';

interface LearningCampProps {
  player: PlayerProfile;
  onStartGame: () => void;
  onUpdateProfileType?: (newType: ProfileType) => void;
}

export const LearningCamp: React.FC<LearningCampProps> = ({
  player,
  onStartGame,
  onUpdateProfileType,
}) => {
  const [activeType, setActiveType] = useState<ProfileType>(player.profileType);
  const [mediaMode, setMediaMode] = useState<'all' | 'video' | 'text' | 'visual' | 'interactive'>('all');
  const [openChests, setOpenChests] = useState<Record<string, boolean>>({});
  const [showGateModal, setShowGateModal] = useState<boolean>(false);

  const handleSelectType = (t: ProfileType) => {
    soundFx.playClick();
    setActiveType(t);
    if (onUpdateProfileType) {
      onUpdateProfileType(t);
    }
  };

  const toggleChest = (chestKey: string) => {
    soundFx.playChestOpen();
    setOpenChests((prev) => ({ ...prev, [chestKey]: !prev[chestKey] }));
  };

  const handleOpenGateCheck = () => {
    soundFx.playClick();
    setShowGateModal(true);
  };

  const handlePassGateAndStart = () => {
    setShowGateModal(false);
    onStartGame();
  };

  return (
    <div className="relative bg-[#faf3e0] rounded-3xl border-4 border-[#8c5a3c] p-6 md:p-10 shadow-2xl max-w-5xl mx-auto my-4 space-y-8 text-[#2b1810]">
      {/* Pre-Mission Gate Verification Modal */}
      {showGateModal && (
        <PreMissionGateModal
          onPassGate={handlePassGateAndStart}
          onCancel={() => setShowGateModal(false)}
          activeProfileType={activeType}
          onUpdateProfileType={handleSelectType}
        />
      )}
      {/* Ancient Wooden Decor Corners */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#8c5a3c]"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#8c5a3c]"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#8c5a3c]"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#8c5a3c]"></div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#3d261a] via-[#5c3a28] to-[#2b1810] text-amber-50 rounded-2xl p-6 md:p-8 border-2 border-amber-500/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3.5 py-1 bg-amber-500/20 text-amber-300 font-bold text-xs rounded-full border border-amber-500/40">
              🏕️ Layar 2: Kemah Belajar / Basecamp Materi Berdiferensiasi
            </span>

            {/* Profile Mode Toggle */}
            <div className="flex items-center gap-1 bg-[#1c0f0a] p-1 rounded-xl border border-amber-600/40 shadow-inner">
              <span className="text-[11px] text-amber-300 font-bold px-2 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> Lensa Tampilan:
              </span>
              {(['Jurnalis', 'Fotografer', 'Petualang'] as ProfileType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => handleSelectType(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    activeType === t
                      ? 'bg-amber-400 text-emerald-950 font-black shadow-md'
                      : 'text-amber-200 hover:text-white hover:bg-amber-900/50'
                  }`}
                >
                  {t === 'Jurnalis' && '📰 Teks'}
                  {t === 'Fotografer' && '📸 Visual'}
                  {t === 'Petualang' && '🧭 Interaktif'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-amber-600/30">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-inner shrink-0">
                {getAvatarById(player.avatarId).emoji}
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold font-serif text-amber-200 leading-tight">
                  Selamat datang di Kemah Belajar, <span className="text-amber-300 underline decoration-amber-400">{player.name}</span>!
                </h2>
                <p className="text-amber-200/90 text-xs md:text-sm font-medium">
                  Hero: <strong className="text-amber-300">{getAvatarById(player.avatarId).name}</strong> • Mode Gaya Belajar: <strong className="text-emerald-300 uppercase">{activeType}</strong>
                </p>
              </div>
            </div>

            <div className="bg-[#1c0f0a]/80 p-3 rounded-xl border border-amber-600/40 text-xs text-amber-200 font-serif italic max-w-sm">
              "{getAvatarById(player.avatarId).quote}"
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Expedition Map Preview */}
      <ExpeditionMap
        currentPosIndex={0}
        completedPosIndexes={[]}
        interactive={false}
      />

      {/* Modules Area */}
      <div className="space-y-10">
        {SOCIOLOGY_MODULES.map((module) => {
          return (
            <div key={module.id} className="bg-[#ebd2b0]/80 rounded-2xl border-2 border-[#b89b72] p-6 md:p-8 shadow-md space-y-6">
              {/* Module Header */}
              <div className="border-b-2 border-[#a67c52] pb-4 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#5c3a28] text-amber-200 flex items-center justify-center font-bold text-lg shadow-md border border-amber-500/30">
                    {module.id === 'gejala-sosial' && <Activity className="w-6 h-6" />}
                    {module.id === 'struktur-sosial' && <Layers className="w-6 h-6" />}
                    {module.id === 'prasangka-stereotipe' && <ShieldAlert className="w-6 h-6" />}
                    {module.id === 'multikulturalisme' && <Users className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#3d261a]">
                      {module.title}
                    </h3>
                    <p className="text-xs md:text-sm text-stone-700 font-semibold">
                      {module.subtitle}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 bg-[#5c3a28] text-amber-200 font-bold text-xs rounded-full border border-amber-500/40 flex items-center gap-1.5 shadow">
                  <Tv className="w-3.5 h-3.5 text-red-400" />
                  Video Lesson HD
                </span>
              </div>

              {/* VIDEO LESSON PLAYER MULTIMEDIA */}
              <div className="space-y-3">
                <VideoLessonPlayer module={module} />
              </div>

              {/* JURNALIS MODE (Detailed Paragraphs / Articles) */}
              {activeType === 'Jurnalis' && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-950 bg-amber-200 px-3 py-1 rounded-lg w-fit border border-amber-400">
                    <FileText className="w-3.5 h-3.5 text-amber-800" /> Sajian Mode Jurnalis (Teks Artikel & Analisis Detail)
                  </div>
                  <h4 className="text-lg font-bold text-[#3d261a]">
                    {module.jurnalisContent.heading}
                  </h4>
                  <div className="space-y-3">
                    {module.jurnalisContent.paragraphs.map((p, idx) => (
                      <p key={idx} className="text-stone-800 text-sm md:text-base leading-relaxed bg-[#fcf8ef] p-4 rounded-xl border border-[#cbb08b]">
                        {p}
                      </p>
                    ))}
                  </div>

                  <div className="bg-[#dcc09b] border-l-4 border-[#5c3a28] p-4 rounded-r-xl space-y-2">
                    <span className="font-bold text-[#3d261a] text-xs uppercase tracking-wider block">
                      📌 Rangkuman Poin Kunci Jurnalis:
                    </span>
                    <ul className="space-y-1 text-xs md:text-sm text-stone-900 font-semibold">
                      {module.jurnalisContent.keyPoints.map((kp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* FOTOGRAFER MODE (Visual Infographics / CSS Grid Gallery Cards) */}
              {activeType === 'Fotografer' && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-200 px-3 py-1 rounded-lg w-fit border border-emerald-400">
                    <Camera className="w-3.5 h-3.5 text-emerald-800" /> Sajian Mode Fotografer (Galeri Infografis Visual & Poin Tebal)
                  </div>

                  <h4 className="text-lg font-bold text-[#3d261a]">
                    {module.fotograferContent.headline}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {module.fotograferContent.gridItems.map((item, idx) => (
                      <div
                        key={idx}
                        className={`${item.colorBg} p-6 rounded-2xl shadow-lg border-2 border-amber-600/40 flex flex-col justify-between space-y-4`}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-black/30 tracking-wider text-amber-200">
                              {item.visualBadge || 'Visual Card'}
                            </span>
                          </div>
                          <h5 className="text-xl font-bold font-serif mb-1">{item.title}</h5>
                          {item.subtitle && <p className="text-xs opacity-90 mb-3 font-semibold">{item.subtitle}</p>}

                          {/* Render Stacked Layout or Standard Bullet Points */}
                          {item.layoutType === 'stacked' ? (
                            <div className="space-y-2 my-2">
                              {item.items.map((line, lIdx) => (
                                <div
                                  key={lIdx}
                                  className="p-2.5 bg-black/30 rounded-xl font-bold text-xs border border-white/20 tracking-wide"
                                >
                                  {line}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-2 text-xs md:text-sm font-medium">
                              {item.items.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PETUALANG MODE (Interactive Accordion Buttons & Chests) */}
              {activeType === 'Petualang' && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-950 bg-amber-300 px-3 py-1 rounded-lg w-fit border border-amber-500">
                    <Compass className="w-3.5 h-3.5 text-amber-900" /> Sajian Mode Petualang (Interaktif / Peti Rahasia Accordion)
                  </div>

                  <h4 className="text-lg font-bold text-[#3d261a]">
                    {module.petualangContent.chestTitle}
                  </h4>

                  <div className="space-y-3">
                    {module.petualangContent.secretKnowledge.map((item, idx) => {
                      const chestKey = `${module.id}-${idx}`;
                      const isOpen = !!openChests[chestKey];

                      return (
                        <div
                          key={idx}
                          className="bg-[#fcf8ef] rounded-2xl border-2 border-[#b89b72] shadow-sm overflow-hidden transition"
                        >
                          <button
                            onClick={() => toggleChest(chestKey)}
                            className="w-full p-4 text-left font-bold text-[#3d261a] flex items-center justify-between hover:bg-[#ebd2b0]/50 transition"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-xl bg-[#5c3a28] text-amber-200 flex items-center justify-center font-bold text-xs shrink-0 shadow">
                                <Key className="w-4 h-4 text-amber-400" />
                              </span>
                              <span className="text-sm md:text-base">{item.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 bg-amber-200 text-amber-950 text-[10px] font-extrabold rounded-full border border-amber-400">
                                {item.badge}
                              </span>
                              {isOpen ? <ChevronUp className="w-5 h-5 text-amber-900" /> : <ChevronDown className="w-5 h-5 text-amber-900" />}
                            </div>
                          </button>

                          {isOpen && (
                            <div className="p-5 bg-[#ebd2b0]/40 border-t border-[#b89b72] text-stone-900 text-sm md:text-base leading-relaxed space-y-2 animate-fadeIn font-medium">
                              <p>{item.content}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Start Adventure Mission Button - Triggers Pre-Mission Verification Gate */}
      <div className="text-center pt-6 border-t-2 border-[#b89b72] space-y-5">
        {/* Jenis Petualangan Selection Card */}
        <div className="bg-[#ebd2b0]/90 p-5 rounded-2xl border-2 border-[#b89b72] max-w-xl mx-auto space-y-3 shadow-md">
          <span className="text-xs font-bold text-[#3d261a] uppercase tracking-wider block font-serif">
            🧭 Pilihan Jenis Petualangan Lapangan Terpilih:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {(['Jurnalis', 'Fotografer', 'Petualang'] as ProfileType[]).map((type) => {
              const isSelected = activeType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleSelectType(type)}
                  className={`p-3 rounded-xl border-2 transition-all text-left flex flex-col justify-between space-y-1 shadow ${
                    isSelected
                      ? 'bg-[#214a36] text-amber-100 border-emerald-400 ring-2 ring-emerald-500 scale-102 font-bold'
                      : 'bg-[#fcf8ef] text-[#2b1810] border-[#b89b72] hover:bg-amber-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black font-serif">
                      {type === 'Jurnalis' && '📰 Jurnalis'}
                      {type === 'Fotografer' && '📸 Fotografer'}
                      {type === 'Petualang' && '🧭 Petualang'}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    )}
                  </div>
                  <p className={`text-[10px] leading-tight ${isSelected ? 'text-amber-200' : 'text-stone-600'}`}>
                    {type === 'Jurnalis' && 'Sajian Teks & Artikel'}
                    {type === 'Fotografer' && 'Sajian Infografis Visual'}
                    {type === 'Petualang' && 'Peti & Kuis Interaktif'}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleOpenGateCheck}
          className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#214a36] via-[#163627] to-[#0f241a] hover:from-[#2a5d44] hover:to-[#193d2d] text-amber-100 rounded-2xl font-black text-lg md:text-xl shadow-2xl hover:scale-102 transition transform active:scale-98 border-2 border-emerald-500/50 flex items-center justify-center gap-3 mx-auto tracking-wide font-serif"
        >
          <ShieldCheck className="w-6 h-6 text-emerald-400 animate-pulse" />
          <span>Lanjut ke Ujian Bukti Belajar & Misi Lapangan! ({activeType})</span>
          <ArrowRight className="w-6 h-6 text-amber-300" />
        </button>
        <p className="text-xs text-stone-700 font-bold">
          🛡️ Menuju Gerbang Verifikasi Pembuktian Belajar sebelum Akses 5 Pos Ekspedisi
        </p>
      </div>
    </div>
  );
};
