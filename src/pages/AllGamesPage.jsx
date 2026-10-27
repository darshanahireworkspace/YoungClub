import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { BottomNav } from '../components/common/BottomNav';
import { GameCard } from '../components/common/GameCard';
import { LotteryGameCard } from '../components/common/LotteryGameCard';
import {
  CATEGORIES,
  POPULAR_GAMES,
  LOTTERY_GAMES,
  MINI_GAMES,
  SLOTS_BY_PROVIDER,
  FISHING_GAMES,
  PVC_GAMES,
} from '../services/gamesData';
import { useSound } from '../context/SoundContext';

export const AllGamesPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { play } = useSound();

  const initialTab = searchParams.get('tab') || searchParams.get('category') || 'popular';
  const [activeCategory, setActiveCategory] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState('');

  // Sync tab with URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab') || searchParams.get('category');
    if (tab && tab !== activeCategory) {
      setActiveCategory(tab);
    }
  }, [searchParams]);

  const handleTabChange = (categoryId) => {
    if (play) play.click();
    setActiveCategory(categoryId);
    setSearchParams({ tab: categoryId });
    setSearchTerm('');
  };

  // Filter mini games by search term
  const filteredMiniGames = MINI_GAMES.filter((g) =>
    g.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter fishing games by search term
  const filteredFishingGames = FISHING_GAMES.filter((g) =>
    g.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter PVC games
  const filteredPvcGames = PVC_GAMES.filter((g) =>
    g.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#111428] text-white flex flex-col justify-between pb-28 relative overflow-x-hidden selection:bg-[#7B61FF]">
      {/* 1. Header Bar matching Screenshots: "<" back button + centered "All" */}
      <header className="sticky top-0 z-40 bg-[#111428]/95 backdrop-blur-md border-b border-white/5 px-3 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (play) play.click();
            navigate('/home');
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <h1 className="text-base font-bold text-white font-display tracking-wide">
          All
        </h1>

        {/* Balance dummy spacer for centering */}
        <div className="w-8" />
      </header>

      {/* 2. Category Filter Pills matching Screenshots 1-5 */}
      <div className="px-3 pt-3 pb-1">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleTabChange(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 font-display ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF7657] via-[#D354DF] to-[#5C94FF] text-white shadow-[0_4px_15px_rgba(211,84,223,0.4)] scale-102'
                    : 'bg-[#1D213D] text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Content according to Active Category */}
      <main className="p-3.5 space-y-3.5 flex-1">
        {/* ===================== POPULAR TAB (Screenshot 1) ===================== */}
        {activeCategory === 'popular' && (
          <div className="space-y-3">
            {/* Section Header: | Popular */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 rounded-full bg-[#8E82E3]" />
              <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                Popular
              </h2>
            </div>

            {/* 3-column Grid with RTP pills */}
            <div className="grid grid-cols-3 gap-2.5">
              {POPULAR_GAMES.map((game) => (
                <GameCard key={game.id} game={game} showRtp={true} />
              ))}
            </div>
          </div>
        )}

        {/* ===================== LOTTERY TAB (Screenshot 2) ===================== */}
        {activeCategory === 'lottery' && (
          <div className="space-y-3">
            {/* Section Header: | Lottery */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 rounded-full bg-[#8E82E3]" />
              <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                Lottery
              </h2>
            </div>

            {/* Vertical list of Banner Cards */}
            <div className="space-y-2.5">
              {LOTTERY_GAMES.map((game) => (
                <LotteryGameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}

        {/* ===================== MINI GAMES TAB (Screenshot 3) ===================== */}
        {activeCategory === 'mini' && (
          <div className="space-y-3">
            {/* Search Input Bar (Screenshot 3) */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search game"
                className="w-full bg-[#181C38] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#7B61FF] transition-all"
              />
            </div>

            {/* 3-column Grid of 33 Mini Games */}
            <div className="grid grid-cols-3 gap-2.5">
              {filteredMiniGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}

        {/* ===================== SLOTS TAB (Screenshot 4) ===================== */}
        {activeCategory === 'slots' && (
          <div className="space-y-5">
            {/* Section Header: | Slots */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 rounded-full bg-[#8E82E3]" />
              <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                Slots
              </h2>
            </div>

            {/* Grouped by Provider */}
            {SLOTS_BY_PROVIDER.map((provider) => (
              <div key={provider.providerId} className="space-y-3">
                {/* Provider Header Pill */}
                <div className="flex items-center gap-2 pt-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase text-slate-950 bg-gradient-to-r ${provider.tagColor}`}>
                    {provider.tag}
                  </span>
                  <span className="text-xs font-bold text-white font-display">
                    {provider.name}
                  </span>
                </div>

                {/* 3-column Game Grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  {provider.games.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>

                {/* 'All Games' Gradient Pill Button (Screenshot 4) */}
                <div className="flex justify-center pt-1 pb-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => {
                      if (play) play.click();
                      navigate('/games/spin');
                    }}
                    className="w-3/5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF7657] via-[#D354DF] to-[#5C94FF] hover:brightness-110 shadow-md font-display tracking-wider"
                  >
                    All Games
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===================== FISHING TAB (Screenshot 5) ===================== */}
        {activeCategory === 'fishing' && (
          <div className="space-y-3">
            {/* Search Input Bar (Screenshot 5) */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search game"
                className="w-full bg-[#181C38] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#7B61FF] transition-all"
              />
            </div>

            {/* 3-column Grid of 29 Fishing Games */}
            <div className="grid grid-cols-3 gap-2.5">
              {filteredFishingGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}

        {/* ===================== PVC TAB (Card & Table Games) ===================== */}
        {activeCategory === 'pvc' && (
          <div className="space-y-3">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search card game"
                className="w-full bg-[#181C38] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#7B61FF] transition-all"
              />
            </div>

            {/* 3-column Grid of PVC Games */}
            <div className="grid grid-cols-3 gap-2.5">
              {filteredPvcGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Persistent Bottom Nav Bar */}
      <BottomNav activeTab="home" />
    </div>
  );
};
