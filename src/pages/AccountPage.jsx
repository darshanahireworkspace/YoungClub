import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RotateCw,
  Copy,
  ChevronRight,
  Power,
  Mail,
  Gift,
  Ticket,
  BarChart2,
  Globe,
  Settings,
  ClipboardList,
  Megaphone,
  MessageCircle,
  BookOpen,
  Box,
  Wallet,
  Coins,
  CreditCard,
  Gem,
  FileText,
  Bookmark,
  CheckCircle2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav } from '../components/common/BottomNav';
import { AddCoinsModal } from '../components/common/AddCoinsModal';
import { LanguageModal } from '../components/common/LanguageModal';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { useSound } from '../context/SoundContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';

export const AccountPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { balance } = useWallet();
  const { play } = useSound();
  const { success, info } = useToast();
  const { currentLanguage, activeLangObj } = useLanguage();

  // Modals
  const [showAddCoins, setShowAddCoins] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState(null);

  // Dynamic user details with fallbacks matching screenshot
  const username = currentUser?.username ? currentUser.username.toUpperCase() : 'MEMBERNNGH8C8U';
  const uid = currentUser?.id ? currentUser.id.replace('YC-', '') : '5531917';
  const lastLogin = '2026-10-27 18:03:41';

  const handleCopyUid = () => {
    if (play) play.click();
    navigator.clipboard?.writeText(uid);
    success(`Copied UID: ${uid}`);
  };

  const handleRefreshBalance = () => {
    if (play) play.chip();
    success('Balance updated');
  };

  const handleConfirmLogout = () => {
    if (play) play.click();
    logout();
    success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#111428] text-white flex flex-col justify-between pb-28 relative overflow-x-hidden selection:bg-[#7B61FF]">
      <main className="w-full max-w-[480px] mx-auto">
        {/* 1. HERO HEADER BANNER (Screenshot Match) */}
        <div className="relative px-4 pt-6 pb-12 bg-gradient-to-r from-[#FF7657] via-[#C94FE2] to-[#438EFF] text-white">
          <div className="flex items-center gap-3">
            {/* Circular Avatar */}
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/80 shadow-md shrink-0 bg-slate-800">
              <img
                src="/images/user_avatar.jpg"
                alt="Member Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Member Details */}
            <div className="flex-1 min-w-0">
              {/* Username + VIP Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-black text-white tracking-wide font-display truncate">
                  {username}
                </span>
                {/* VIP2 Badge */}
                <div className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs font-num shrink-0">
                  <span>⭐ VIP2</span>
                </div>
              </div>

              {/* UID Pill with Copy Icon */}
              <div className="flex items-center gap-1.5 mt-1">
                <div
                  onClick={handleCopyUid}
                  className="bg-black/25 hover:bg-black/35 px-2 py-0.5 rounded-md text-[10px] font-bold text-amber-300 font-num flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  <span>UID &nbsp;|&nbsp; {uid}</span>
                  <Copy className="w-3 h-3 text-amber-200" />
                </div>
              </div>

              {/* Last Login Timestamp */}
              <div className="text-[10px] text-white/85 font-medium mt-1">
                Last login: {lastLogin}
              </div>
            </div>
          </div>
        </div>

        {/* 2. TOTAL BALANCE & 4 ACTION BUTTONS CARD (Overlaps header with -mt-8) */}
        <div className="-mt-7 mx-4 relative z-10 bg-[#1A1E38] border border-white/10 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          {/* Total balance row */}
          <div>
            <span className="text-xs text-slate-300 font-medium">Total balance</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-2xl font-black text-white font-num tracking-tight">
                ₹{(balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <button
                type="button"
                onClick={handleRefreshBalance}
                title="Refresh balance"
                className="p-1 text-slate-400 hover:text-white active:rotate-180 transition-all duration-300"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-b border-white/10 my-3.5" />

          {/* 4 Action Buttons Grid (ARWallet, Deposit, Withdraw, VIP) */}
          <div className="grid grid-cols-4 gap-2 text-center select-none">
            {/* 1. ARWallet */}
            <div
              onClick={() => {
                if (play) play.click();
                navigate('/wallet');
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#E11D48]/15 border border-rose-500/30 flex items-center justify-center mb-1.5 group-hover:scale-105 active:scale-95 transition-transform shadow-xs">
                <Wallet className="w-5 h-5 text-rose-400" />
              </div>
              <span className="text-[11px] font-bold text-slate-200 group-hover:text-white">
                ARWallet
              </span>
            </div>

            {/* 2. Deposit */}
            <div
              onClick={() => {
                if (play) play.click();
                setShowAddCoins(true);
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#D97706]/15 border border-amber-500/30 flex items-center justify-center mb-1.5 group-hover:scale-105 active:scale-95 transition-transform shadow-xs">
                <Coins className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-[11px] font-bold text-slate-200 group-hover:text-white">
                Deposit
              </span>
            </div>

            {/* 3. Withdraw */}
            <div
              onClick={() => {
                if (play) play.click();
                info('Withdrawal processing is instant for VIP members.');
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#2563EB]/15 border border-blue-500/30 flex items-center justify-center mb-1.5 group-hover:scale-105 active:scale-95 transition-transform shadow-xs">
                <CreditCard className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-[11px] font-bold text-slate-200 group-hover:text-white">
                Withdraw
              </span>
            </div>

            {/* 4. VIP */}
            <div
              onClick={() => {
                if (play) play.chip();
                setInfoModalContent({
                  title: 'VIP Privileges',
                  desc: 'You are currently Tier VIP2! Enjoy 1.2x daily streak boosts, priority withdrawals, and exclusive milestone chests.',
                });
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#059669]/15 border border-emerald-500/30 flex items-center justify-center mb-1.5 group-hover:scale-105 active:scale-95 transition-transform shadow-xs">
                <Gem className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-[11px] font-bold text-slate-200 group-hover:text-white">
                VIP
              </span>
            </div>
          </div>
        </div>

        {/* 3. HISTORY 2x2 CARDS (Game History, Transaction, Deposit, Withdraw) */}
        <div className="px-4 pt-3.5 grid grid-cols-2 gap-2.5">
          {/* Card 1: Game History */}
          <div
            onClick={() => {
              if (play) play.click();
              setInfoModalContent({
                title: 'Game History',
                desc: 'View all recent Crash multipliers, Wingo colors, and tactical bets in real-time.',
              });
            }}
            className="p-3 rounded-2xl bg-[#1A1E38] border border-white/5 hover:border-white/10 flex items-center gap-3 cursor-pointer shadow-sm active:scale-98 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="text-xs font-bold text-white">Game History</div>
              <div className="text-[10px] text-slate-400 mt-0.5">My game history</div>
            </div>
          </div>

          {/* Card 2: Transaction */}
          <div
            onClick={() => {
              if (play) play.click();
              setInfoModalContent({
                title: 'Transaction History',
                desc: 'All virtual coin recharges, welcome bonuses, and streak claims are logged.',
              });
            }}
            className="p-3 rounded-2xl bg-[#1A1E38] border border-white/5 hover:border-white/10 flex items-center gap-3 cursor-pointer shadow-sm active:scale-98 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="text-xs font-bold text-white">Transaction</div>
              <div className="text-[10px] text-slate-400 mt-0.5">My transaction history</div>
            </div>
          </div>

          {/* Card 3: Deposit History */}
          <div
            onClick={() => {
              if (play) play.click();
              setInfoModalContent({
                title: 'Deposit Records',
                desc: 'Deposit status is completed immediately with instant coin credits.',
              });
            }}
            className="p-3 rounded-2xl bg-[#1A1E38] border border-white/5 hover:border-white/10 flex items-center gap-3 cursor-pointer shadow-sm active:scale-98 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <Bookmark className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="text-xs font-bold text-white">Deposit</div>
              <div className="text-[10px] text-slate-400 mt-0.5">My deposit history</div>
            </div>
          </div>

          {/* Card 4: Withdraw History */}
          <div
            onClick={() => {
              if (play) play.click();
              setInfoModalContent({
                title: 'Withdrawal Records',
                desc: 'Safe virtual wallet records protected by end-to-end audit logs.',
              });
            }}
            className="p-3 rounded-2xl bg-[#1A1E38] border border-white/5 hover:border-white/10 flex items-center gap-3 cursor-pointer shadow-sm active:scale-98 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="text-xs font-bold text-white">Withdraw</div>
              <div className="text-[10px] text-slate-400 mt-0.5">My withdraw history</div>
            </div>
          </div>
        </div>

        {/* 4. MENU LIST (Notification, Gifts, Coupons, Statistics, Language) */}
        <div className="mx-4 mt-3 bg-[#1A1E38] border border-white/5 rounded-2xl divide-y divide-white/5 overflow-hidden shadow-sm">
          {/* Notification */}
          <div
            onClick={() => {
              if (play) play.click();
              setInfoModalContent({
                title: 'Notifications',
                desc: 'No unread platform notices. You are up to date on all rewards and system events.',
              });
            }}
            className="px-4 py-3.5 flex items-center justify-between hover:bg-white/[0.03] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3 text-xs font-bold text-white">
              <Mail className="w-4 h-4 text-[#8E82E3]" />
              <span>Notification</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>

          {/* Gifts */}
          <div
            onClick={() => {
              if (play) play.win();
              success('Gift claimed: +200 bonus coins awarded!');
            }}
            className="px-4 py-3.5 flex items-center justify-between hover:bg-white/[0.03] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3 text-xs font-bold text-white">
              <Gift className="w-4 h-4 text-[#8E82E3]" />
              <span>Gifts</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>

          {/* My Top-Up Coupons */}
          <div
            onClick={() => {
              if (play) play.click();
              setInfoModalContent({
                title: 'Top-Up Coupons',
                desc: 'Active Coupons: 1x 100% Recharge Booster, 1x VIP Cashout Shield.',
              });
            }}
            className="px-4 py-3.5 flex items-center justify-between hover:bg-white/[0.03] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3 text-xs font-bold text-white">
              <Ticket className="w-4 h-4 text-[#8E82E3]" />
              <span>My Top-Up Coupons</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>

          {/* Game statistics */}
          <div
            onClick={() => {
              if (play) play.click();
              setInfoModalContent({
                title: 'Game Statistics',
                desc: 'Games Played: 24 | Wins: 15 (62.5% winrate) | Biggest Multiplier Win: 2,400 Coins.',
              });
            }}
            className="px-4 py-3.5 flex items-center justify-between hover:bg-white/[0.03] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3 text-xs font-bold text-white">
              <BarChart2 className="w-4 h-4 text-[#8E82E3]" />
              <span>Game statistics</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>

          {/* Language Selector */}
          <div
            onClick={() => {
              if (play) play.click();
              setShowLanguage(true);
            }}
            className="px-4 py-3.5 flex items-center justify-between hover:bg-white/[0.03] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3 text-xs font-bold text-white">
              <Globe className="w-4 h-4 text-[#8E82E3]" />
              <span>Language</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>{activeLangObj?.name || 'English'}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>

        {/* 5. SERVICE CENTER (Settings, Feedback, Announcement, Customer Service, Guide, About us) */}
        <div className="mx-4 mt-3 bg-[#1A1E38] border border-white/5 rounded-2xl p-4 space-y-4 shadow-sm">
          <div className="text-xs font-bold text-white">Service center</div>

          <div className="grid grid-cols-3 gap-y-4 gap-x-2 text-center select-none">
            {/* Settings */}
            <div
              onClick={() => {
                if (play) play.click();
                setInfoModalContent({
                  title: 'Account Settings',
                  desc: 'Manage profile credentials, audio effects, and privacy controls.',
                });
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#8E82E3]/15 text-[#8E82E3] flex items-center justify-center mb-1 group-hover:scale-105 active:scale-95 transition-transform">
                <Settings className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-300 group-hover:text-white">Settings</span>
            </div>

            {/* Feedback */}
            <div
              onClick={() => {
                if (play) play.click();
                setInfoModalContent({
                  title: 'Feedback',
                  desc: 'Thank you for your valuable feedback! Our team reviews player suggestions daily.',
                });
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#8E82E3]/15 text-[#8E82E3] flex items-center justify-center mb-1 group-hover:scale-105 active:scale-95 transition-transform">
                <ClipboardList className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-300 group-hover:text-white">Feedback</span>
            </div>

            {/* Announcement */}
            <div
              onClick={() => {
                if (play) play.click();
                setInfoModalContent({
                  title: 'Announcements',
                  desc: 'Latest maintenance update: Young Club server upgraded with 99.9% uptime and zero latency.',
                });
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#8E82E3]/15 text-[#8E82E3] flex items-center justify-center mb-1 group-hover:scale-105 active:scale-95 transition-transform">
                <Megaphone className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-300 group-hover:text-white">Announcement</span>
            </div>

            {/* Customer Service */}
            <div
              onClick={() => {
                if (play) play.click();
                setInfoModalContent({
                  title: 'Customer Service 24/7',
                  desc: 'Customer service agent online. Tap live chat to connect with official support.',
                });
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#8E82E3]/15 text-[#8E82E3] flex items-center justify-center mb-1 group-hover:scale-105 active:scale-95 transition-transform">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-300 group-hover:text-white leading-tight">Customer Service</span>
            </div>

            {/* Beginner's Guide */}
            <div
              onClick={() => {
                if (play) play.click();
                setInfoModalContent({
                  title: "Beginner's Guide",
                  desc: 'Learn how to play Aviator Crash curve, predict colors in Wingo, and multiply virtual tokens safely.',
                });
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#8E82E3]/15 text-[#8E82E3] flex items-center justify-center mb-1 group-hover:scale-105 active:scale-95 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-300 group-hover:text-white leading-tight">Beginner&apos;s Guide</span>
            </div>

            {/* About us */}
            <div
              onClick={() => {
                if (play) play.click();
                setInfoModalContent({
                  title: 'About Young Club',
                  desc: 'Young Club is the next-gen arcade entertainment experience. Play games, invite friends, and enjoy non-stop thrills.',
                });
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#8E82E3]/15 text-[#8E82E3] flex items-center justify-center mb-1 group-hover:scale-105 active:scale-95 transition-transform">
                <Box className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-300 group-hover:text-white">About us</span>
            </div>
          </div>
        </div>

        {/* 6. LOG OUT PILL BUTTON (Screenshot Match) */}
        <div className="mx-4 mt-5 mb-4">
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full py-3 rounded-full border border-[#6B66C5] bg-transparent text-[#9D94FF] hover:bg-white/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-bold text-xs"
          >
            <Power className="w-4 h-4 stroke-[2.5]" />
            <span>Log out</span>
          </button>
        </div>
      </main>

      {/* 7. BOTTOM NAVIGATION BAR (Image 2) */}
      <BottomNav />

      {/* Modals */}
      <AddCoinsModal isOpen={showAddCoins} onClose={() => setShowAddCoins(false)} />
      <LanguageModal isOpen={showLanguage} onClose={() => setShowLanguage(false)} />

      {/* Info Dialog */}
      <AnimatePresence>
        {infoModalContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInfoModalContent(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-sm bg-[#1D213A] border border-white/10 rounded-2xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-sm font-bold text-white">{infoModalContent.title}</h3>
                <button
                  type="button"
                  onClick={() => setInfoModalContent(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{infoModalContent.desc}</p>
              <button
                type="button"
                onClick={() => setInfoModalContent(null)}
                className="w-full py-2.5 rounded-full bg-[#7B61FF] text-white text-xs font-bold hover:bg-[#6c51f5]"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Dialog */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-sm bg-[#1D213A] border border-white/10 rounded-2xl p-5 text-center space-y-3"
            >
              <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <Power className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Log Out</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Are you sure you want to log out of your Young Club account?
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="py-2.5 rounded-full bg-rose-600 text-white text-xs font-bold hover:bg-rose-500"
                >
                  Log Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
