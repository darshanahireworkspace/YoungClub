import React from 'react';
import { Coins, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BalanceChip = ({
  balance = 0,
  onClick,
  onAddClick,
  showAdd = true,
  size = 'md',
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/15 via-[#1E2648] to-[#121832] border border-brand-gold/40 hover:border-brand-gold/70 rounded-full pl-2 pr-1 py-1 transition-all shadow-sm group select-none ${className}`}
    >
      {/* Gold Coin Icon */}
      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-brand-gold to-brand-goldEnd flex items-center justify-center shadow-glow-gold shrink-0">
        <Coins className="w-3 h-3 text-slate-950 group-hover:rotate-12 transition-transform" />
      </div>

      {/* Numerical Balance in Rajdhani font */}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={balance}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm font-black text-brand-gold font-num tracking-wide pr-1"
        >
          {Number(balance).toLocaleString()}
        </motion.span>
      </AnimatePresence>

      {/* Add Button */}
      {showAdd && (
        <button
          type="button"
          onClick={(e) => {
            if (onAddClick) {
              e.stopPropagation();
              onAddClick();
            }
          }}
          className="w-5 h-5 rounded-full bg-gradient-to-tr from-brand-gold to-brand-goldEnd text-slate-950 flex items-center justify-center font-black hover:scale-110 active:scale-95 transition-transform shadow-glow-gold shrink-0"
          title="Add Free Virtual Coins"
        >
          <Plus className="w-3 h-3 stroke-[3]" />
        </button>
      )}
    </div>
  );
};
