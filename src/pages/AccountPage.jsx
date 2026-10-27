import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  KeyRound, 
  Trophy, 
  Volume2, 
  Bell, 
  HelpCircle, 
  Info, 
  LogOut, 
  ChevronRight, 
  RefreshCw, 
  ShieldCheck,
  Gamepad2,
  Percent,
  Flame
} from 'lucide-react';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { ProfileHeader } from '../components/account/ProfileHeader';
import { EditProfileModal } from '../components/account/EditProfileModal';
import { ChangePasswordModal } from '../components/account/ChangePasswordModal';
import { FAQAccordion } from '../components/account/FAQAccordion';
import { AboutModal } from '../components/account/AboutModal';
import { Modal } from '../components/ui/Modal';
import { Toggle } from '../components/ui/Toggle';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { useSound } from '../context/SoundContext';
import { useToast } from '../context/ToastContext';

export const AccountPage = () => {
  const navigate = useNavigate();
  const { currentUser, updateSettings, logout } = useAuth();
  const { addCoins } = useWallet();
  const { soundEnabled, toggleSound, play } = useSound();
  const { success } = useToast();

  const [showEdit, setShowEdit] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const notificationsEnabled = currentUser?.settings?.notifications ?? true;
  const stats = currentUser?.stats || {};
  const gamesPlayed = stats.gamesPlayed || 0;
  const wins = stats.wins || 0;
  const winRate = gamesPlayed > 0 ? Math.round((wins / gamesPlayed) * 100) : 0;
  const biggestWin = stats.biggestWin || 0;

  const handleToggleNotifications = (val) => {
    if (play) play.click();
    updateSettings({ notifications: val });
    success(val ? 'In-app notifications enabled' : 'Notifications muted');
  };

  const handleReplenishBalance = () => {
    if (play) play.cashout();
    addCoins(5000, 'Demo Balance Topup');
    success('Virtual balance topped up with +5,000 Coins!');
  };

  const handleConfirmLogout = () => {
    if (play) play.click();
    logout();
    success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0B0F1E] text-white flex flex-col justify-between pb-24 relative overflow-hidden">
      {/* Top Header */}
      <Header />

      <main className="p-4 space-y-4 max-w-lg mx-auto w-full">
        {/* Profile Card Header */}
        <ProfileHeader />

        {/* Group 1: Gaming Performance Stats */}
        <div className="rounded-3xl p-5 bg-[#11172E] border border-white/10 space-y-3.5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-brand-gold" />
              <h4 className="text-xs font-black uppercase tracking-wider text-white font-num">
                Gaming Performance
              </h4>
            </div>
            <span className="text-[10px] text-brand-gold font-num font-black uppercase">
              LIFETIME STATS
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-[#151C38] border border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase font-num">Played</div>
                <div className="text-base font-black font-num text-white mt-0.5">{gamesPlayed}</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#151C38] border border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Percent className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase font-num">Win Rate</div>
                <div className="text-base font-black font-num text-emerald-400 mt-0.5">{winRate}%</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#151C38] border border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-brand-gold border border-brand-gold/30 flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase font-num">Total Wins</div>
                <div className="text-base font-black font-num text-brand-gold mt-0.5">{wins}</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#151C38] border border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-500/15 text-pink-400 border border-pink-500/30 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase font-num">Biggest Win</div>
                <div className="text-base font-black font-num text-pink-400 mt-0.5">+{biggestWin}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Group 2: Account Settings (Grouped List Rows) */}
        <div className="rounded-3xl bg-[#11172E] border border-white/10 overflow-hidden shadow-lg">
          <div className="px-5 py-3 border-b border-white/5 text-[10px] font-black uppercase tracking-wider text-slate-400 font-num">
            Account &amp; Security
          </div>

          <div className="divide-y divide-white/5">
            <button
              onClick={() => {
                if (play) play.click();
                setShowEdit(true);
              }}
              className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">Profile Details</div>
                  <div className="text-[11px] text-slate-400">Update full name and mobile number</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={() => {
                if (play) play.click();
                setShowChangePass(true);
              }}
              className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">Change Password</div>
                  <div className="text-[11px] text-slate-400">Update stored credentials</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Group 3: Preferences & Toggles */}
        <div className="rounded-3xl bg-[#11172E] border border-white/10 overflow-hidden shadow-lg">
          <div className="px-5 py-3 border-b border-white/5 text-[10px] font-black uppercase tracking-wider text-slate-400 font-num">
            App Preferences
          </div>

          <div className="divide-y divide-white/5">
            {/* Sound Effects Toggle */}
            <div className="px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">Sound Effects</div>
                  <div className="text-[11px] text-slate-400">Audio feedback during gameplay</div>
                </div>
              </div>
              <Toggle
                checked={soundEnabled}
                onChange={toggleSound}
                color="gold"
              />
            </div>

            {/* In-App Notifications Toggle */}
            <div className="px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">In-App Alerts</div>
                  <div className="text-[11px] text-slate-400">Bonus &amp; game result notifications</div>
                </div>
              </div>
              <Toggle
                checked={notificationsEnabled}
                onChange={handleToggleNotifications}
                color="purple"
              />
            </div>

            {/* Replenish Demo Balance */}
            <div className="px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">Replenish Virtual Coins</div>
                  <div className="text-[11px] text-slate-400">Add +5,000 practice tokens</div>
                </div>
              </div>
              <button
                onClick={handleReplenishBalance}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-black font-num active:scale-95 transition-all"
              >
                +5,000
              </button>
            </div>
          </div>
        </div>

        {/* Group 4: Support & Legal */}
        <div className="rounded-3xl bg-[#11172E] border border-white/10 overflow-hidden shadow-lg">
          <div className="px-5 py-3 border-b border-white/5 text-[10px] font-black uppercase tracking-wider text-slate-400 font-num">
            Support &amp; Information
          </div>

          <div className="divide-y divide-white/5">
            <button
              onClick={() => {
                if (play) play.click();
                setShowFaq(true);
              }}
              className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">Frequently Asked Questions</div>
                  <div className="text-[11px] text-slate-400">Rules, coins, and fair odds</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={() => {
                if (play) play.click();
                setShowAbout(true);
              }}
              className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">About Young Club</div>
                  <div className="text-[11px] text-slate-400">Architecture, tech stack &amp; disclaimer</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Group 5: Red Logout Button */}
        <button
          onClick={() => {
            if (play) play.click();
            setShowLogoutConfirm(true);
          }}
          className="w-full py-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-brand-red/30 text-rose-300 font-black text-xs font-num tracking-wide flex items-center justify-center gap-2 active:scale-97 transition-all shadow-sm"
        >
          <LogOut className="w-4 h-4 text-brand-red" />
          <span>SIGN OUT FROM YOUNG CLUB</span>
        </button>
      </main>

      {/* Modals */}
      <EditProfileModal isOpen={showEdit} onClose={() => setShowEdit(false)} />
      <ChangePasswordModal isOpen={showChangePass} onClose={() => setShowChangePass(false)} />
      <Modal isOpen={showFaq} onClose={() => setShowFaq(false)} title="Help & FAQ">
        <FAQAccordion />
      </Modal>
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />

      {/* Logout Confirmation */}
      <Modal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        title="Confirm Sign Out"
      >
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            Are you sure you want to sign out? Your virtual coin balance and transaction records will remain safely saved in your browser local storage.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold text-xs text-white active:scale-97"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmLogout}
              className="py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black font-num text-xs shadow-glow-red active:scale-97"
            >
              Sign Out
            </button>
          </div>
        </div>
      </Modal>

      <BottomNav />
    </div>
  );
};
