import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, Clock, Check } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useAuth } from '../../context/AuthContext';
import { walletService } from '../../services/walletService';

export const DailyBonusCard = () => {
  const { currentUser } = useAuth();
  const { claimDailyBonus } = useWallet();
  const [countdown, setCountdown] = useState('');
  const [canClaim, setCanClaim] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const updateTimer = () => {
      const status = walletService.checkDailyBonusStatus(currentUser.id);
      setCanClaim(status.canClaim);

      if (!status.canClaim && status.remainingMs > 0) {
        const totalSecs = Math.floor(status.remainingMs / 1000);
        const hours = Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;
        setCountdown(
          `${hours.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        );
      } else {
        setCountdown('');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [currentUser]);

  return (
    <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-purple-900/40 via-[#161D3A] to-amber-950/30 border border-brand-gold/30 backdrop-blur-md shadow-lg flex items-center justify-between gap-3">
      {/* Decorative Glow */}
      <div className="absolute -left-4 -top-4 w-20 h-20 bg-brand-gold/15 rounded-full blur-xl pointer-events-none" />

      {/* Left Details */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-gold to-brand-goldEnd flex items-center justify-center text-slate-950 font-black shadow-glow-gold shrink-0">
          <Gift className="w-6 h-6 text-slate-950" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-extrabold text-white">Daily Bonus</span>
            <span className="px-2 py-0.5 text-[10px] font-black font-num rounded-md bg-brand-gold/20 text-brand-gold border border-brand-gold/40">
              +100 COINS
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            {canClaim ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Ready to claim now!</span>
              </span>
            ) : (
              <span className="font-num font-bold text-slate-400">
                Next claim in: <strong className="text-brand-gold">{countdown}</strong>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Right Action Button */}
      <button
        type="button"
        disabled={!canClaim}
        onClick={claimDailyBonus}
        className={`px-4 py-2.5 rounded-xl font-black text-xs font-num flex items-center gap-1.5 transition-all shrink-0 ${
          canClaim
            ? 'bg-gradient-to-r from-brand-gold to-brand-goldEnd hover:from-amber-300 hover:to-orange-400 text-slate-950 shadow-glow-gold active:scale-95 animate-pulse'
            : 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed'
        }`}
      >
        {canClaim ? (
          <>
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLAIM</span>
          </>
        ) : (
          <>
            <Clock className="w-3.5 h-3.5" />
            <span>CLAIMED</span>
          </>
        )}
      </button>
    </div>
  );
};
