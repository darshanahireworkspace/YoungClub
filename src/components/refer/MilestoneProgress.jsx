import React from 'react';
import { Trophy, Gift, Users, Share2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MilestoneProgress = () => {
  const { currentUser } = useAuth();
  const friendsCount = currentUser?.friendsCount || 0;
  const bonusEarned = currentUser?.bonusEarned || 0;

  const milestones = [
    { target: 5, reward: 500, label: 'Bronze Chest' },
    { target: 10, reward: 1500, label: 'Silver Chest' },
    { target: 25, reward: 5000, label: 'Gold Chest' },
  ];

  const maxTarget = 25;
  const progressPercent = Math.min(100, (friendsCount / maxTarget) * 100);

  const timelineSteps = [
    { num: '1', title: 'Share Link', desc: 'Send code or link to gaming buddies' },
    { num: '2', title: 'They Sign Up', desc: 'Friend joins & gets 1,000 coins' },
    { num: '3', title: 'Both Earn +200', desc: 'Instant virtual bonus credited' },
  ];

  return (
    <div className="space-y-4">
      {/* 3-Step "How Referral Works" Mini Timeline */}
      <div className="rounded-2xl p-4 bg-[#11172E] border border-white/10 space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 font-num">
          How Referral Works
        </h4>

        <div className="grid grid-cols-3 gap-2 relative">
          {timelineSteps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-black text-xs font-num flex items-center justify-center shadow-glow-primary mb-1.5">
                {step.num}
              </div>
              <div className="text-[11px] font-bold text-white">{step.title}</div>
              <div className="text-[9px] text-slate-400 mt-0.5 leading-snug">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards (Invited, Coins Earned) */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-[#11172E] border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 font-num">Total Invited</div>
            <div className="text-xl font-black font-num text-white">{friendsCount} Friends</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#11172E] border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-brand-gold flex items-center justify-center border border-brand-gold/30 shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 font-num">Coins Earned</div>
            <div className="text-xl font-black font-num text-brand-gold">+{bonusEarned}</div>
          </div>
        </div>
      </div>

      {/* Milestone Progress Bar with Reward Chests */}
      <div className="rounded-2xl p-4 bg-[#11172E] border border-white/10 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-brand-gold" />
            <h4 className="text-xs font-black uppercase tracking-wider text-white font-num">
              Milestone Reward Chests
            </h4>
          </div>
          <span className="text-xs font-num font-black text-brand-gold">
            {friendsCount} / {maxTarget} Friends
          </span>
        </div>

        {/* Progress Track */}
        <div className="relative w-full h-3 bg-[#080C1A] rounded-full overflow-hidden border border-white/10 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-brand-gold rounded-full transition-all duration-500 shadow-glow-primary"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Chest Markers */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {milestones.map((ms) => {
            const reached = friendsCount >= ms.target;
            return (
              <div
                key={ms.target}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  reached
                    ? 'bg-amber-500/15 border-brand-gold/50 text-brand-gold shadow-glow-gold'
                    : 'bg-[#151C38] border-white/10 text-slate-400'
                }`}
              >
                <div className="text-[10px] uppercase font-black font-num">
                  {ms.label}
                </div>
                <div className="text-xs font-black font-num text-white mt-0.5">
                  +{ms.reward.toLocaleString()}
                </div>
                <div className="text-[9px] mt-0.5 font-semibold">
                  {reached ? 'Claimed' : `${ms.target - friendsCount} left`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
