import React, { useState } from 'react';
import { Bell, Volume2, VolumeX } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import { Logo } from '../ui/Logo';
import { BalanceChip } from '../ui/BalanceChip';
import { AddCoinsModal } from './AddCoinsModal';
import { NotificationModal } from './NotificationModal';

export const Header = () => {
  const navigate = useNavigate();
  const { balance } = useWallet();
  const { soundEnabled, toggleSound, play } = useSound();
  const [showAddCoins, setShowAddCoins] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0B0F1E]/90 backdrop-blur-xl border-b border-white/10 px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
          {/* Logo */}
          <Link
            to="/home"
            onClick={() => play && play.click()}
            className="flex items-center gap-1.5 group select-none"
          >
            <Logo variant="small" />
          </Link>

          {/* Right Section: Sound, Gold Balance Chip, Notifications */}
          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-brand-purple" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Gold Balance Chip */}
            <BalanceChip
              balance={balance}
              onClick={() => {
                if (play) play.click();
                navigate('/wallet');
              }}
              onAddClick={() => {
                if (play) play.click();
                setShowAddCoins(true);
              }}
            />

            {/* Notifications */}
            <button
              onClick={() => {
                if (play) play.click();
                setShowNotifications(true);
              }}
              className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <AddCoinsModal isOpen={showAddCoins} onClose={() => setShowAddCoins(false)} />
      <NotificationModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </>
  );
};
