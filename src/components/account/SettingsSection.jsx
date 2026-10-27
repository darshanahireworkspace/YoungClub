import React from 'react';
import { Volume2, VolumeX, Bell, BellOff, RefreshCw, Settings } from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../../context/ToastContext';

export const SettingsSection = () => {
  const { soundEnabled, toggleSound, play } = useSound();
  const { currentUser, updateSettings } = useAuth();
  const { addCoins } = useWallet();
  const { success } = useToast();

  const notificationsEnabled = currentUser?.settings?.notifications ?? true;

  const handleToggleNotifications = () => {
    play.click();
    updateSettings({ notifications: !notificationsEnabled });
    success(!notificationsEnabled ? 'Notifications enabled' : 'Notifications muted');
  };

  const handleResetBalance = () => {
    play.cashout();
    addCoins(5000, 'Demo Balance Reset');
    success('Virtual balance replenished to 5,000 Coins!');
  };

  return (
    <div className="rounded-2xl p-4 glass-card border border-white/10 bg-[#0c102a]/90 space-y-3">
      <div className="flex items-center gap-2">
        <Settings className="w-4 h-4 text-cyan-400" />
        <h4 className="text-sm font-bold text-white">App Preferences</h4>
      </div>

      <div className="space-y-2">
        {/* Sound Effects */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </div>
            <div>
              <div className="text-xs font-bold text-white">Sound Effects</div>
              <div className="text-[10px] text-slate-400">Audio feedback during gameplay</div>
            </div>
          </div>
          <button
            onClick={toggleSound}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              soundEnabled ? 'bg-cyan-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                soundEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Notifications */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4 text-slate-500" />}
            </div>
            <div>
              <div className="text-xs font-bold text-white">In-App Alerts</div>
              <div className="text-[10px] text-slate-400">Wins and bonus reminder banners</div>
            </div>
          </div>
          <button
            onClick={handleToggleNotifications}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              notificationsEnabled ? 'bg-purple-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Quick Replenish Demo Balance */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Replenish Virtual Coins</div>
              <div className="text-[10px] text-slate-400">Add +5,000 practice coins</div>
            </div>
          </div>
          <button
            onClick={handleResetBalance}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all active:scale-95"
          >
            +5,000
          </button>
        </div>
      </div>
    </div>
  );
};
