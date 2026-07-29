import React from 'react';
import { EXPEDITION_POSTS } from '../data/sociologyData';
import { Compass, MapPin, CheckCircle2, Lock, Navigation, Sparkles, Flag } from 'lucide-react';

interface ExpeditionMapProps {
  currentPosIndex: number;
  completedPosIndexes: number[];
  onSelectPos?: (index: number) => void;
  interactive?: boolean;
}

export const ExpeditionMap: React.FC<ExpeditionMapProps> = ({
  currentPosIndex,
  completedPosIndexes,
  onSelectPos,
  interactive = false,
}) => {
  // Map positions for SVG trail (percentage coordinates relative to map container)
  const mapNodes = [
    { x: 18, y: 55, icon: '🏙️', name: 'Terminal Jakarta', region: 'DKI Jakarta' },
    { x: 38, y: 38, icon: '🌊', name: 'Jalur Pantura', region: 'Jawa Tengah' },
    { x: 58, y: 68, icon: '🏔️', name: 'Desa Toraja', region: 'Sulawesi Selatan' },
    { x: 74, y: 42, icon: '☕', name: 'Kafe Bandung', region: 'Jawa Barat' },
    { x: 88, y: 25, icon: '🕌', name: 'Jantung Ibu Kota', region: 'Istiqlal - Katedral' },
  ];

  return (
    <div className="relative bg-[#2b1b12] rounded-3xl p-4 md:p-6 border-4 border-[#8c5a3c] shadow-2xl overflow-hidden text-amber-100">
      {/* Background Parchment & Compass Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4a373_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
      
      {/* Ancient Wood Corner Decorators */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-500/60 rounded-tl"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500/60 rounded-tr"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-500/60 rounded-bl"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500/60 rounded-br"></div>

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10 border-b border-amber-700/50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm md:text-base font-serif font-bold text-amber-200 tracking-wide flex items-center gap-1.5">
              <span>Peta Rute Ekspedisi Nusantara</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h4>
            <p className="text-[11px] text-amber-300/70">
              Jelajahi 5 Pos Strategis Sosiologi Multikultural
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-amber-950/80 px-3 py-1 rounded-xl border border-amber-600/30">
          <Flag className="w-3.5 h-3.5 text-emerald-400" />
          <span>Kemajuan: <strong className="text-emerald-300">{completedPosIndexes.length} / 5 Pos Unlocked</strong></span>
        </div>
      </div>

      {/* Map Canvas Trail */}
      <div className="relative w-full h-48 md:h-56 bg-[#4a3222] rounded-2xl border-2 border-amber-600/40 p-2 overflow-hidden shadow-inner flex items-center justify-center">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Decorative Compass Rose Watermark */}
        <div className="absolute right-4 bottom-2 opacity-15 pointer-events-none">
          <Compass className="w-28 h-28 text-amber-200" />
        </div>

        {/* SVG Route Line connecting all nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <path
            d={`M ${mapNodes[0].x}% ${mapNodes[0].y}% Q 28% 25%, ${mapNodes[1].x}% ${mapNodes[1].y}% T ${mapNodes[2].x}% ${mapNodes[2].y}% T ${mapNodes[3].x}% ${mapNodes[3].y}% T ${mapNodes[4].x}% ${mapNodes[4].y}%`}
            fill="none"
            stroke="#d4a373"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="opacity-70"
          />
        </svg>

        {/* Map Waypoints */}
        {EXPEDITION_POSTS.map((post, idx) => {
          const node = mapNodes[idx];
          const isCurrent = currentPosIndex === idx;
          const isCompleted = completedPosIndexes.includes(idx);
          const isLocked = !isCompleted && idx > currentPosIndex;

          return (
            <div
              key={post.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <button
                disabled={!interactive || isLocked}
                onClick={() => onSelectPos && onSelectPos(idx)}
                className={`group relative flex flex-col items-center transition-all ${
                  interactive && !isLocked ? 'cursor-pointer hover:scale-110' : 'cursor-default'
                }`}
              >
                {/* Current Active Location Pin Marker Pulse */}
                {isCurrent && (
                  <span className="absolute -top-3 w-8 h-8 rounded-full bg-emerald-500/40 animate-ping pointer-events-none"></span>
                )}

                {/* Node Icon Circle */}
                <div
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-2xl flex items-center justify-center font-bold shadow-lg border-2 transition-all ${
                    isCurrent
                      ? 'bg-amber-400 text-amber-950 border-amber-100 ring-4 ring-amber-500/50 scale-110 z-20'
                      : isCompleted
                      ? 'bg-emerald-800 text-amber-100 border-emerald-400'
                      : 'bg-stone-800 text-stone-400 border-stone-600 opacity-80'
                  }`}
                >
                  <span className="text-base md:text-lg">{node.icon}</span>

                  {/* Badge overlay for status */}
                  {isCompleted && (
                    <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-emerald-950 rounded-full p-0.5 shadow">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {isLocked && (
                    <span className="absolute -top-1 -right-1 bg-stone-900 text-amber-400/80 rounded-full p-0.5 border border-amber-600/40">
                      <Lock className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Node Title Tooltip/Badge */}
                <div className="mt-1 px-2 py-0.5 bg-stone-900/90 rounded-lg border border-amber-600/40 text-[10px] md:text-xs font-semibold text-amber-200 whitespace-nowrap shadow-md flex items-center gap-1">
                  <span>Pos {idx + 1}: {post.location}</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Location Info Strip */}
      <div className="mt-3 bg-amber-950/70 p-2.5 rounded-xl border border-amber-600/30 flex items-center justify-between text-xs text-amber-200">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Lokasi Ekspedisi Saat Ini: <strong className="text-amber-300">{EXPEDITION_POSTS[currentPosIndex].location}</strong> ({mapNodes[currentPosIndex].region})</span>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] text-amber-400/80">Sosiologi Multikultural</span>
      </div>
    </div>
  );
};
