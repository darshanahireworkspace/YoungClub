import React, { useState } from 'react';
import { User, KeyRound, Edit3, Crown, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { EditProfileModal } from './EditProfileModal';
import { ChangePasswordModal } from './ChangePasswordModal';
import { useSound } from '../../context/SoundContext';

export const ProfileHeader = () => {
  const { currentUser } = useAuth();
  const { play } = useSound();
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);

  const initials = currentUser?.avatar || 'YC';
  const joinDate = currentUser?.createdAt 
    ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Jan 2024';

  return (
    <>
      {/* Profile Header with Gradient Cover */}
      <div className="relative overflow-hidden rounded-3xl bg-[#11172E] border border-white/10 shadow-xl">
        {/* Gradient Cover Top Strip */}
        <div className="h-20 w-full bg-gradient-to-r from-purple-800 via-fuchsia-700 to-pink-600 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Avatar Ring & Profile Details */}
        <div className="px-5 pb-5 -mt-10 relative z-10 space-y-4">
          <div className="flex items-end justify-between">
            {/* Avatar Ring with Initials */}
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-[#11172E] p-1 shadow-2xl">
                <div className="w-full h-full rounded-[20px] bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 shadow-glow-primary">
                  <div className="w-full h-full bg-[#0A0D1E] rounded-[18px] flex items-center justify-center font-display font-black text-2xl text-white tracking-wider">
                    {initials}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-tr from-brand-gold to-brand-goldEnd text-slate-950 flex items-center justify-center shadow-glow-gold">
                <Crown className="w-4 h-4 fill-slate-950" />
              </div>
            </div>

            {/* VIP Gold Level Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-brand-gold/20 to-amber-500/10 border border-brand-gold/40 text-brand-gold text-xs font-black font-num shadow-sm">
              <Crown className="w-3.5 h-3.5" />
              <span>VIP GOLD</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black text-white tracking-wide">
              {currentUser?.name || 'Gamer'}
            </h3>
            <div className="text-xs text-brand-magenta font-num font-bold mt-0.5">
              @{currentUser?.username || 'user'}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-1 font-num">
              <span>ID: {currentUser?.id || 'YC-0000'}</span>
              <span>&bull;</span>
              <span>Joined {joinDate}</span>
              <span>&bull;</span>
              <span>{currentUser?.mobile}</span>
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <button
              onClick={() => {
                if (play) play.click();
                setShowEdit(true);
              }}
              className="py-2.5 px-3 rounded-xl bg-[#161D3A] hover:bg-[#1E274D] border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors active:scale-97"
            >
              <User className="w-3.5 h-3.5 text-brand-purple" />
              <span>Edit Details</span>
            </button>

            <button
              onClick={() => {
                if (play) play.click();
                setShowChangePass(true);
              }}
              className="py-2.5 px-3 rounded-xl bg-[#161D3A] hover:bg-[#1E274D] border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors active:scale-97"
            >
              <KeyRound className="w-3.5 h-3.5 text-pink-400" />
              <span>Password</span>
            </button>
          </div>
        </div>
      </div>

      <EditProfileModal isOpen={showEdit} onClose={() => setShowEdit(false)} />
      <ChangePasswordModal isOpen={showChangePass} onClose={() => setShowChangePass(false)} />
    </>
  );
};
