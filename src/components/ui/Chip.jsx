import React from 'react';
import { motion } from 'framer-motion';

export const Chip = ({
  children,
  selected = false,
  onClick,
  disabled = false,
  variant = 'chip', // 'chip' | 'filter' | 'badge'
  className = '',
}) => {
  if (variant === 'badge') {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase border font-num ${
          selected
            ? 'bg-brand-gold/20 text-brand-gold border-brand-gold/40'
            : 'bg-white/10 text-slate-300 border-white/10'
        } ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === 'filter') {
    return (
      <motion.button
        type="button"
        disabled={disabled}
        onClick={onClick}
        whileTap={!disabled ? { scale: 0.95 } : undefined}
        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
          selected
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-pink-400 shadow-glow-primary'
            : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/15 hover:text-slate-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        {children}
      </motion.button>
    );
  }

  // Gaming Bet Chip
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      className={`py-2 px-3 rounded-xl font-bold font-num text-sm transition-all duration-200 border select-none ${
        selected
          ? 'bg-gradient-to-r from-brand-gold to-brand-goldEnd text-slate-950 border-amber-300 shadow-glow-gold scale-[1.02]'
          : 'bg-[#151C36] border-white/10 text-slate-300 hover:bg-[#1C2649] hover:border-white/20'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
};
