import React from 'react';
import { Coins, Plus, Minus, AlertTriangle } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';

export const BetSelector = ({
  betAmount,
  setBetAmount,
  minBet = 10,
  maxBet = 5000,
  disabled = false,
  onOpenAddCoins,
}) => {
  const { balance } = useWallet();
  const { play } = useSound();

  const quickChips = [10, 50, 100, 500];

  const handleChipClick = (amount) => {
    if (disabled) return;
    if (play) play.chip();
    setBetAmount(amount);
  };

  const handleStepMinus = () => {
    if (disabled) return;
    if (play) play.chip();
    const current = Number(betAmount) || minBet;
    const step = current > 100 ? 50 : 10;
    setBetAmount(Math.max(minBet, current - step));
  };

  const handleStepPlus = () => {
    if (disabled) return;
    if (play) play.chip();
    const current = Number(betAmount) || 0;
    const step = current >= 100 ? 50 : 10;
    const next = current + step;
    const capped = Math.min(next, balance > 0 ? balance : maxBet, maxBet);
    setBetAmount(Math.max(minBet, capped));
  };

  const handleHalf = () => {
    if (disabled) return;
    if (play) play.chip();
    setBetAmount(Math.max(minBet, Math.floor(betAmount / 2)));
  };

  const handleDouble = () => {
    if (disabled) return;
    if (play) play.chip();
    const doubled = betAmount * 2;
    const capped = Math.min(doubled, balance > 0 ? balance : maxBet, maxBet);
    setBetAmount(Math.max(minBet, capped));
  };

  const handleMax = () => {
    if (disabled) return;
    if (play) play.chip();
    const maximum = Math.min(balance > 0 ? balance : maxBet, maxBet);
    setBetAmount(Math.max(minBet, maximum));
  };

  const isInsufficient = balance < betAmount;

  return (
    <div className="bg-gradient-to-b from-[#151C38] to-[#0D1226] border border-white/10 rounded-2xl p-3.5 space-y-3 shadow-lg">
      {/* Top Label & Balance info */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Coins className="w-4 h-4 text-brand-gold" />
          <span>Bet Amount</span>
        </span>
        <div className="flex items-center gap-1 text-slate-400">
          <span>Balance:</span>
          <span className="font-bold text-brand-gold font-num text-sm">
            {balance.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Stepper Input Row (− / +) & Modifiers */}
      <div className="flex items-center gap-2">
        {/* Stepper Minus */}
        <button
          type="button"
          disabled={disabled || betAmount <= minBet}
          onClick={handleStepMinus}
          className="w-10 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center font-bold active:scale-95 transition-all disabled:opacity-40"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Input box */}
        <div className="relative flex-1">
          <input
            type="number"
            disabled={disabled}
            value={betAmount}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setBetAmount(isNaN(val) ? '' : val);
            }}
            min={minBet}
            max={maxBet}
            className={`w-full bg-[#0A0D1D] border rounded-xl px-3 py-2.5 text-center text-lg font-black font-num text-white focus:outline-none transition-colors ${
              isInsufficient
                ? 'border-brand-red text-red-300 focus:ring-1 focus:ring-brand-red'
                : 'border-white/15 focus:border-brand-purple'
            }`}
          />
        </div>

        {/* Stepper Plus */}
        <button
          type="button"
          disabled={disabled || betAmount >= maxBet}
          onClick={handleStepPlus}
          className="w-10 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center font-bold active:scale-95 transition-all disabled:opacity-40"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* ½, 2×, MAX buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            disabled={disabled}
            onClick={handleHalf}
            className="px-2.5 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold font-num text-slate-300 active:scale-95 transition-all disabled:opacity-40"
          >
            ½
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={handleDouble}
            className="px-2.5 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold font-num text-slate-300 active:scale-95 transition-all disabled:opacity-40"
          >
            2×
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={handleMax}
            className="px-2.5 h-11 rounded-xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 hover:from-purple-900/60 hover:to-pink-900/60 border border-purple-500/30 text-xs font-black font-num text-pink-300 active:scale-95 transition-all disabled:opacity-40"
          >
            MAX
          </button>
        </div>
      </div>

      {/* Quick Chips row */}
      <div className="grid grid-cols-4 gap-2">
        {quickChips.map((chip) => {
          const isSelected = betAmount === chip;
          return (
            <button
              key={chip}
              type="button"
              disabled={disabled}
              onClick={() => handleChipClick(chip)}
              className={`py-2 rounded-xl text-xs font-black font-num transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-brand-gold to-brand-goldEnd text-slate-950 border-amber-300 shadow-glow-gold scale-[1.02]'
                  : 'bg-[#0E1428] border-white/10 text-slate-300 hover:bg-[#161F3C] hover:text-white'
              } disabled:opacity-40 active:scale-95`}
            >
              +{chip}
            </button>
          );
        })}
      </div>

      {/* Insufficient balance warning & Quick Add */}
      {isInsufficient && (
        <div className="p-2.5 rounded-xl bg-red-950/40 border border-brand-red/40 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-red-300 font-medium">
            <AlertTriangle className="w-4 h-4 text-brand-red shrink-0" />
            <span>Insufficient coins!</span>
          </div>
          {onOpenAddCoins && (
            <button
              type="button"
              onClick={onOpenAddCoins}
              className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-brand-gold to-brand-goldEnd text-slate-950 font-black text-[11px] shrink-0 active:scale-95 shadow-glow-gold"
            >
              Get Free Coins
            </button>
          )}
        </div>
      )}
    </div>
  );
};
