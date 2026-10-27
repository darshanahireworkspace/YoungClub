import React from 'react';
import { Trophy, Gamepad2, Gift } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const WalletSummary = () => {
  const { currentUser } = useAuth();
  const stats = currentUser?.stats || {};
  const totalWon = stats.totalWon || 0;
  const totalPlayed = stats.totalPlayed || 0;
  const bonusEarned = currentUser?.bonusEarned || 0;

  const cards = [
    {
      label: 'Coins Won',
      value: `+${totalWon.toLocaleString()}`,
      icon: Trophy,
      color: 'text-brand-gold bg-amber-500/15 border-amber-500/30',
      valueColor: 'text-brand-gold',
    },
    {
      label: 'Coins Played',
      value: totalPlayed.toLocaleString(),
      icon: Gamepad2,
      color: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
      valueColor: 'text-purple-300',
    },
    {
      label: 'Bonus Earned',
      value: `+${bonusEarned.toLocaleString()}`,
      icon: Gift,
      color: 'text-pink-400 bg-pink-500/15 border-pink-500/30',
      valueColor: 'text-pink-300',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            className="p-3.5 rounded-2xl bg-[#11172E] border border-white/10 flex flex-col justify-between shadow-sm"
          >
            <div className={`w-8 h-8 rounded-xl ${c.color} border flex items-center justify-center mb-2`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight">
                {c.label}
              </div>
              <div className={`text-sm font-black font-num mt-0.5 ${c.valueColor}`}>
                {c.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
