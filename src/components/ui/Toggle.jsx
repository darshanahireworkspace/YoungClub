import React from 'react';
import { motion } from 'framer-motion';

export const Toggle = ({
  checked = false,
  onChange,
  disabled = false,
  color = 'purple', // 'purple' | 'gold' | 'green'
  label,
  description,
  className = '',
}) => {
  const activeColorMap = {
    purple: 'bg-gradient-to-r from-purple-600 to-pink-500 shadow-glow-primary',
    gold: 'bg-gradient-to-r from-brand-gold to-brand-goldEnd shadow-glow-gold',
    green: 'bg-gradient-to-r from-emerald-500 to-green-600 shadow-glow-green',
  };

  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      {(label || description) && (
        <div className="flex-1 cursor-pointer" onClick={() => !disabled && onChange && onChange(!checked)}>
          {label && <div className="text-xs sm:text-sm font-semibold text-white">{label}</div>}
          {description && <div className="text-[11px] text-slate-400 mt-0.5">{description}</div>}
        </div>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          checked ? (activeColorMap[color] || activeColorMap.purple) : 'bg-slate-800'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <motion.span
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0"
        />
      </button>
    </div>
  );
};
