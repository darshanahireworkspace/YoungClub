import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Plane, 
  Palette, 
  RotateCw, 
  Dices, 
  Bomb, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Gift, 
  Users, 
  ChevronDown, 
  ChevronRight, 
  Coins, 
  Flame, 
  Play,
  ArrowRight,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LIVE_WINNERS_TICKER } from '../services/mockData';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { play } = useSound();

  const [tickerIndex, setTickerIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  // Ticker cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_WINNERS_TICKER.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Show floating bottom CTA on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingCta(true);
      } else {
        setShowFloatingCta(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoAccess = () => {
    if (play) play.cashout();
    login('7620349985', 'nikhil shinde 2006');
    navigate('/home');
  };

  const games = [
    {
      id: 'crash',
      name: 'Aviator Crash',
      desc: 'Ride the rocket curve & cash out before it explodes!',
      mult: '100x',
      badge: 'HOT 🔥',
      icon: Plane,
      gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
      accentColor: '#06B6D4',
      link: '/games/crash'
    },
    {
      id: 'color',
      name: 'Colour Prediction',
      desc: 'Predict Red, Green, Violet or exact numbers in 30s rounds.',
      mult: '9.0x',
      badge: 'LIVE',
      icon: Palette,
      gradient: 'from-emerald-500 via-teal-600 to-green-600',
      accentColor: '#10B981',
      link: '/games/color'
    },
    {
      id: 'spin',
      name: 'Spin Wheel',
      desc: 'Physics wheel with 8 multiplier slices and crown jackpot.',
      mult: '10x',
      badge: 'JACKPOT',
      icon: RotateCw,
      gradient: 'from-amber-500 via-orange-600 to-pink-600',
      accentColor: '#F59E0B',
      link: '/games/spin'
    },
    {
      id: 'dice',
      name: 'Dice Roll',
      desc: 'Roll Over/Under customizable slider with 98% RTP.',
      mult: '49x',
      badge: '98% RTP',
      icon: Dices,
      gradient: 'from-purple-600 via-violet-600 to-pink-600',
      accentColor: '#8B5CF6',
      link: '/games/dice'
    },
    {
      id: 'mines',
      name: 'Mines Tactical',
      desc: 'Uncover gems across 5x5 grid, avoid bombs & cash out.',
      mult: 'Multi-gem',
      badge: 'POPULAR',
      icon: Bomb,
      gradient: 'from-pink-500 via-rose-600 to-purple-600',
      accentColor: '#EC4899',
      link: '/games/mines'
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Quick Register',
      desc: 'Create an account in 10 seconds with zero KYC.',
      icon: UserPlus,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      num: '02',
      title: 'Get 1,000 Coins',
      desc: 'Immediate free welcome virtual coins credited to wallet.',
      icon: Gift,
      color: 'text-brand-gold bg-amber-500/10 border-amber-500/20'
    },
    {
      num: '03',
      title: 'Play & Enjoy',
      desc: 'Test Crash, Colour, Wheel, Dice & Mines risk-free.',
      icon: Play,
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/20'
    },
  ];

  const whyTiles = [
    {
      title: 'Instant Start',
      desc: 'No KYC, no phone OTP waiting. Pre-seeded demo account available.',
      icon: Zap,
      gradient: 'from-purple-500/20 to-indigo-500/10'
    },
    {
      title: 'Fair Random Logic',
      desc: 'Transparent client-side algorithms with provably-fair principles.',
      icon: ShieldCheck,
      gradient: 'from-pink-500/20 to-purple-500/10'
    },
    {
      title: 'Daily Bonuses',
      desc: '+100 coins every 24h plus progressive 7-day streak rewards.',
      icon: Gift,
      gradient: 'from-amber-500/20 to-orange-500/10'
    },
    {
      title: 'Refer & Earn Coins',
      desc: '+200 bonus coins for every friend who joins your squad.',
      icon: Users,
      gradient: 'from-emerald-500/20 to-teal-500/10'
    },
  ];

  const faqs = [
    {
      q: 'Is real money involved in Young Club?',
      a: 'Absolutely not. Young Club is 100% free-to-play built as a learning and UI portfolio project. Everything uses virtual coins with zero real-world monetary value. No deposit gateway and no cash withdrawals.'
    },
    {
      q: 'How do I get more virtual coins if I run out?',
      a: 'You can tap "Add Coins" in your Wallet anytime for unlimited instant demo recharges. You can also claim the Daily Bonus (+100 every 24h) and 7-day streak check-ins.'
    },
    {
      q: 'Can I test without creating a new account?',
      a: 'Yes! Tap "Use Demo Login" anywhere to instantly access the pre-seeded account for Nikhil Shinde with 5,000 virtual coins.'
    },
    {
      q: 'Are the game algorithms fair?',
      a: 'Yes, all 5 games execute transparent math in dedicated files (crashLogic.js, colorPredictionLogic.js, etc.) with standard 97-98% Return To Player (RTP) models.'
    }
  ];

  const currentWinner = LIVE_WINNERS_TICKER[tickerIndex];

  return (
    <div className="min-h-screen bg-[#0B0F1E] text-white flex flex-col justify-between relative overflow-hidden">
      {/* 1. Sticky Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0B0F1E]/90 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <Logo variant="small" />
        <Link to="/login">
          <Button variant="outline" size="sm" className="font-bold text-xs">
            Login
          </Button>
        </Link>
      </header>

      <main className="p-4 space-y-8">
        {/* 2. Hero Section */}
        <section className="text-center pt-3 space-y-4 relative">
          {/* Subtle Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 text-pink-300 text-xs font-bold shadow-glow-primary"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>100% Free Virtual Gaming Arena</span>
          </motion.div>

          {/* Big Headline */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight leading-tight uppercase font-display bg-gradient-to-r from-white via-purple-100 to-pink-300 bg-clip-text text-transparent"
          >
            Play. Win. <br />
            <span className="bg-gradient-to-r from-brand-gold to-brand-goldEnd bg-clip-text text-transparent">
              Repeat.
            </span>
          </motion.h1>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
            India-style mini games arena: <strong className="text-white">Crash, Colour Prediction, Spin, Dice &amp; Mines</strong>. Play with free virtual coins.
          </p>

          {/* Two Large CTAs */}
          <div className="space-y-2.5 pt-2 max-w-sm mx-auto">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                if (play) play.click();
                navigate('/register');
              }}
              iconRight={ArrowRight}
            >
              Register &amp; Get 1,000 Free Coins
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  if (play) play.click();
                  navigate('/login');
                }}
              >
                Sign In
              </Button>

              <Button
                variant="gold"
                size="md"
                onClick={handleDemoAccess}
                icon={Zap}
              >
                Demo Login
              </Button>
            </div>
          </div>

          {/* Small Demo Hint */}
          <div className="text-center pt-1">
            <button
              onClick={handleDemoAccess}
              className="text-[11px] text-brand-gold/90 hover:text-brand-gold underline font-num tracking-wide"
            >
              Instant Demo Access: Nikhil Shinde &bull; 5,000 Coins
            </button>
          </div>
        </section>

        {/* 3. Hero Visual: Floating Parallax Elements & Live Winners Ticker */}
        <section className="relative rounded-3xl p-4 bg-gradient-to-b from-[#131936] to-[#0D1226] border border-white/10 shadow-2xl overflow-hidden">
          {/* Parallax floating gaming chips */}
          <div className="relative h-44 sm:h-48 flex items-center justify-center overflow-hidden">
            {/* Plane Rocket Card */}
            <motion.div
              animate={{ y: [-6, 6, -6], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute left-2 sm:left-6 top-3 p-3 rounded-2xl bg-[#1A2248] border border-cyan-500/40 shadow-glow-primary flex items-center gap-2 z-10"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Plane className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-left font-num leading-tight">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Crash</div>
                <div className="text-sm font-black text-cyan-300">14.80x</div>
              </div>
            </motion.div>

            {/* Central Big Young Club Emblem */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-500 p-1 shadow-glow-primary flex items-center justify-center z-0"
            >
              <div className="w-full h-full bg-[#0B0F1E] rounded-[22px] flex items-center justify-center">
                <Logo variant="icon-only" />
              </div>
            </motion.div>

            {/* Spin Wheel Chip */}
            <motion.div
              animate={{ y: [6, -6, 6], rotate: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute right-2 sm:right-6 top-5 p-3 rounded-2xl bg-[#1A2248] border border-amber-500/40 shadow-glow-gold flex items-center gap-2 z-10"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <RotateCw className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left font-num leading-tight">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Wheel</div>
                <div className="text-sm font-black text-amber-300">10x Win</div>
              </div>
            </motion.div>

            {/* Mines Chip Bottom Left */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute left-6 bottom-2 p-2.5 rounded-2xl bg-[#1A2248] border border-pink-500/40 shadow-sm flex items-center gap-2"
            >
              <Bomb className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-black font-num text-pink-300">Gems Found</span>
            </motion.div>

            {/* Dice Chip Bottom Right */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
              className="absolute right-6 bottom-2 p-2.5 rounded-2xl bg-[#1A2248] border border-purple-500/40 shadow-sm flex items-center gap-2"
            >
              <Dices className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-black font-num text-purple-300">98% RTP</span>
            </motion.div>
          </div>

          {/* Live Recent Winners Ticker Strip */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs">
            <div className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-black text-[10px] uppercase font-num shrink-0 flex items-center gap-1 border border-emerald-500/30">
              <TrendingUp className="w-3 h-3" />
              <span>LIVE WIN</span>
            </div>

            <div className="flex-1 overflow-hidden h-5 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWinner.user + tickerIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-1.5 text-slate-300 truncate text-[11px]"
                >
                  <span className="font-bold text-white">{currentWinner.user}</span>
                  <span className="text-slate-400">won</span>
                  <span className="font-black text-brand-gold font-num">
                    +{currentWinner.amount.toLocaleString()}
                  </span>
                  <span className="text-slate-400">in</span>
                  <span className="text-pink-300 font-semibold">{currentWinner.game}</span>
                  <span className="text-[10px] font-num text-cyan-300 font-bold bg-white/5 px-1 rounded">
                    {currentWinner.multiplier}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 4. Our Games Section */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-magenta font-num">
                ENTERTAINMENT ARENA
              </span>
              <h2 className="text-xl font-black text-white uppercase font-display tracking-wide">
                Our Games
              </h2>
            </div>
            <span className="text-xs font-bold font-num text-slate-400">
              5 Games Live
            </span>
          </div>

          <div className="space-y-3">
            {games.map((g) => {
              const Icon = g.icon;
              return (
                <div
                  key={g.id}
                  onClick={() => {
                    if (play) play.click();
                    navigate('/login');
                  }}
                  className="group cursor-pointer rounded-2xl p-4 bg-gradient-to-r from-[#171F3F] to-[#0E1328] border border-white/10 hover:border-purple-500/50 hover:shadow-glow-primary transition-all duration-200 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${g.gradient} p-0.5 shadow-md shrink-0 group-hover:scale-105 transition-transform`}>
                      <div className="w-full h-full bg-[#0B0F1E] rounded-[14px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">
                          {g.name}
                        </h3>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase font-num bg-white/10 text-brand-gold border border-white/10">
                          {g.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {g.desc}
                      </p>
                      <div className="text-[10px] text-brand-gold font-num font-black mt-1">
                        Multiplier up to {g.mult}
                      </div>
                    </div>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-white/5 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 text-slate-300 group-hover:text-white text-xs font-bold flex items-center gap-1 transition-all shrink-0">
                    <span>Play</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. How It Works (3 Simple Steps) */}
        <section className="space-y-3 pt-2">
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold font-num">
              GETTING STARTED
            </span>
            <h2 className="text-xl font-black text-white uppercase font-display tracking-wide">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="p-3.5 rounded-2xl bg-[#11172E] border border-white/10 flex items-center gap-3.5 shadow-sm"
                >
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${s.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-num font-black text-xs text-brand-gold">
                        {s.num}.
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {s.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. Why Young Club (4 Feature Tiles) */}
        <section className="space-y-3 pt-2">
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-magenta font-num">
              ADVANTAGES
            </span>
            <h2 className="text-xl font-black text-white uppercase font-display tracking-wide">
              Why Young Club
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {whyTiles.map((tile, i) => {
              const Icon = tile.icon;
              return (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl bg-gradient-to-br ${tile.gradient} border border-white/10 flex flex-col justify-between`}
                >
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center mb-2 text-white">
                    <Icon className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{tile.title}</h4>
                    <p className="text-[10px] text-slate-300 mt-1 leading-snug">
                      {tile.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. Stats Strip with Animated/Demo Counters */}
        <section className="rounded-3xl p-4 bg-gradient-to-r from-purple-950/60 via-[#161D3A] to-pink-950/60 border border-purple-500/30 shadow-xl">
          <div className="grid grid-cols-3 gap-2 text-center font-num">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-brand-gold">10K+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Active Players
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-pink-400">5</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Mini Games
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">1M+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Coins Won
              </div>
            </div>
          </div>
          <p className="text-center text-[10px] text-slate-500 mt-2">
            *Simulation metrics for learning demonstration
          </p>
        </section>

        {/* 8. FAQ Accordion */}
        <section className="space-y-3 pt-2">
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-purple font-num">
              GOT QUESTIONS?
            </span>
            <h2 className="text-xl font-black text-white uppercase font-display tracking-wide">
              Frequently Asked
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#10162E] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-2 hover:bg-white/5 transition-colors"
                  >
                    <span className="text-xs font-bold text-white leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-brand-magenta' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Block */}
        <section className="rounded-3xl p-6 bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-purple-500/40 text-center space-y-3 shadow-glow-primary">
          <h3 className="text-2xl font-black font-display uppercase tracking-wide text-white">
            Ready to Play?
          </h3>
          <p className="text-xs text-slate-300 max-w-xs mx-auto">
            Grab 1,000 complimentary virtual coins and experience Crash, Mines, Wheel, Dice &amp; Colour games.
          </p>
          <Button
            variant="gold"
            size="lg"
            fullWidth
            onClick={() => {
              if (play) play.click();
              navigate('/register');
            }}
          >
            Create Free Account Now
          </Button>
        </section>
      </main>

      {/* 9. Floating Bottom CTA Bar (Appears on Scroll) */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-full max-w-[460px] px-3 pointer-events-none"
          >
            <div className="pointer-events-auto p-2.5 rounded-2xl bg-[#0E1428]/95 backdrop-blur-xl border border-white/15 shadow-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 pl-2">
                <Coins className="w-5 h-5 text-brand-gold animate-bounce-subtle" />
                <div className="leading-tight">
                  <div className="text-xs font-black text-white">+1,000 Free Coins</div>
                  <div className="text-[10px] text-slate-400">Zero deposit required</div>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (play) play.click();
                  navigate('/register');
                }}
                className="font-black text-xs"
              >
                Register Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
