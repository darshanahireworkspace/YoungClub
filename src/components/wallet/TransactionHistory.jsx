import React, { useState } from 'react';
import { 
  History, 
  Trophy, 
  Gift, 
  Coins, 
  Gamepad2, 
  Calendar,
  ArrowDownLeft,
  ArrowUpRight,
  Inbox
} from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';

export const TransactionHistory = () => {
  const { transactions } = useWallet();
  const { play } = useSound();
  const [filter, setFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Activity' },
    { id: 'credits', label: 'Recharges' },
    { id: 'game_win', label: 'Wins' },
    { id: 'debits', label: 'Bets' },
    { id: 'bonus', label: 'Bonuses' },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'all') return true;
    if (filter === 'credits') return tx.type === 'credit';
    if (filter === 'game_win') return tx.type === 'game_win';
    if (filter === 'debits') return tx.type === 'debit' || tx.amount < 0;
    if (filter === 'bonus') return tx.type === 'bonus';
    return true;
  });

  const getTxIcon = (tx) => {
    if (tx.type === 'game_win') return Trophy;
    if (tx.type === 'bonus') return Gift;
    if (tx.type === 'credit') return Coins;
    return Gamepad2;
  };

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="rounded-3xl p-5 bg-[#11172E] border border-white/10 space-y-4 shadow-lg">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-brand-purple" />
          <h4 className="text-sm font-black uppercase tracking-wider text-white font-num">
            Transaction Activity
          </h4>
        </div>
        <span className="text-xs text-brand-gold font-num font-black">
          {filteredTransactions.length} Records
        </span>
      </div>

      {/* Filter Chips Scrolling Horizontally */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {filterTabs.map((tab) => {
          const isSelected = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (play) play.click();
                setFilter(tab.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-num whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-pink-400 shadow-glow-primary'
                  : 'bg-[#151C38] text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Transactions List */}
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {filteredTransactions.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-2">
              <Inbox className="w-7 h-7" />
            </div>
            <div className="text-sm font-bold text-slate-300">No records found</div>
            <div className="text-xs text-slate-500 mt-0.5">Try changing the filter above</div>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const Icon = getTxIcon(tx);
            const isPositive = tx.amount > 0;

            return (
              <div
                key={tx.id}
                className="p-3.5 rounded-2xl bg-[#151C38] border border-white/5 flex items-center justify-between gap-3 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Circular Icon with Green / Red styling */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                      isPositive
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{tx.title}</h5>
                    <p className="text-[11px] text-slate-400 truncate max-w-[170px] sm:max-w-xs">
                      {tx.description}
                    </p>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-num">
                      {formatDate(tx.timestamp)}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-base font-black font-num ${
                      isPositive ? 'text-emerald-400' : 'text-brand-red'
                    }`}
                  >
                    {isPositive ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()}
                  </span>
                  <div className="text-[9px] text-slate-400 uppercase font-black font-num">
                    {tx.type.replace('_', ' ')}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
