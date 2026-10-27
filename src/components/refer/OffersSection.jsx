import React from 'react';
import { Calendar, Gift, Sparkles, Check, Flame, Zap, Award } from 'lucide-react';
import { STREAK_DAYS } from '../../services/mockData';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';

export const OffersSection = () => {
  const { currentUser } = useAuth();
  const { claimStreakDay, claimOffer } = useWallet();

  const userStreakDay = currentUser?.streakDay || 1;

  const handleClaimStreak = (day) => {
    claimStreakDay(day);
  };

  const handleClaimWeekend = () => {
    claimOffer('weekend_bonanza', 500, 'Weekend Bonanza Offer');
  };

  return (
    <div className="space-y-4">
      {/* 7-Day Check-in Streak Row with Day Circles */}
      <div className="rounded-3xl p-5 bg-[#11172E] border border-white/10 space-y-3.5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-magenta" />
            <h4 className="text-sm font-black uppercase tracking-wider text-white font-num">
              7-Day Check-in Streak
            </h4>
          </div>
          <span className="text-[10px] font-black uppercase font-num px-2.5 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-brand-gold" />
            Day {userStreakDay} of 7
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-snug">
          Check in every day to collect free coins. Day 7 unlocks the coveted Mega Chest (+500)!
        </p>

        {/* Day Circles Row */}
        <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          {STREAK_DAYS.map((item) => {
            const isCompleted = item.day < userStreakDay;
            const isCurrent = item.day === userStreakDay;
            const isMega = item.day === 7;

            return (
              <div
                key={item.day}
                className={`flex flex-col items-center p-2 rounded-2xl border transition-all min-w-[56px] text-center ${
                  isCurrent
                    ? 'bg-gradient-to-b from-purple-900/60 to-pink-900/60 border-brand-gold shadow-glow-gold scale-105'
                    : isCompleted
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-[#151C38] border-white/10 text-slate-400'
                }`}
              >
                <span className="text-[10px] font-black font-num text-slate-400 uppercase">
                  D{item.day}
                </span>

                {/* Circle Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center my-1 font-num font-black text-xs ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950 shadow-glow-green'
                      : isCurrent
                      ? 'bg-gradient-to-tr from-brand-gold to-brand-goldEnd text-slate-950 shadow-glow-gold'
                      : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isMega ? (
                    '👑'
                  ) : (
                    `+${item.reward}`
                  )}
                </div>

                {isCompleted ? (
                  <span className="text-[8px] font-black text-emerald-400 font-num">DONE</span>
                ) : isCurrent ? (
                  <button
                    onClick={() => handleClaimStreak(item.day)}
                    className="w-full py-0.5 rounded-md bg-brand-gold hover:bg-amber-300 text-slate-950 font-black text-[9px] font-num shadow-sm active:scale-95 transition-all"
                  >
                    CLAIM
                  </button>
                ) : (
                  <span className="text-[8px] text-slate-500 font-num">LOCK</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Offers Horizontal Scroll Cards */}
      <div className="space-y-2">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 font-num">
          Special Bonus Offers
        </h4>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {/* Weekend Bonanza */}
          <div className="w-56 shrink-0 p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-[#182042] to-[#0D1226] border border-brand-gold/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-brand-gold text-xs font-bold mb-1">
                <Zap className="w-4 h-4 text-brand-gold" />
                <span>Weekend Bonanza</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                One-tap instant recharge of +500 virtual practice coins.
              </p>
            </div>
            <button
              onClick={handleClaimWeekend}
              className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldEnd hover:from-amber-300 text-slate-950 font-black text-xs font-num shadow-glow-gold active:scale-95 transition-all"
            >
              CLAIM +500 COINS
            </button>
          </div>

          {/* Welcome Bonus Pack */}
          <div className="w-56 shrink-0 p-4 rounded-2xl bg-gradient-to-br from-purple-500/15 via-[#182042] to-[#0D1226] border border-purple-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-pink-400 text-xs font-bold mb-1">
                <Gift className="w-4 h-4 text-pink-400" />
                <span>Welcome Starter Pack</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                1,000 complimentary starter coins granted on signup.
              </p>
            </div>
            <div className="mt-3 w-full py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-black text-xs font-num flex items-center justify-center gap-1">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>ACTIVE &bull; 1,000 COINS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
