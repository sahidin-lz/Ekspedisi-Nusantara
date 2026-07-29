import React, { useState } from 'react';
import { PlayerProfile } from './types';
import { Navbar } from './components/Navbar';
import { DiagnosticAssessment } from './components/DiagnosticAssessment';
import { LearningCamp } from './components/LearningCamp';
import { ExpeditionGame } from './components/ExpeditionGame';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3 | 4>(1);
  const [prevScreen, setPrevScreen] = useState<1 | 2 | 3>(1);
  const [player, setPlayer] = useState<PlayerProfile | null>(null);

  const handleDiagnosticComplete = (profile: PlayerProfile) => {
    setPlayer(profile);
    setCurrentScreen(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartGame = () => {
    setCurrentScreen(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCamp = () => {
    setCurrentScreen(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setPlayer(null);
    setCurrentScreen(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    if (currentScreen !== 4) {
      setPrevScreen(currentScreen as 1 | 2 | 3);
    }
    setCurrentScreen(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseAdmin = () => {
    setCurrentScreen(prevScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen px-4 py-6 md:px-8 md:py-8 font-sans selection:bg-amber-800 selection:text-amber-100">
      <div className="max-w-6xl mx-auto">
        <Navbar
          player={player}
          currentScreen={currentScreen}
          onRestart={handleRestart}
          onGoToCamp={handleGoToCamp}
          onOpenAdmin={handleOpenAdmin}
        />

        <main className="transition-all duration-300">
          {currentScreen === 1 && (
            <DiagnosticAssessment onComplete={handleDiagnosticComplete} />
          )}

          {currentScreen === 2 && player && (
            <LearningCamp player={player} onStartGame={handleStartGame} />
          )}

          {currentScreen === 3 && player && (
            <ExpeditionGame
              player={player}
              onRestartGame={handleRestart}
              onGoToCamp={handleGoToCamp}
            />
          )}

          {currentScreen === 4 && (
            <AdminDashboard
              onCloseAdmin={handleCloseAdmin}
              activePlayerName={player?.name}
            />
          )}
        </main>

        <footer className="mt-12 pt-6 border-t border-amber-800/50 text-center text-xs text-amber-300/80 space-y-1">
          <p className="font-bold text-amber-200">
            Ekspedisi Nusantara: Sosiologi Multikultural • Kurikulum Merdeka SMA
          </p>
          <p className="text-amber-400/70">
            Media Pembelajaran Interaktif Berdiferensiasi (Jurnalis, Fotografer, Petualang)
          </p>
        </footer>
      </div>
    </div>
  );
}
