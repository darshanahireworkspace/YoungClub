import React from 'react';
import { Gamepad2, Trophy, Percent, Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const GameStatsGrid = () => {
  const { currentUser } = useAuth();
  const stats = currentUser?.stats || {};
  const gamesPlayed = stats.gamesPlayed || 0;
  const wins = stats.wins || 0;
  const winRate = gamesPlayed > 0 ? Math.round((wins / gamesPlayed) * 100) : 0;
  const biggestWin = stats.biggestWin || 0;

  const statItems = [
    {
      label: 'Games Played',
      value: gamesPlayed,
      icon: Gamepad2,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      label: 'Total Wins',
      value: wins,
      icon: Trophy,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Win Rate',
      value: `${winRate}%`,
      icon: Percent,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Biggest Win',
      value: `+${biggestWin.toLocaleString()}`,
      icon: Flame,
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    },
  ];

  return (
    <div className="rounded-2xl p-4 glass-card border border-white/10 bg-[#0c102a]/90 space-y-3">
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-amber-400" />
        <h4 className="text-sm font-bold text-white">Gaming Statistics</h4>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {item.label}
                </div>
                <div className="text-sm font-black font-mono text-white mt-0.5">
                  {item.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
