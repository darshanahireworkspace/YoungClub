import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Users, Sparkles } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const GameCard = ({
  id,
  title,
  tagline,
  badge,
  maxMultiplier,
  players,
  icon: Icon,
  gradient,
  borderGlow,
  link,
}) => {
  const navigate = useNavigate();
  const { play } = useSound();

  const handlePlay = () => {
    play.click();
    navigate(link);
  };

  return (
    <div
      onClick={handlePlay}
      className={`relative group cursor-pointer rounded-2xl p-4 glass-card glass-card-hover border overflow-hidden ${borderGlow} transition-all`}
    >
      {/* Background Gradient Splash */}
      <div
        className={`absolute -right-8 -top-8 w-28 h-28 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-35 blur-xl transition-all duration-300 pointer-events-none`}
      />

      <div className="relative z-10 flex items-center justify-between gap-3">
        {/* Left: Icon & Info */}
        <div className="flex items-center gap-3.5">
          <div
            className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${gradient} p-0.5 shadow-md group-hover:scale-105 transition-transform shrink-0`}
          >
            <div className="w-full h-full bg-[#0a0f26]/90 rounded-[14px] flex items-center justify-center">
              <Icon className="w-6 h-6 text-white group-hover:rotate-6 transition-transform" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                {title}
              </h4>
              {badge && (
                <span className="px-1.5 py-0.2 rounded-md bg-white/10 text-[9px] font-extrabold tracking-wider text-cyan-300 border border-white/15">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 line-clamp-1">{tagline}</p>
            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <Sparkles className="w-3 h-3" />
                {maxMultiplier}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-500" />
                {players}
              </span>
            </div>
          </div>
        </div>

        {/* Right Arrow Button */}
        <div className="w-9 h-9 rounded-xl bg-white/5 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-cyan-300 transition-all shrink-0">
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
