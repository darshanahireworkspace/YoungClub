import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Volume2,
  ChevronRight,
  RotateCw,
  Crown,
  Headphones,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { WelcomePopupSequence } from '../components/common/WelcomePopupSequence';
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

export const HomePage = () => {
  const navigate = useNavigate();
  const { play } = useSound();

  // State for the two confirmation boxes after login/register
  const [showWelcomeModal, setShowWelcomeModal] = useState(() => {
    return !sessionStorage.getItem('yc_welcome_sequence_seen');
  });

  const [activeCategory, setActiveCategory] = useState('popular');
  const [showNoticeDetail, setShowNoticeDetail] = useState(false);

  const handleCloseWelcome = () => {
    setShowWelcomeModal(false);
    sessionStorage.setItem('yc_welcome_sequence_seen', 'true');
  };

  // 6 Game Cards matching Screenshot 3
  const games = [
    {
      id: 'aviator-dark',
      title: 'AVIATOR',
      category: 'popular',
      path: '/games/crash',
      image: '/images/card_aviator_dark.jpg',
      badge: 'HOT 🔥',
    },
    {
      id: 'aviator-red',
      title: 'AVIATOR',
      category: 'popular',
      path: '/games/crash',
      image: '/images/card_aviator_red.jpg',
      badge: '99x',
    },
    {
      id: 'wingo',
      title: 'WINGO',
      category: 'lottery',
      path: '/games/color',
      image: '/images/card_wingo.jpg',
      badge: 'FAST',
    },
    {
      id: 'cricket',
      title: 'CRICKET',
      category: 'popular',
      path: '/games/spin',
      image: '/images/card_cricket.jpg',
      badge: 'LIVE',
    },
    {
      id: 'pubg',
      title: 'BATTLEGROUNDS',
      category: 'mini',
      path: '/games/mines',
      image: '/images/card_pubg.jpg',
      badge: 'TACTICAL',
    },
    {
      id: 'power-gods',
      title: 'POWER OF GODS',
      category: 'popular',
      path: '/games/dice',
      image: '/images/card_power_gods.jpg',
      badge: 'SLOTS',
    },
  ];

  return (
    <div className="min-h-screen bg-[#111428] text-white flex flex-col justify-between pb-28 relative overflow-x-hidden selection:bg-[#7B61FF]">
      {/* 1. Main Page Topbar (Screenshot 3) */}
      <Header />

      <main className="p-3.5 space-y-3.5 max-w-lg mx-auto w-full relative">
        {/* Floating Quick Action Widgets on Right Edge (as seen in Screenshot 3) */}
        <div className="absolute -right-1 top-[42%] flex flex-col gap-2.5 z-30 pointer-events-auto">
          {/* VIP Crown Widget */}
          <button
            type="button"
            onClick={() => {
              if (play) play.chip();
              setShowWelcomeModal(true);
            }}
            title="VIP Rewards"
            className="w-9 h-9 rounded-l-full bg-gradient-to-r from-amber-500 to-yellow-400 p-0.5 shadow-[0_4px_12px_rgba(245,158,11,0.5)] flex items-center justify-center pl-1 hover:scale-105 active:scale-95 transition-transform"
          >
            <Crown className="w-5 h-5 text-slate-950 fill-amber-900" />
          </button>

          {/* Spin Wheel / Daily Bonus Widget */}
          <button
            type="button"
            onClick={() => {
              if (play) play.click();
              navigate('/games/spin');
            }}
            title="Lucky Spin"
            className="w-9 h-9 rounded-l-full bg-gradient-to-r from-pink-500 to-purple-600 p-0.5 shadow-[0_4px_12px_rgba(236,72,153,0.5)] flex items-center justify-center pl-1 hover:scale-105 active:scale-95 transition-transform"
          >
            <RotateCw className="w-5 h-5 text-white" />
          </button>

          {/* Customer Service Widget */}
          <button
            type="button"
            onClick={() => {
              if (play) play.click();
              setShowNoticeDetail(true);
            }}
            title="Support"
            className="w-9 h-9 rounded-l-full bg-gradient-to-r from-cyan-400 to-blue-600 p-0.5 shadow-[0_4px_12px_rgba(14,165,233,0.5)] flex items-center justify-center pl-1 hover:scale-105 active:scale-95 transition-transform"
          >
            <Headphones className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* 2. Top Promotional Banner (Screenshot 3: "Buy & Sell ARB with AR Wallet") */}
        <div
          onClick={() => {
            if (play) play.click();
            navigate('/wallet');
          }}
          className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer group"
        >
          <img
            src="/images/ar_wallet_banner.jpg"
            alt="Buy & Sell ARB with AR Wallet"
            className="w-full h-auto object-cover group-hover:scale-101 transition-transform duration-300"
          />
        </div>

        {/* 3. Announcement / Notice Bar (Screenshot 3) */}
        <div className="bg-[#1D213D] border border-white/5 rounded-full px-3 py-1.5 flex items-center justify-between gap-2 shadow-sm">
          {/* Left: Speaker icon in circular bubble */}
          <div className="w-6 h-6 rounded-full bg-[#8E82E3]/20 text-[#8E82E3] flex items-center justify-center shrink-0">
            <Volume2 className="w-3.5 h-3.5" />
          </div>

          {/* Center: Marquee / Announcement Text matching Screenshot 3 */}
          <div className="flex-1 overflow-hidden">
            <p className="text-[11px] text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis leading-tight font-medium">
              🎉 🎉 🎉 Welcome to join the YoungClub platform. We provide a brand new gaming experience, exciting promotions, and 24/7 instant rewards...
            </p>
          </div>

          {/* Right: Detail Button (Screenshot 3: Pink/Blue gradient pill) */}
          <button
            type="button"
            onClick={() => {
              if (play) play.click();
              setShowNoticeDetail(true);
            }}
            className="px-3 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-[#D052DE] to-[#5C94FF] hover:brightness-110 active:scale-95 transition-all shrink-0 font-display uppercase tracking-wider shadow-sm"
          >
            Detail
          </button>
        </div>

        {/* 4. Category Filter Buttons matching Screenshots 1-5 */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (play) play.click();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 font-display ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF7657] via-[#D354DF] to-[#5C94FF] text-white shadow-[0_4px_15px_rgba(211,84,223,0.4)]'
                    : 'bg-[#1E2342] text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 5. Sub-header Bar (Screenshot 3: Category with glowing pill, "ALL >" on right) */}
        <div className="bg-[#1A1E38] rounded-xl px-3 py-2 flex items-center justify-between border border-white/5 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 rounded-full bg-[#8E82E3]" />
            <span className="text-xs font-black text-white uppercase tracking-wider font-display">
              {CATEGORIES.find((c) => c.id === activeCategory)?.label || 'Popular'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (play) play.click();
              navigate(`/all-games?tab=${activeCategory}`);
            }}
            className="flex items-center gap-0.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="group-hover:text-purple-300">ALL</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 6. Dynamic Game Cards View according to Active Category */}
        {activeCategory === 'lottery' ? (
          <div className="space-y-2.5">
            {LOTTERY_GAMES.map((game) => (
              <LotteryGameCard key={game.id} game={game} />
            ))}
          </div>
        ) : activeCategory === 'mini' ? (
          <div className="grid grid-cols-3 gap-2.5">
            {MINI_GAMES.slice(0, 12).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : activeCategory === 'slots' ? (
          <div className="space-y-4">
            {SLOTS_BY_PROVIDER.slice(0, 2).map((provider) => (
              <div key={provider.providerId} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase text-slate-950 bg-gradient-to-r ${provider.tagColor}`}>
                    {provider.tag}
                  </span>
                  <span className="text-xs font-bold text-white font-display">
                    {provider.name}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {provider.games.slice(0, 6).map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : activeCategory === 'fishing' ? (
          <div className="grid grid-cols-3 gap-2.5">
            {FISHING_GAMES.slice(0, 9).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : activeCategory === 'pvc' ? (
          <div className="grid grid-cols-3 gap-2.5">
            {PVC_GAMES.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          /* Popular Tab: 3-column grid with RTP pills */
          <div className="grid grid-cols-3 gap-2.5">
            {POPULAR_GAMES.slice(0, 9).map((game) => (
              <GameCard key={game.id} game={game} showRtp={true} />
            ))}
          </div>
        )}

        {/* Replay Welcome Offer Link */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setShowWelcomeModal(true)}
            className="text-[11px] text-purple-400 hover:text-purple-300 underline font-medium"
          >
            View Welcome Promotion &amp; Rewards Popup
          </button>
        </div>
      </main>

      {/* 7. Bottom Navigation Bar (Screenshot 3) */}
      <BottomNav />

      {/* 8. Two Consecutive Confirmation Boxes after Login/Register (Screenshot 1 & 2) */}
      <WelcomePopupSequence
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcome}
      />

      {/* Notice Detail Dialog */}
      <AnimatePresence>
        {showNoticeDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNoticeDetail(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-sm bg-[#1D213A] border border-white/10 rounded-2xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2 text-white text-sm font-bold">
                  <Volume2 className="w-4 h-4 text-[#8E82E3]" />
                  <span>Platform Security Notice</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNoticeDetail(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Welcome to Young Club! Our customer service team will never send any external links to members asking for passwords, OTPs, or private information. Enjoy our premium games, fast rewards, and VIP benefits safely.
              </p>
              <button
                type="button"
                onClick={() => setShowNoticeDetail(false)}
                className="w-full py-2.5 rounded-full bg-[#7B61FF] text-white text-xs font-bold hover:bg-[#6c51f5]"
              >
                Understood
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
