import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plane, Gift, Users, ChevronRight, Sparkles } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const PromoCarousel = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const navigate = useNavigate();
  const { play } = useSound();

  const banners = [
    {
      id: 'banner-welcome',
      tag: 'FREE RECHARGE',
      title: 'Free Virtual Coins Pack',
      subtitle: 'Claim up to 5,000 practice coins instantly in your wallet.',
      cta: 'Get Coins',
      link: '/wallet',
      icon: Gift,
      gradient: 'from-purple-900/90 via-fuchsia-900/80 to-[#121836]',
      accent: 'from-purple-500 to-pink-500',
    },
    {
      id: 'banner-refer',
      tag: 'SQUAD REWARDS',
      title: 'Invite Friends, Earn 200',
      subtitle: 'Share your referral code and unlock milestone reward chests.',
      cta: 'Refer Now',
      link: '/refer',
      icon: Users,
      gradient: 'from-amber-950/90 via-[#1F2648] to-[#121836]',
      accent: 'from-brand-gold to-brand-goldEnd',
    },
    {
      id: 'banner-daily',
      tag: 'DAILY REWARD',
      title: '24-Hour Daily Bonus',
      subtitle: 'Collect +100 coins daily and maintain your 7-day streak.',
      cta: 'Claim Bonus',
      link: '/refer',
      icon: Sparkles,
      gradient: 'from-pink-950/90 via-purple-950/80 to-[#121836]',
      accent: 'from-pink-500 to-rose-600',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % banners.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [banners.length]);

  const banner = banners[currentIdx];
  const Icon = banner.icon;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className={`relative p-5 rounded-3xl bg-gradient-to-r ${banner.gradient} border border-white/10 overflow-hidden shadow-xl`}
        >
          {/* Subtle background glow */}
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Large background decorative icon */}
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
            <Icon className="w-28 h-28 text-white" />
          </div>

          <div className="relative z-10 flex flex-col items-start max-w-[75%] space-y-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[9px] font-black tracking-widest text-brand-gold border border-brand-gold/30 uppercase font-num">
              {banner.tag}
            </span>

            <h3 className="text-base sm:text-lg font-black text-white leading-tight font-display tracking-wide">
              {banner.title}
            </h3>

            <p className="text-xs text-slate-300 leading-snug line-clamp-2 pb-1">
              {banner.subtitle}
            </p>

            <button
              onClick={() => {
                if (play) play.click();
                navigate(banner.link);
              }}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-xs shadow-glow-primary active:scale-95 transition-all"
            >
              <span>{banner.cta}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center gap-1.5 mt-2.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (play) play.click();
              setCurrentIdx(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIdx
                ? 'w-6 bg-gradient-to-r from-purple-500 to-pink-500 shadow-glow-primary'
                : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
