import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Palette, RotateCw, Dices, Bomb, Flame, Sparkles } from 'lucide-react';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { PromoCarousel } from '../components/home/PromoCarousel';
import { QuickActionRow } from '../components/home/QuickActionRow';
import { DailyBonusCard } from '../components/home/DailyBonusCard';
import { RecentWinnersTicker } from '../components/home/RecentWinnersTicker';
import { GameCard } from '../components/ui/GameCard';

export const HomePage = () => {
  const navigate = useNavigate();

  const aviatorGame = {
    id: 'crash',
    title: 'Aviator Crash Arena',
    tagline: 'Ride the rising multiplier curve & cash out before it explodes!',
    badge: 'HOT 🔥',
    badgeColor: 'red',
    maxMultiplier: 'Up to 100x',
    players: '3,420',
    icon: Plane,
    gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
    accentColor: '#06B6D4',
    featured: true,
    onClick: () => navigate('/games/crash'),
  };

  const gridGames = [
    {
      id: 'color',
      title: 'Colour Prediction',
      tagline: 'Predict Red, Green, Violet or numbers in 30s rounds.',
      badge: 'LIVE',
      badgeColor: 'green',
      maxMultiplier: '9.0x Payout',
      players: '2,150',
      icon: Palette,
      gradient: 'from-emerald-500 via-teal-600 to-green-600',
      accentColor: '#10B981',
      onClick: () => navigate('/games/color'),
    },
    {
      id: 'spin',
      title: 'Spin Wheel',
      tagline: 'Physics wheel with 8 slices and crown jackpot.',
      badge: 'JACKPOT',
      badgeColor: 'gold',
      maxMultiplier: '10x Multiplier',
      players: '1,890',
      icon: RotateCw,
      gradient: 'from-amber-500 via-orange-600 to-pink-600',
      accentColor: '#F59E0B',
      onClick: () => navigate('/games/spin'),
    },
    {
      id: 'dice',
      title: 'Dice Roll',
      tagline: 'Roll Over/Under customizable slider with 98% RTP.',
      badge: '98% RTP',
      badgeColor: 'purple',
      maxMultiplier: 'Up to 49x',
      players: '1,420',
      icon: Dices,
      gradient: 'from-purple-600 via-violet-600 to-pink-600',
      accentColor: '#8B5CF6',
      onClick: () => navigate('/games/dice'),
    },
    {
      id: 'mines',
      title: 'Mines Tactical',
      tagline: 'Uncover gems across 5x5 grid & avoid hidden bombs.',
      badge: 'HIGH PROFIT',
      badgeColor: 'red',
      maxMultiplier: 'Multi-gem boost',
      players: '2,640',
      icon: Bomb,
      gradient: 'from-pink-500 via-rose-600 to-purple-600',
      accentColor: '#EC4899',
      onClick: () => navigate('/games/mines'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F1E] text-white flex flex-col justify-between pb-24 relative overflow-hidden">
      {/* Top Header */}
      <Header />

      <main className="p-4 space-y-4 max-w-lg mx-auto w-full">
        {/* Promotional Carousel */}
        <PromoCarousel />

        {/* Quick Actions (Daily, Add Coins, Refer, Offers) */}
        <QuickActionRow />

        {/* 24-Hour Daily Bonus Card */}
        <DailyBonusCard />

        {/* Recent Winners Horizontal Live Ticker */}
        <RecentWinnersTicker />

        {/* Popular Games Section */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-brand-magenta" />
              <h3 className="text-base sm:text-lg font-black text-white uppercase font-display tracking-wide">
                Popular Games
              </h3>
            </div>
            <span className="text-xs font-bold text-brand-gold font-num">
              5 Games Live
            </span>
          </div>

          {/* 1. Featured Top Full-Width Card (Aviator Crash) */}
          <GameCard {...aviatorGame} />

          {/* 2. 2-Column Grid for other 4 Games */}
          <div className="grid grid-cols-2 gap-3">
            {gridGames.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        </div>
      </main>

      {/* Floating Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
