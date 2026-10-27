import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Users, ArrowRight } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const GameCard = ({
  title,
  tagline,
  badge = 'HOT',
  badgeColor = 'purple', // 'purple' | 'gold' | 'green' | 'red'
  maxMultiplier = '10x',
  players = '1,200',
  icon: Icon,
  gradient = 'from-purple-600 via-fuchsia-600 to-pink-600',
  accentColor = '#EC4899',
  featured = false,
  onClick,
}) => {
  const { play } = useSound();

  const handleCardClick = () => {
    if (play) play.click();
    if (onClick) onClick();
  };

  const badgeStyles = {
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    gold: 'bg-brand-gold/20 text-brand-gold border-brand-gold/40',
    green: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    red: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  };

  // Featured Full-Width Card (e.g. Aviator Crash)
  if (featured) {
    return (
      <motion.div
        onClick={handleCardClick}
        whileHover={{ y: -3, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="relative group cursor-pointer w-full rounded-3xl p-5 overflow-hidden border border-purple-500/30 bg-gradient-to-br from-[#1A1F3E] via-[#121730] to-[#0A0D1E] shadow-2xl transition-all duration-300 hover:border-pink-500/50 hover:shadow-glow-primary"
      >
        {/* Glow Spheres */}
        <div
          className="absolute -right-8 -top-8 w-44 h-44 rounded-full blur-3xl opacity-35 group-hover:opacity-50 transition-opacity pointer-events-none"
          style={{ background: accentColor }}
        />
        <div className="absolute right-4 bottom-2 opacity-15 pointer-events-none group-hover:scale-110 group-hover:opacity-25 transition-all duration-500">
          {Icon && <Icon className="w-28 h-28 text-white" />}
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                <span>{badge}</span>
              </span>

              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 font-num">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>{players} playing</span>
              </span>
            </div>

            <div className="flex items-center gap-3 mt-1">
              {Icon && (
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${gradient} p-0.5 shadow-md flex items-center justify-center shrink-0`}>
                  <div className="w-full h-full bg-[#0B0F1E] rounded-[14px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-xl font-black text-white tracking-wide group-hover:text-pink-300 transition-colors">
                  {title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{tagline}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center gap-1 text-xs font-black font-num text-brand-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{maxMultiplier}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black shadow-glow-primary group-hover:scale-105 transition-transform">
              <span>PLAY NOW</span>
              <Play className="w-3 h-3 fill-white" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // 2-Column Vertical Game Card
  return (
    <motion.div
      onClick={handleCardClick}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="relative group cursor-pointer rounded-2xl p-4 overflow-hidden border border-white/10 bg-gradient-to-b from-[#182040] to-[#0E1328] shadow-lg transition-all duration-300 hover:border-purple-500/40 hover:shadow-glow-purple flex flex-col justify-between"
    >
      {/* Ambient gradient top splash */}
      <div
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none"
        style={{ background: accentColor }}
      />

      <div>
        {/* Top badge */}
        <div className="flex items-center justify-between gap-1 mb-2.5">
          <span
            className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border font-num ${
              badgeStyles[badgeColor] || badgeStyles.purple
            }`}
          >
            {badge}
          </span>
          <span className="text-[10px] text-brand-gold font-black font-num">
            {maxMultiplier}
          </span>
        </div>

        {/* Artwork Icon */}
        <div className="flex items-center justify-center my-3">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${gradient} p-0.5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
          >
            <div className="w-full h-full bg-[#0A0D1E] rounded-[14px] flex items-center justify-center">
              {Icon && <Icon className="w-7 h-7 text-white" />}
            </div>
          </div>
        </div>

        {/* Name & Tagline */}
        <div className="text-center">
          <h4 className="text-sm font-extrabold text-white tracking-wide group-hover:text-pink-300 transition-colors">
            {title}
          </h4>
          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
            {tagline}
          </p>
        </div>
      </div>

      {/* Bottom Play Row */}
      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-slate-400 group-hover:text-white">
        <span className="text-[10px] font-num flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>{players}</span>
        </span>

        <span className="flex items-center gap-1 text-[11px] font-extrabold text-pink-400 group-hover:translate-x-0.5 transition-transform">
          <span>Play</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  );
};
