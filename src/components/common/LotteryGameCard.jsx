import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSound } from '../../context/SoundContext';

/**
 * Lottery horizontal banner card matching Screenshot 2.
 */
export const LotteryGameCard = ({ game }) => {
  const navigate = useNavigate();
  const { play } = useSound();

  const handlePlay = (e) => {
    e.stopPropagation();
    if (play) play.chip();
    navigate(game.path || '/games/color');
  };

  const renderIcon = () => {
    switch (game.iconType) {
      case '8ball':
        return (
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-black via-slate-800 to-slate-600 border border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)] flex items-center justify-center relative">
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
              <span className="text-[9px] font-black text-black">8</span>
            </div>
            {/* Ambient glows */}
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 blur-[2px]" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-purple-500 blur-[2px]" />
          </div>
        );

      case 'dice':
        return (
          <div className="flex items-center gap-1">
            <div className="w-7 h-7 bg-white rounded-lg shadow-md border border-slate-200 transform -rotate-12 flex items-center justify-center p-0.5">
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <span className="w-1 h-1 rounded-full bg-red-600" />
                <span className="w-1 h-1 rounded-full bg-slate-900" />
                <span className="w-1 h-1 rounded-full bg-slate-900" />
                <span className="w-1 h-1 rounded-full bg-red-600" />
              </div>
            </div>
            <div className="w-7 h-7 bg-white rounded-lg shadow-md border border-slate-200 transform rotate-12 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-red-600" />
            </div>
          </div>
        );

      case 'cards':
        return (
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="w-6 h-8 bg-white rounded border border-slate-300 shadow transform -rotate-12 absolute left-1 flex flex-col items-center justify-center">
              <span className="text-[9px] text-red-600 font-bold">♥</span>
              <span className="text-[7px] text-red-600 font-bold font-num">A</span>
            </div>
            <div className="w-6 h-8 bg-white rounded border border-slate-300 shadow transform rotate-12 absolute right-1 flex flex-col items-center justify-center">
              <span className="text-[9px] text-slate-900 font-bold">♠</span>
              <span className="text-[7px] text-slate-900 font-bold font-num">K</span>
            </div>
          </div>
        );

      case 'crypto':
        return (
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-500 border border-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.8)] flex flex-col items-center justify-center">
            <span className="text-xl">👾</span>
          </div>
        );

      case 'bike':
      default:
        return (
          <div className="w-10 h-10 flex items-center justify-center">
            <span className="text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">🏍️</span>
          </div>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={handlePlay}
      className={`w-full rounded-2xl p-4 bg-gradient-to-r ${game.gradient} text-white shadow-lg cursor-pointer flex items-center justify-between relative overflow-hidden group border border-white/15`}
    >
      {/* Background ambient shine */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

      {/* Left: Game Title & Rules/Subtitle */}
      <div className="space-y-1.5 z-10 max-w-[65%]">
        <h3 className="text-lg font-black tracking-wide drop-shadow-md font-display">
          {game.title}
        </h3>
        <p className="text-[11px] font-medium text-white/90 leading-tight">
          {game.subtitle}
        </p>
        <p className="text-[10px] text-white/80 font-normal leading-tight">
          {game.instruction}
        </p>
      </div>

      {/* Right: Graphic Box with Badge, 3D Icon, and 'Random' Button */}
      <div className="z-10 w-24 h-24 rounded-2xl bg-[#161836]/70 border border-white/15 backdrop-blur-md p-1.5 flex flex-col items-center justify-between shadow-xl">
        {/* Top small label */}
        <span className="text-[9px] font-bold text-white/90 tracking-wide font-display truncate">
          {game.tag}
        </span>

        {/* Center 3D graphic */}
        <div className="my-auto">{renderIcon()}</div>

        {/* Bottom 'Random' / 'Go' Pill button */}
        <button
          type="button"
          onClick={handlePlay}
          className="w-full py-1 rounded-full bg-[#201D48] hover:bg-[#2F2B66] active:scale-95 text-[10px] font-bold text-white tracking-wider uppercase border border-white/10 shadow-sm transition-all"
        >
          Random
        </button>
      </div>
    </motion.div>
  );
};
