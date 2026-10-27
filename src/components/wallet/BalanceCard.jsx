import React, { useState } from 'react';
import { Coins, Plus, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useAuth } from '../../context/AuthContext';
import { useSound } from '../../context/SoundContext';
import { AddCoinsModal } from '../common/AddCoinsModal';

export const BalanceCard = () => {
  const { balance } = useWallet();
  const { currentUser } = useAuth();
  const { play } = useSound();
  const [showAddCoins, setShowAddCoins] = useState(false);

  const userId = currentUser?.id || 'YC-7620';
  const maskedId = `${userId.slice(0, 3)}****${userId.slice(-4)}`;

  return (
    <>
      {/* Credit-Card Style Luxury Balance Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-[#1C254C] via-[#141A38] to-[#0A0D1E] border border-brand-gold/30 shadow-2xl space-y-5">
        {/* Ambient Glows */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Card Row */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-gold to-brand-goldEnd p-0.5 shadow-glow-gold flex items-center justify-center">
              <Coins className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="text-xs font-black font-display tracking-wider text-white">
                YOUNG CLUB WALLET
              </div>
              <div className="text-[10px] text-slate-400 font-num">
                {maskedId} &bull; Practice Account
              </div>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-brand-gold text-[10px] font-black uppercase font-num flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Virtual Coins</span>
          </span>
        </div>

        {/* Big Balance Number */}
        <div className="relative z-10 pt-1">
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
            Available Virtual Balance
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl sm:text-5xl font-black font-display tracking-tight bg-gradient-to-r from-white via-amber-200 to-brand-gold bg-clip-text text-transparent">
              {Number(balance).toLocaleString()}
            </span>
            <span className="text-sm font-black text-brand-gold font-num tracking-widest uppercase">
              COINS
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="relative z-10 pt-1">
          <button
            onClick={() => {
              if (play) play.click();
              setShowAddCoins(true);
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-gold via-amber-400 to-brand-goldEnd hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm tracking-wide shadow-glow-gold transition-all active:scale-97 flex items-center justify-center gap-2 font-num"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>ADD FREE VIRTUAL COINS</span>
          </button>
        </div>
      </div>

      <AddCoinsModal isOpen={showAddCoins} onClose={() => setShowAddCoins(false)} />
    </>
  );
};
