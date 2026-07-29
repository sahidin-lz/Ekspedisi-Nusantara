import React, { useState, useEffect, useRef } from 'react';
import { SociologyModule, VideoChapter } from '../types';
import { soundFx } from '../utils/audio';
import {
  Play,
  Pause,
  Tv,
  Clock,
  User,
  List,
  Sparkles,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Edit3,
  Upload,
  Plus,
  Trash2,
  X,
  Save,
  Video,
  FileVideo,
  Link as LinkIcon,
  RefreshCw,
} from 'lucide-react';

interface VideoLessonPlayerProps {
  module: SociologyModule;
}

export const VideoLessonPlayer: React.FC<VideoLessonPlayerProps> = ({ module }) => {
  // Local CRUD state for video content
  const [videoData, setVideoData] = useState({
    videoTitle: module.videoContent.videoTitle,
    speaker: module.videoContent.speaker,
    duration: module.videoContent.duration,
    chapters: [...module.videoContent.chapters],
    videoScript: [...module.videoContent.videoScript],
  });

  // Custom uploaded video URL (Blob object URL or external link)
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [customVideoInputUrl, setCustomVideoInputUrl] = useState<string>('');

  // Player controls state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentChapterIdx, setCurrentChapterIdx] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  // CRUD Modal State
  const [showCrudModal, setShowCrudModal] = useState<boolean>(false);
  const [crudTab, setCrudTab] = useState<'upload' | 'info' | 'chapters'>('upload');

  // New Chapter Form State
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newChapterTime, setNewChapterTime] = useState('');
  const [newChapterDesc, setNewChapterDesc] = useState('');

  // Editing Chapter Index
  const [editingChapterIdx, setEditingChapterIdx] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize when module changes
  useEffect(() => {
    setVideoData({
      videoTitle: module.videoContent.videoTitle,
      speaker: module.videoContent.speaker,
      duration: module.videoContent.duration,
      chapters: [...module.videoContent.chapters],
      videoScript: [...module.videoContent.videoScript],
    });
    setUploadedVideoUrl(null);
    setUploadedFileName('');
    setIsPlaying(false);
    setProgressPercent(0);
    setCurrentChapterIdx(0);
  }, [module.id]);

  // Video simulation timer when playing in simulation mode
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && !uploadedVideoUrl) {
      interval = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const next = prev + 2;
          // Auto update chapter based on progress
          if (next > 60 && videoData.chapters.length > 2) setCurrentChapterIdx(2);
          else if (next > 30 && videoData.chapters.length > 1) setCurrentChapterIdx(1);
          else setCurrentChapterIdx(0);
          return next;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, uploadedVideoUrl, videoData.chapters.length]);

  const togglePlay = () => {
    soundFx.playClick();
    if (uploadedVideoUrl && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (progressPercent >= 100) {
        setProgressPercent(0);
        setCurrentChapterIdx(0);
        setIsPlaying(true);
      } else {
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleSelectChapter = (idx: number) => {
    soundFx.playClick();
    setCurrentChapterIdx(idx);
    if (!uploadedVideoUrl) {
      if (idx === 0) setProgressPercent(10);
      else if (idx === 1) setProgressPercent(45);
      else setProgressPercent(75);
      setIsPlaying(true);
    }
  };

  // Handle local video file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundFx.playChestOpen();
      const url = URL.createObjectURL(file);
      setUploadedVideoUrl(url);
      setUploadedFileName(file.name);
      setIsPlaying(false);
      setProgressPercent(0);
    }
  };

  // Handle video URL input
  const handleApplyUrlInput = () => {
    if (customVideoInputUrl.trim()) {
      soundFx.playChestOpen();
      setUploadedVideoUrl(customVideoInputUrl.trim());
      setUploadedFileName('Video Eksternal (URL)');
      setIsPlaying(false);
      setProgressPercent(0);
    }
  };

  // CRUD: Add Chapter
  const handleAddChapter = () => {
    if (!newChapterTitle.trim() || !newChapterTime.trim()) return;
    soundFx.playClick();
    const newChap: VideoChapter = {
      title: newChapterTitle.trim(),
      time: newChapterTime.trim(),
      desc: newChapterDesc.trim() || 'Pembahasan bab video sosiologi.',
    };

    setVideoData((prev) => ({
      ...prev,
      chapters: [...prev.chapters, newChap],
    }));

    setNewChapterTitle('');
    setNewChapterTime('');
    setNewChapterDesc('');
  };

  // CRUD: Delete Chapter
  const handleDeleteChapter = (indexToDelete: number) => {
    soundFx.playClick();
    setVideoData((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((_, idx) => idx !== indexToDelete),
    }));
    if (currentChapterIdx >= videoData.chapters.length - 1) {
      setCurrentChapterIdx(0);
    }
  };

  // CRUD: Reset Video Data
  const handleResetVideo = () => {
    soundFx.playClick();
    setVideoData({
      videoTitle: module.videoContent.videoTitle,
      speaker: module.videoContent.speaker,
      duration: module.videoContent.duration,
      chapters: [...module.videoContent.chapters],
      videoScript: [...module.videoContent.videoScript],
    });
    setUploadedVideoUrl(null);
    setUploadedFileName('');
    setCustomVideoInputUrl('');
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#1e130c] rounded-2xl border-2 border-amber-600/40 p-4 md:p-6 shadow-xl text-amber-100 space-y-4 relative">
      {/* CRUD MANAGEMENT MODAL */}
      {showCrudModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative bg-[#faf3e0] text-[#2b1810] rounded-3xl border-4 border-[#8c5a3c] p-6 md:p-8 max-w-2xl w-full shadow-2xl space-y-5 my-auto">
            {/* Parchment Corner Accents */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#8c5a3c]"></div>
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#8c5a3c]"></div>
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#8c5a3c]"></div>
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#8c5a3c]"></div>

            {/* Modal Header */}
            <div className="flex justify-between items-center border-b-2 border-[#b89b72] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-800 text-amber-100 flex items-center justify-center font-bold">
                  <Video className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#3d261a]">
                  Kelola Video Pembelajaran (CRUD)
                </h3>
              </div>

              <button
                onClick={() => setShowCrudModal(false)}
                className="p-1.5 bg-[#ebd2b0] hover:bg-red-800 hover:text-amber-100 rounded-lg text-stone-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-[#b89b72] text-xs font-bold">
              <button
                onClick={() => setCrudTab('upload')}
                className={`px-4 py-2 border-b-2 flex items-center gap-1.5 ${
                  crudTab === 'upload'
                    ? 'border-emerald-800 text-emerald-950 font-black bg-[#ebd2b0]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" /> Upload Video
              </button>
              <button
                onClick={() => setCrudTab('info')}
                className={`px-4 py-2 border-b-2 flex items-center gap-1.5 ${
                  crudTab === 'info'
                    ? 'border-emerald-800 text-emerald-950 font-black bg-[#ebd2b0]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Judul & Info
              </button>
              <button
                onClick={() => setCrudTab('chapters')}
                className={`px-4 py-2 border-b-2 flex items-center gap-1.5 ${
                  crudTab === 'chapters'
                    ? 'border-emerald-800 text-emerald-950 font-black bg-[#ebd2b0]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <List className="w-3.5 h-3.5" /> Bab & Stempel Waktu ({videoData.chapters.length})
              </button>
            </div>

            {/* TAB 1: UPLOAD VIDEO */}
            {crudTab === 'upload' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-[#ebd2b0] rounded-2xl border-2 border-[#b89b72] space-y-3">
                  <h4 className="font-bold text-sm text-[#3d261a] flex items-center gap-2">
                    <FileVideo className="w-4 h-4 text-emerald-900" />
                    Upload File Video Lokal (MP4 / WebM / OGV):
                  </h4>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full sm:w-auto px-5 py-3 bg-[#5c3a28] hover:bg-[#784b31] text-amber-100 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 border border-amber-600/40"
                    >
                      <Upload className="w-4 h-4 text-amber-300" />
                      <span>Pilih File Video dari Perangkat</span>
                    </button>

                    {uploadedFileName && (
                      <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-400">
                        ✓ File Active: {uploadedFileName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-[#ebd2b0] rounded-2xl border-2 border-[#b89b72] space-y-3">
                  <h4 className="font-bold text-sm text-[#3d261a] flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-emerald-900" />
                    Atau Masukkan URL Link Video:
                  </h4>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customVideoInputUrl}
                      onChange={(e) => setCustomVideoInputUrl(e.target.value)}
                      placeholder="Contoh: https://sample-videos.com/video123.mp4"
                      className="flex-1 px-3 py-2 rounded-xl border-2 border-[#8c5a3c] bg-[#fcf8ef] text-stone-900 text-xs font-semibold focus:outline-none focus:border-emerald-800"
                    />
                    <button
                      type="button"
                      onClick={handleApplyUrlInput}
                      className="px-4 py-2 bg-[#214a36] hover:bg-[#2a5d44] text-amber-100 font-bold text-xs rounded-xl shadow transition"
                    >
                      Terapkan URL
                    </button>
                  </div>
                </div>

                {uploadedVideoUrl && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-950 rounded-xl text-xs flex justify-between items-center font-semibold">
                    <span>Memutar video kustom yang baru di-upload.</span>
                    <button
                      onClick={() => {
                        setUploadedVideoUrl(null);
                        setUploadedFileName('');
                      }}
                      className="px-3 py-1 bg-red-800 text-amber-100 rounded-lg text-[11px] font-bold"
                    >
                      Hapus Video Upload
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EDIT METADATA */}
            {crudTab === 'info' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#3d261a]">Judul Video Pembelajaran:</label>
                  <input
                    type="text"
                    value={videoData.videoTitle}
                    onChange={(e) =>
                      setVideoData((prev) => ({ ...prev, videoTitle: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-xl border-2 border-[#8c5a3c] bg-[#fcf8ef] text-stone-900 text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#3d261a]">Narasumber / Pemateri:</label>
                    <input
                      type="text"
                      value={videoData.speaker}
                      onChange={(e) =>
                        setVideoData((prev) => ({ ...prev, speaker: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-xl border-2 border-[#8c5a3c] bg-[#fcf8ef] text-stone-900 text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#3d261a]">Durasi (Menit):</label>
                    <input
                      type="text"
                      value={videoData.duration}
                      onChange={(e) =>
                        setVideoData((prev) => ({ ...prev, duration: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-xl border-2 border-[#8c5a3c] bg-[#fcf8ef] text-stone-900 text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CRUD CHAPTERS */}
            {crudTab === 'chapters' && (
              <div className="space-y-4 animate-fadeIn">
                {/* Form Add Chapter */}
                <div className="p-3 bg-[#ebd2b0] rounded-xl border border-[#b89b72] space-y-2">
                  <span className="text-xs font-bold text-[#3d261a] block">➕ Tambah Bab Video Baru:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Judul Bab..."
                      value={newChapterTitle}
                      onChange={(e) => setNewChapterTitle(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-[#8c5a3c] bg-[#fcf8ef] text-xs font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Stempel Waktu (cth: 02:15)..."
                      value={newChapterTime}
                      onChange={(e) => setNewChapterTime(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-[#8c5a3c] bg-[#fcf8ef] text-xs font-medium"
                    />
                    <button
                      type="button"
                      onClick={handleAddChapter}
                      className="px-3 py-1.5 bg-[#214a36] text-amber-100 rounded-lg text-xs font-bold shadow hover:bg-[#2a5d44] flex items-center justify-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Tambah Bab
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Deskripsi singkat bab..."
                    value={newChapterDesc}
                    onChange={(e) => setNewChapterDesc(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#8c5a3c] bg-[#fcf8ef] text-xs font-medium"
                  />
                </div>

                {/* Chapter List */}
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {videoData.chapters.map((chap, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-[#fcf8ef] rounded-xl border border-[#b89b72] flex items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#3d261a]">
                          Bab {idx + 1}: {chap.title}
                        </span>
                        <span className="ml-2 font-mono text-[10px] bg-[#ebd2b0] px-1.5 py-0.5 rounded border border-[#b89b72]">
                          {chap.time}
                        </span>
                        <p className="text-[11px] text-stone-600 leading-tight">{chap.desc}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteChapter(idx)}
                        className="p-1.5 bg-red-100 text-red-800 hover:bg-red-800 hover:text-white rounded-lg transition"
                        title="Hapus Bab"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Controls */}
            <div className="flex justify-between items-center pt-3 border-t-2 border-[#b89b72]">
              <button
                type="button"
                onClick={handleResetVideo}
                className="px-3 py-2 bg-stone-300 hover:bg-stone-400 text-stone-900 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Default
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setShowCrudModal(false);
                }}
                className="px-6 py-2.5 bg-[#214a36] hover:bg-[#2a5d44] text-amber-100 font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
              >
                <Save className="w-4 h-4 text-amber-300" /> Simpan & Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Title Bar & CRUD Button */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-700/40 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <Tv className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm md:text-base font-bold font-serif text-amber-200">
              {videoData.videoTitle}
            </h4>
            <div className="flex items-center gap-3 text-[11px] text-amber-300/70">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3 text-amber-400" /> {videoData.speaker}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" /> {videoData.duration} Min
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playClick();
              setShowCrudModal(true);
            }}
            className="px-3 py-1.5 bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 border border-amber-500/40 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-300" />
            <span>CRUD / Upload Video</span>
          </button>

          <span className="px-2.5 py-0.5 bg-red-950/80 text-red-300 text-[10px] font-bold rounded-full border border-red-500/40 uppercase tracking-wider flex items-center gap-1 hidden xs:flex">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            HD Video
          </span>
        </div>
      </div>

      {/* Main Video Screen: HTML5 Real Video Tag or Animated Parchment Player */}
      <div className="relative w-full h-52 md:h-72 bg-[#0a0604] rounded-xl border-2 border-amber-700/50 overflow-hidden flex flex-col justify-between p-3 shadow-inner">
        {uploadedVideoUrl ? (
          /* REAL UPLOADED HTML5 VIDEO PLAYER */
          <div className="w-full h-full relative flex items-center justify-center bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={uploadedVideoUrl}
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          /* ANIMATED SIMULATED VIDEO LESSON SCREEN */
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-[#1e130c]/80 to-black opacity-90 pointer-events-none"></div>

            {/* Video Watermark Badge */}
            <div className="relative z-10 flex justify-between items-center text-xs">
              <span className="bg-amber-950/90 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-600/40 font-mono text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Bab {currentChapterIdx + 1}: {videoData.chapters[currentChapterIdx]?.title || 'Ringkasan Video'}
              </span>
              <span className="bg-emerald-950/80 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-600/40 text-[11px] font-bold">
                {progressPercent >= 100 ? 'Selesai' : isPlaying ? 'Memutar...' : 'Di-pause'}
              </span>
            </div>

            {/* Dynamic Video Script Subtitle Display */}
            <div className="relative z-10 text-center space-y-2 max-w-xl mx-auto my-auto">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center mx-auto text-amber-300 shadow-xl backdrop-blur-sm">
                {isPlaying ? (
                  <Volume2 className="w-6 h-6 text-amber-400 animate-bounce" />
                ) : (
                  <Tv className="w-6 h-6 text-amber-300" />
                )}
              </div>
              <p className="text-xs md:text-sm font-semibold text-amber-100 bg-stone-950/80 px-4 py-2 rounded-xl border border-amber-500/30 shadow-lg leading-relaxed">
                "{videoData.videoScript[currentChapterIdx % videoData.videoScript.length]}"
              </p>
            </div>

            {/* Video Scrubber & Play Controls */}
            <div className="relative z-10 space-y-2 pt-2 border-t border-amber-800/40 bg-stone-950/60 -mx-3 -mb-3 p-3 backdrop-blur-md">
              <div className="w-full bg-amber-950 h-2 rounded-full overflow-hidden border border-amber-700/40 relative">
                <div
                  className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs pt-0.5">
                <button
                  onClick={togglePlay}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-lg flex items-center gap-1.5 transition shadow active:scale-95 text-xs"
                >
                  {progressPercent >= 100 ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" /> Putar Ulang
                    </>
                  ) : isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause Video
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" /> Putar Video
                    </>
                  )}
                </button>

                <span className="font-mono text-[11px] text-amber-300/80">
                  {Math.floor((progressPercent / 100) * 3.5)}:
                  {Math.floor(((progressPercent / 100) * 210) % 60)
                    .toString()
                    .padStart(2, '0')}{' '}
                  / {videoData.duration}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Chapters & Video Transcript Section */}
      <div className="space-y-2">
        <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
          <List className="w-3.5 h-3.5 text-amber-400" />
          Daftar Bab Video ({videoData.chapters.length} Bab):
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {videoData.chapters.map((chap, idx) => {
            const isActive = currentChapterIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectChapter(idx)}
                className={`p-2.5 rounded-xl border text-left transition text-xs flex flex-col justify-between space-y-1 ${
                  isActive
                    ? 'bg-amber-900/80 border-amber-400 text-amber-100 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-stone-900/60 border-amber-800/40 text-amber-200/80 hover:bg-amber-950/80'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] bg-amber-950 px-1.5 py-0.5 rounded border border-amber-700/40 text-amber-300">
                    {chap.time}
                  </span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <span className="font-bold text-amber-200">{chap.title}</span>
                <span className="text-[10px] text-amber-300/70 line-clamp-1">{chap.desc}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
