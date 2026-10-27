import React, { useState } from 'react';
import { Gift, PlusCircle, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../../context/SoundContext';
import { useWallet } from '../../context/WalletContext';
import { AddCoinsModal } from '../common/AddCoinsModal';

export const QuickActionRow = () => {
  const navigate = useNavigate();
  const { play } = useSound();
  const { claimDailyBonus } = useWallet();
  const [showAddCoins, setShowAddCoins] = useState(false);

  const actions = [
    {
      id: 'daily',
      label: 'Daily Bonus',
      sub: '+100',
      icon: Gift,
      gradient: 'from-amber-500 to-orange-500',
      shadow: 'shadow-glow-gold',
      onClick: () => {
        if (play) play.click();
        claimDailyBonus();
      },
    },
    {
      id: 'coins',
      label: 'Add Coins',
      sub: 'Free',
      icon: PlusCircle,
      gradient: 'from-purple-600 to-pink-600',
      shadow: 'shadow-glow-primary',
      onClick: () => {
        if (play) play.click();
        setShowAddCoins(true);
      },
    },
    {
      id: 'refer',
      label: 'Refer Squad',
      sub: '+200',
      icon: Users,
      gradient: 'from-cyan-500 to-blue-600',
      shadow: 'shadow-glow-primary',
      onClick: () => {
        if (play) play.click();
        navigate('/refer');
      },
    },
    {
      id: 'offers',
      label: 'Offers',
      sub: 'Streaks',
      icon: Zap,
      gradient: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-glow-green',
      onClick: () => {
        if (play) play.click();
        navigate('/refer');
      },
    },
  ];

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.onClick}
              className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#11172E] border border-white/10 hover:border-white/20 transition-all active:scale-95 group shadow-sm"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${act.gradient} p-0.5 ${act.shadow} flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform`}
              >
                <div className="w-full h-full bg-[#0A0D1E]/70 backdrop-blur-sm rounded-[14px] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>

              <span className="text-[11px] font-bold text-white tracking-tight leading-none">
                {act.label}
              </span>
              <span className="text-[9px] font-black text-brand-gold font-num mt-0.5">
                {act.sub}
              </span>
            </button>
          );
        })}
      </div>

      <AddCoinsModal isOpen={showAddCoins} onClose={() => setShowAddCoins(false)} />
    </>
  );
};
