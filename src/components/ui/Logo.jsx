import React from 'react';

export const Logo = ({ variant = 'full', className = '', glow = true }) => {
  // Stylized "Y" inside a rounded gaming shield/hexagon
  // Combines controller handles, lightning crown angles, and gold crown accent
  const ShieldIcon = ({ size = 36 }) => (
    <div
      className={`relative rounded-xl overflow-hidden flex items-center justify-center shrink-0 ${
        glow ? 'shadow-glow-primary' : ''
      }`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="goldAcc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC83D" />
            <stop offset="100%" stopColor="#FF8A00" />
          </linearGradient>
          <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Shield background with beveled border */}
        <path
          d="M50 8 L85 24 L85 62 L50 92 L15 62 L15 24 Z"
          fill="url(#shieldGrad)"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2.5"
        />

        {/* Dark core inset */}
        <path
          d="M50 14 L80 28 L80 59 L50 85 L20 59 L20 28 Z"
          fill="#0B0F1E"
          opacity="0.85"
        />

        {/* Gold Crown Accent on Top Peak */}
        <path
          d="M44 23 L50 17 L56 23 L53 25 L47 25 Z"
          fill="url(#goldAcc)"
        />

        {/* Stylized Y Formed by Game Controller + Lightning Angles */}
        <path
          d="M32 32 L46 52 L46 75 L54 75 L54 52 L68 32 L58 32 L50 45 L42 32 Z"
          fill="#FFFFFF"
        />

        {/* Central Lightning Diamond Accent in Y */}
        <polygon
          points="50,47 53,52 50,57 47,52"
          fill="url(#goldAcc)"
        />

        {/* One-time subtle shine overlay */}
        <rect
          x="-100%"
          y="0"
          width="100%"
          height="100"
          fill="url(#shineGrad)"
          className="animate-[shine_2.5s_ease-out_1]"
          transform="skewX(-25)"
        />
      </svg>
    </div>
  );

  if (variant === 'icon-only') {
    return <ShieldIcon size={38} />;
  }

  if (variant === 'small') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <ShieldIcon size={32} />
        <div className="flex flex-col leading-none">
          <span className="font-display font-black text-sm tracking-wider bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent">
            YOUNG CLUB
          </span>
          <span className="text-[8px] font-bold text-brand-gold tracking-widest uppercase mt-0.5 font-num">
            FREE ARENA
          </span>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <ShieldIcon size={42} />
      <div className="flex flex-col leading-none">
        <span className="font-display font-black text-lg sm:text-xl tracking-wider bg-gradient-to-r from-white via-purple-200 to-pink-400 bg-clip-text text-transparent">
          YOUNG CLUB
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[9px] font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-goldEnd tracking-widest uppercase font-num">
            FREE GAMING ARENA
          </span>
        </div>
      </div>
    </div>
  );
};
