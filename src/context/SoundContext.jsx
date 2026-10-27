import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundService } from '../services/soundService';

const SoundContext = createContext(null);

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('youngclub_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    soundService.setEnabled(soundEnabled);
    localStorage.setItem('youngclub_sound_enabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundService.setEnabled(next);
      if (next) {
        soundService.playClick();
      }
      return next;
    });
  };

  const play = {
    click: () => soundService.playClick(),
    chip: () => soundService.playChip(),
    cashout: () => soundService.playCashout(),
    win: () => soundService.playWin(),
    lose: () => soundService.playLose(),
    explosion: () => soundService.playExplosion(),
    tick: () => soundService.playTick(),
    spin: () => soundService.playSpinTick(),
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, play }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within SoundProvider');
  }
  return context;
};
