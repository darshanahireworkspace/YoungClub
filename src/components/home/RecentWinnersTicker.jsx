import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { LIVE_WINNERS_TICKER } from '../../services/mockData';

export const RecentWinnersTicker = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % LIVE_WINNERS_TICKER.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const winner = LIVE_WINNERS_TICKER[index];
  const initials = winner.user.slice(0, 2).toUpperCase();

  return (
    <div className="bg-[#11172E] border border-white/10 rounded-2xl px-3 py-2.5 flex items-center gap-2.5 overflow-hidden shadow-sm">
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-400 text-[10px] font-black uppercase font-num shrink-0 border border-emerald-500/30">
        <TrendingUp className="w-3 h-3" />
        <span>LIVE WINS</span>
      </div>

      <div className="flex-1 overflow-hidden h-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={winner.user + index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 text-xs text-slate-300 truncate h-full"
          >
            {/* Avatar Circle */}
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-black text-[9px] flex items-center justify-center shrink-0">
              {initials}
            </div>

            <span className="font-bold text-white truncate">{winner.user}</span>
            <span className="text-slate-400 text-[11px]">won</span>
            <span className="font-black text-brand-gold font-num text-sm">
              +{winner.amount.toLocaleString()}
            </span>
            <span className="text-slate-400 text-[11px]">in</span>
            <span className="text-pink-300 font-bold truncate">{winner.game}</span>
            <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[10px] font-num font-bold">
              {winner.multiplier}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
