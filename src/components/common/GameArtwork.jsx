import React from 'react';

/**
 * Rich 3D / stylized vector artwork for games matching the screenshots.
 */
export const GameArtwork = ({ theme, icon, image, title }) => {
  if (image) {
    return (
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    );
  }

  // Visual artwork presets by theme
  switch (theme) {
    case 'money':
      return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-green-700 to-amber-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.25)_0%,transparent_70%)]" />
          {/* Stacks of dollar bills */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-9 bg-emerald-500 border-2 border-emerald-300 rounded shadow-lg transform -rotate-6 flex items-center justify-center text-white font-black text-xs">
              💵 $100
            </div>
            <div className="w-14 h-9 bg-green-500 border-2 border-emerald-200 rounded shadow-xl -mt-5 transform rotate-3 flex items-center justify-center text-yellow-300 font-black text-xs">
              💰 $100
            </div>
          </div>
          <div className="text-[10px] font-black tracking-widest text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-1 z-10 uppercase">
            CASH
          </div>
        </div>
      );

    case 'gems':
    case 'aztec':
    case 'gold':
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-500 via-orange-600 to-red-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0%,transparent_70%)]" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-yellow-100 p-1 shadow-2xl flex items-center justify-center border-2 border-amber-200 animate-pulse">
              <span className="text-2xl drop-shadow">💎</span>
            </div>
            <div className="flex gap-1 mt-1">
              <span className="text-xs">🔴</span>
              <span className="text-xs">🟢</span>
              <span className="text-xs">🟡</span>
            </div>
          </div>
        </div>
      );

    case 'wheel':
    case 'fire':
      return (
        <div className="w-full h-full bg-gradient-to-br from-orange-600 via-red-700 to-purple-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <div className="w-13 h-13 rounded-full border-4 border-amber-300 bg-gradient-to-tr from-red-600 via-yellow-500 to-purple-600 shadow-2xl flex items-center justify-center relative animate-spin [animation-duration:12s]">
            <div className="w-full h-0.5 bg-white/40 absolute" />
            <div className="h-full w-0.5 bg-white/40 absolute" />
            <div className="w-4 h-4 rounded-full bg-amber-400 border border-white shadow flex items-center justify-center text-[8px] font-bold text-black">
              ★
            </div>
          </div>
          <div className="text-[9px] font-black text-amber-300 mt-1 uppercase tracking-wider drop-shadow">
            SPIN
          </div>
        </div>
      );

    case '777':
      return (
        <div className="w-full h-full bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <div className="relative z-10 flex flex-col items-center">
            <div className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-400 to-orange-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] scale-110">
              777
            </div>
            <div className="text-[9px] font-black text-cyan-200 tracking-widest mt-0.5 drop-shadow">
              ⚡ JACKPOT ⚡
            </div>
          </div>
        </div>
      );

    case 'shark':
    case 'shark-cool':
      return (
        <div className="w-full h-full bg-gradient-to-br from-blue-600 via-cyan-700 to-indigo-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-3xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">🦈</span>
            <span className="text-[9px] font-black text-cyan-300 uppercase tracking-widest mt-0.5">
              CANNOOOON
            </span>
          </div>
        </div>
      );

    case 'jester':
    case 'cards':
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-500 via-red-600 to-purple-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-3xl drop-shadow">🃏</span>
            <div className="flex gap-1 text-[11px] text-yellow-300 font-bold mt-0.5">
              <span>♠</span>
              <span>♥</span>
              <span>♦</span>
              <span>♣</span>
            </div>
          </div>
        </div>
      );

    case 'dragon':
    case 'dragon-gold':
    case 'dragon-blue':
    case 'dragon-red':
    case 'dragons-3':
      return (
        <div className="w-full h-full bg-gradient-to-br from-sky-600 via-indigo-700 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-3xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">🐉</span>
            <span className="text-[9px] font-black text-amber-300 uppercase tracking-widest mt-0.5">
              LEGEND
            </span>
          </div>
        </div>
      );

    case 'space':
    case 'rocket':
      return (
        <div className="w-full h-full bg-gradient-to-br from-indigo-700 via-purple-800 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-3xl drop-shadow transform -rotate-45">🚀</span>
            <span className="text-[9px] font-black text-pink-300 uppercase tracking-widest mt-0.5">
              BURST
            </span>
          </div>
        </div>
      );

    case 'ganesha':
      return (
        <div className="w-full h-full bg-gradient-to-br from-yellow-500 via-amber-600 to-red-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <div className="w-12 h-12 rounded-full bg-amber-400/20 border-2 border-amber-300 flex items-center justify-center shadow-xl">
            <span className="text-2xl">🕉️</span>
          </div>
          <span className="text-[9px] font-black text-yellow-200 uppercase tracking-widest mt-1">
            GOLD
          </span>
        </div>
      );

    case 'buffalo':
      return (
        <div className="w-full h-full bg-gradient-to-br from-red-600 via-amber-700 to-stone-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <span className="text-3xl drop-shadow">🦬</span>
          <span className="text-[9px] font-black text-amber-300 uppercase tracking-widest mt-1">
            CHARGE
          </span>
        </div>
      );

    case 'crypto':
      return (
        <div className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-700 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 border-2 border-white flex items-center justify-center shadow-2xl text-slate-950 font-black text-lg">
            ₿
          </div>
          <span className="text-[9px] font-black text-amber-300 uppercase tracking-widest mt-1">
            CRYPTO
          </span>
        </div>
      );

    case 'pufferfish':
    case 'sea-dragon':
    case 'octopus':
    case 'toad':
      return (
        <div className="w-full h-full bg-gradient-to-br from-pink-600 via-purple-700 to-indigo-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <span className="text-3xl drop-shadow">🐡</span>
          <span className="text-[9px] font-black text-pink-200 uppercase tracking-widest mt-1">
            BOMBING
          </span>
        </div>
      );

    case 'dino':
    case 'dino-cute':
    case 'rex-purple':
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-600 via-orange-700 to-stone-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <span className="text-3xl drop-shadow">🦖</span>
          <span className="text-[9px] font-black text-amber-200 uppercase tracking-widest mt-1">
            TYCOON
          </span>
        </div>
      );

    case 'chicken':
    case 'ice':
    case 'rabbit':
      return (
        <div className="w-full h-full bg-gradient-to-br from-orange-500 via-amber-600 to-stone-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <span className="text-3xl drop-shadow">🐔</span>
          <span className="text-[9px] font-black text-yellow-300 uppercase tracking-widest mt-1">
            ROAD
          </span>
        </div>
      );

    case 'mine':
    case 'boom':
    case 'bomb-gem':
    case 'treasure':
      return (
        <div className="w-full h-full bg-gradient-to-br from-red-600 via-rose-700 to-stone-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <span className="text-3xl drop-shadow">💣</span>
          <span className="text-[9px] font-black text-red-200 uppercase tracking-widest mt-1">
            BOOM
          </span>
        </div>
      );

    case 'cricket':
      return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-green-700 to-stone-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <span className="text-3xl drop-shadow">🏏</span>
          <span className="text-[9px] font-black text-emerald-200 uppercase tracking-widest mt-1">
            CRICKET
          </span>
        </div>
      );

    case 'dice':
      return (
        <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-700 to-indigo-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <span className="text-3xl drop-shadow">🎲</span>
          <span className="text-[9px] font-black text-pink-200 uppercase tracking-widest mt-1">
            LUCKY
          </span>
        </div>
      );

    case 'caishen':
    case 'caishen-gold':
      return (
        <div className="w-full h-full bg-gradient-to-br from-red-600 via-amber-600 to-yellow-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <span className="text-3xl drop-shadow">👑</span>
          <span className="text-[9px] font-black text-yellow-300 uppercase tracking-widest mt-1">
            FORTUNE
          </span>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-700 via-indigo-900 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden p-2">
          <span className="text-3xl drop-shadow">🎮</span>
          <span className="text-[8px] font-bold text-slate-300 uppercase tracking-wider mt-1 text-center line-clamp-1">
            {title}
          </span>
        </div>
      );
  }
};
