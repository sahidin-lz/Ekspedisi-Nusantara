import React, { useState } from 'react';
import { Compass, Volume2, VolumeX, Download, RotateCcw, BookOpen, ShieldCheck } from 'lucide-react';
import { PlayerProfile } from '../types';
import { getAvatarById } from '../data/avatarData';
import { soundFx } from '../utils/audio';
import { generateSingleFileHTML } from '../utils/singleFileExport';

interface NavbarProps {
  player: PlayerProfile | null;
  currentScreen: 1 | 2 | 3 | 4;
  onRestart: () => void;
  onGoToCamp?: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ player, currentScreen, onRestart, onGoToCamp, onOpenAdmin }) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getMuted());

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFx.playClick();
  };

  const handleDownloadSingleHTML = () => {
    soundFx.playClick();
    const htmlContent = generateSingleFileHTML();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ekspedisi_Nusantara_Sosiologi.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const currentAvatar = player ? getAvatarById(player.avatarId) : null;

  return (
    <header className="relative bg-[#2b1810] text-amber-100 rounded-3xl p-5 mb-6 border-4 border-[#8c5a3c] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4 transition-all overflow-hidden">
      {/* Wood texture highlight overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4a373_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>

      <div className="flex items-center gap-3.5 relative z-10">
        <div className="w-13 h-13 rounded-2xl bg-[#5c3a28] border-2 border-amber-500/50 flex items-center justify-center text-amber-300 shadow-xl ring-2 ring-amber-900/50">
          <Compass className="w-8 h-8 text-amber-400 animate-spin-slow" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold font-serif text-amber-200 tracking-wide drop-shadow-md">
              Ekspedisi Nusantara
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-amber-900/90 text-amber-300 text-[11px] font-bold rounded-full border border-amber-500/40 uppercase tracking-wider">
              🎮 RPG Edukasi
            </span>
          </div>
          <p className="text-xs text-amber-300/80 font-medium flex items-center gap-1">
            <span>Sosiologi Multikultural SMA</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Kurikulum Merdeka</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 relative z-10">
        {player && (
          <div className="bg-[#1c0f0a]/90 border-2 border-amber-600/40 px-3.5 py-1.5 rounded-2xl flex items-center gap-2 text-xs shadow-inner">
            <span className="text-xl filter drop-shadow">{currentAvatar?.emoji || '🤠'}</span>
            <div className="flex flex-col">
              <span className="text-amber-200 font-bold leading-none">{player.name}</span>
              <span className="text-[10px] text-amber-400/80 font-mono">
                {currentAvatar?.name || player.profileType}
              </span>
            </div>
            <span className="bg-amber-600/30 text-amber-300 px-2 py-0.5 rounded-lg font-bold uppercase tracking-wider text-[10px] border border-amber-500/40 ml-1">
              {player.profileType === 'Jurnalis' && '🗞️ Auditori'}
              {player.profileType === 'Fotografer' && '📸 Visual'}
              {player.profileType === 'Petualang' && '🧭 Kinestetik'}
            </span>
          </div>
        )}

        {currentScreen === 3 && onGoToCamp && (
          <button
            onClick={() => {
              soundFx.playClick();
              onGoToCamp();
            }}
            className="px-3.5 py-2 bg-[#5c3d2e] hover:bg-[#784b31] text-amber-100 rounded-xl text-xs font-bold border-2 border-amber-600/50 flex items-center gap-1.5 transition shadow-md active:scale-95"
            title="Kembali ke Kemah Belajar"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Kemah Belajar</span>
          </button>
        )}

        {onOpenAdmin && (
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenAdmin();
            }}
            className="px-3.5 py-2 bg-[#214a36] hover:bg-[#2a5d44] text-amber-100 rounded-xl text-xs font-bold border-2 border-emerald-500/50 flex items-center gap-1.5 transition shadow-lg active:scale-95 animate-pulse"
            title="Buka Dashboard Guru / Admin untuk Kelola Materi & Kontrol Siswa"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Dashboard Guru</span>
          </button>
        )}

        <button
          onClick={handleToggleSound}
          className="p-2.5 bg-[#5c3d2e] hover:bg-[#784b31] text-amber-200 rounded-xl border-2 border-amber-600/50 transition text-xs flex items-center justify-center shadow-md active:scale-95"
          title={isMuted ? 'Buka Suara Game' : 'Mute Suara Game'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        <button
          onClick={handleDownloadSingleHTML}
          className="px-3.5 py-2 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-amber-100 rounded-xl text-xs font-bold border-2 border-emerald-500/50 flex items-center gap-1.5 transition shadow-lg active:scale-95"
          title="Unduh Game dalam 1 File HTML Utuh untuk Offline"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span className="hidden sm:inline">Unduh Game HTML</span>
        </button>

        {currentScreen > 1 && (
          <button
            onClick={() => {
              soundFx.playClick();
              onRestart();
            }}
            className="p-2.5 bg-[#5c3d2e] hover:bg-[#784b31] text-amber-200 rounded-xl border-2 border-amber-600/50 transition text-xs flex items-center justify-center shadow-md active:scale-95"
            title="Mulai Ulang Asesmen"
          >
            <RotateCcw className="w-4 h-4 text-amber-300" />
          </button>
        )}
      </div>
    </header>
  );
};
