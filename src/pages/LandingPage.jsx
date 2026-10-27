import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, Zap, ShieldCheck, ChevronDown, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { useLanguage } from '../context/LanguageContext';
import { YoungClubLogo } from '../components/common/YoungClubLogo';
import { FlagIcon } from '../components/common/FlagIcon';
import { LanguageModal } from '../components/common/LanguageModal';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const { play } = useSound();
  const { currentLanguage, currentLangData } = useLanguage();

  const [showLangModal, setShowLangModal] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);

  // 5-Second Automatic Redirect to Login / Register Page
  useEffect(() => {
    // Countdown ticker
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    // Auto redirect after exactly 5 seconds
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/home', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isAuthenticated, navigate]);

  // 1-Click Instant Demo Login
  const handleQuickDemo = async () => {
    try {
      setIsLoggingIn(true);
      if (play) play.cashout();
      await login('7620349985', 'Nikhil2006');
      navigate('/home');
    } catch (err) {
      console.error('Quick login error:', err);
      navigate('/login');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSkip = () => {
    if (play) play.click();
    navigate(isAuthenticated ? '/home' : '/login');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#070A18] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* ============================================================ */}
      {/* 1. Full-Screen Edge-to-Edge Hero Background (NO BOXES)      */}
      {/* ============================================================ */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img
          src="/images/landing_hero_mascots.jpg"
          alt="Young Club"
          className="w-full h-full object-cover object-center"
        />

        {/* Cinematic ambient overlays for crisp contrast & atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A18]/90 via-transparent to-[#070A18]/95" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#070A18] via-[#070A18]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#070A18] via-[#070A18]/85 to-transparent" />
      </div>

      {/* 5-Second Top Progress Line */}
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 5, ease: 'linear' }}
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#FF7657] via-[#D354DF] to-[#5C94FF] z-50 shadow-[0_0_10px_rgba(211,84,223,0.8)]"
      />

      {/* ============================================================ */}
      {/* 2. Top Bar: Language Selector (Left) + Skip Countdown (Right)*/}
      {/* ============================================================ */}
      <header className="relative z-30 pt-4 px-4 flex items-center justify-between w-full">
        {/* Language Selector Pill */}
        <button
          type="button"
          onClick={() => {
            if (play) play.click();
            setShowLangModal(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all active:scale-95 shadow-lg"
        >
          <FlagIcon country={currentLangData?.flag || 'US'} size={18} />
          <span className="text-xs font-bold text-white tracking-wide">
            {currentLanguage}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Skip Timer Pill (2s Countdown) */}
        <button
          type="button"
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 backdrop-blur-md transition-all active:scale-95 text-xs font-bold text-slate-200 hover:text-white shadow-lg cursor-pointer"
        >
          <span>Skip</span>
          <span className="px-1.5 py-0.2 rounded-full bg-purple-600/60 text-[10px] text-white font-num font-black">
            {secondsLeft}s
          </span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
        </button>
      </header>

      {/* ============================================================ */}
      {/* 3. Top Branding Section: 3D Gaming Logo + Slogan             */}
      {/* ============================================================ */}
      <div className="relative z-20 pt-2 pb-1 px-4 flex flex-col items-center text-center">
        {/* Young Club 3D Gaming Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="cursor-pointer"
          onClick={() => {
            if (play) play.chip();
          }}
        >
          <YoungClubLogo height={56} className="drop-shadow-[0_4px_20px_rgba(0,180,216,0.5)]" />
        </motion.div>

        {/* Exact Slogan from Screenshot: "Withdraw fast,safe and stable" */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white font-black text-sm tracking-wide mt-2.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-display uppercase"
        >
          Withdraw fast,safe and stable
        </motion.h2>
      </div>

      {/* ============================================================ */}
      {/* 4. Full-Bleed Animated Floating Micro-Elements              */}
      {/* ============================================================ */}
      <div className="relative flex-1 w-full pointer-events-none z-10 overflow-hidden">
        {/* Floating ₹500 currency note */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [-14, 6, -14],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-5 z-20"
        >
          <div className="px-2.5 py-1 rounded-md bg-emerald-500/95 border border-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.8)] text-[10px] font-black text-white flex items-center gap-1 backdrop-blur-xs">
            <span>₹</span>
            <span>500</span>
          </div>
        </motion.div>

        {/* Floating ₹2000 currency note */}
        <motion.div
          animate={{
            y: [8, -8, 8],
            rotate: [10, -12, 10],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-6 z-20"
        >
          <div className="px-2.5 py-1 rounded-md bg-pink-500/95 border border-pink-300 shadow-[0_0_16px_rgba(236,72,153,0.8)] text-[10px] font-black text-white flex items-center gap-1 backdrop-blur-xs">
            <span>₹</span>
            <span>2000</span>
          </div>
        </motion.div>

        {/* Floating TRX Sphere */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-48 left-6 z-20"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-800 via-purple-600 to-indigo-400 border border-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.85)] flex items-center justify-center">
            <span className="text-[9px] font-black text-white tracking-widest">TRX</span>
          </div>
        </motion.div>

        {/* Floating 8-Ball Sphere */}
        <motion.div
          animate={{
            y: [10, -10, 10],
            scale: [1.03, 0.96, 1.03],
          }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-52 right-6 z-20"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-950 via-slate-900 to-purple-800 border border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.9)] flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-inner">
              <span className="text-[10px] font-black text-slate-950">8</span>
            </div>
          </div>
        </motion.div>

        {/* Ambient Corner Sparkles */}
        <span className="absolute top-10 right-20 text-yellow-300 text-sm animate-ping [animation-duration:3s]">
          ✦
        </span>
        <span className="absolute bottom-20 left-16 text-cyan-300 text-sm animate-pulse [animation-duration:2s]">
          ✦
        </span>
      </div>

      {/* ============================================================ */}
      {/* 5. Bottom Action Dock: Register, Login, 1-Click Fast Demo    */}
      {/* ============================================================ */}
      <footer className="relative z-30 px-4 pb-6 pt-2 space-y-3 w-full max-w-md mx-auto">
        {/* Primary Action Buttons: Register & Log In Side-by-Side */}
        <div className="grid grid-cols-2 gap-3">
          {/* Register Button (Signature Gradient) */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => {
              if (play) play.click();
              navigate('/register');
            }}
            className="py-3.5 px-4 rounded-full bg-gradient-to-r from-[#FF7657] via-[#D354DF] to-[#5C94FF] text-white font-extrabold text-sm tracking-wide shadow-[0_6px_25px_rgba(211,84,223,0.5)] hover:brightness-110 active:brightness-95 flex items-center justify-center gap-2 font-display uppercase transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-white" />
            <span>Register</span>
          </motion.button>

          {/* Login Button (Sleek Glassmorphic Border) */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => {
              if (play) play.click();
              navigate('/login');
            }}
            className="py-3.5 px-4 rounded-full bg-[#1A1F3B]/90 hover:bg-[#23294E] border border-[#7B61FF]/70 hover:border-[#7B61FF] text-white font-extrabold text-sm tracking-wide shadow-[0_4px_20px_rgba(123,97,255,0.3)] flex items-center justify-center gap-2 font-display uppercase transition-all cursor-pointer"
          >
            <LogIn className="w-4 h-4 text-[#A294F9]" />
            <span>Log In</span>
          </motion.button>
        </div>

        {/* 1-Click Fast Demo Login Option */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          disabled={isLoggingIn}
          onClick={handleQuickDemo}
          className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-amber-500/25 via-yellow-500/25 to-orange-500/25 border border-amber-400/50 hover:border-amber-400/80 text-amber-300 font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-inner transition-all backdrop-blur-md font-display cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-400" />
          <span>
            {isLoggingIn ? 'Logging In Demo...' : '1-Click Fast Demo Login (7620349985)'}
          </span>
        </motion.button>

        {/* Security Badges */}
        <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 pt-0.5">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Safe &amp; Stable</span>
          </div>
          <span>&bull;</span>
          <span className="text-amber-400/90 font-medium">⚡ Instant ₹ Payout</span>
          <span>&bull;</span>
          <span>18+ Only</span>
        </div>
      </footer>

      {/* Language Bottom Sheet Drawer Modal */}
      <LanguageModal
        isOpen={showLangModal}
        onClose={() => setShowLangModal(false)}
      />
    </div>
  );
};
