import React from 'react';
import { Users, UserPlus, CheckCircle2 } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

export const FriendsList = () => {
  const { friends, simulateFriendJoined } = useWallet();

  return (
    <div className="rounded-3xl p-5 bg-[#11172E] border border-white/10 space-y-3.5 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-purple" />
          <h4 className="text-sm font-black uppercase tracking-wider text-white font-num">
            Invited Friends ({friends.length})
          </h4>
        </div>

        {/* DEMO BUTTON: Simulate Friend Joined */}
        <button
          type="button"
          onClick={simulateFriendJoined}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs font-num shadow-glow-primary active:scale-95 transition-all"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>SIMULATE FRIEND</span>
        </button>
      </div>

      <p className="text-xs text-slate-400 leading-snug">
        Tap the simulation button above to test the referral bonus (+200 coins) and milestone progress live!
      </p>

      {/* Friends list */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {friends.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500">
            No friends invited yet. Use the simulation button to test!
          </div>
        ) : (
          friends.map((friend) => (
            <div
              key={friend.id}
              className="p-3 rounded-2xl bg-[#151C38] border border-white/5 flex items-center justify-between gap-3 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-black text-xs text-white shrink-0">
                  {friend.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{friend.name}</h5>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-num">
                    <span>{friend.mobile}</span>
                    <span>&bull;</span>
                    <span>{friend.joinedDate}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-num font-black text-emerald-400">
                  +{friend.bonusGranted} Coins
                </div>
                <div className="text-[10px] text-emerald-400/80 flex items-center gap-1 justify-end font-num">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>{friend.status}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
