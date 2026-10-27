import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSound } from '../../context/SoundContext';

/**
 * Custom 3D Neon Game Controller Icon (Home Tab)
 * Exact match for Image 2: Cyan left grip, magenta right grip, glowing buttons
 */
const GameController3DIcon = ({ size = 26, active = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]"
  >
    <defs>
      <linearGradient id="ctrlBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E5FF" />
        <stop offset="45%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <linearGradient id="ctrlBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="25%" stopColor="#A5F3FC" />
        <stop offset="70%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#312E81" />
      </linearGradient>
    </defs>
    {/* Controller Body with Neon Border */}
    <path
      d="M9 8 C5 8 3 12 3 17 C3 23 6 25 8 25 C10 25 11 23 12 21 L14 18 L18 18 L20 21 C21 23 22 25 24 25 C26 25 29 23 29 17 C29 12 27 8 23 8 C20 8 18 10 16 10 C14 10 12 8 9 8 Z"
      fill="url(#ctrlBody)"
      stroke="url(#ctrlBorder)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* D-Pad (Cyan) */}
    <path d="M8 12.5 L10 12.5 L10 14.5 L12 14.5 L12 16.5 L10 16.5 L10 18.5 L8 18.5 L8 16.5 L6 16.5 L6 14.5 L8 14.5 Z" fill="#00E5FF" />
    {/* Action Buttons (Magenta / White) */}
    <circle cx="23" cy="13.5" r="1.3" fill="#EC4899" />
    <circle cx="21" cy="15.5" r="1.3" fill="#EC4899" />
    <circle cx="25" cy="15.5" r="1.3" fill="#EC4899" />
    <circle cx="23" cy="17.5" r="1.3" fill="#EC4899" />
    {/* Center Mini Buttons */}
    <circle cx="14" cy="14.5" r="1" fill="#FFFFFF" opacity="0.9" />
    <circle cx="18" cy="14.5" r="1" fill="#FFFFFF" opacity="0.9" />
  </svg>
);

/**
 * Custom 3D Silver Gift Box Icon (Activity Tab)
 * Exact match for Image 2: Silver box with bow ribbon on top
 */
const GiftBox3DIcon = ({ size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
  >
    <defs>
      <linearGradient id="giftSilver" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F1F5F9" />
        <stop offset="40%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <linearGradient id="giftWhite" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>
    </defs>
    {/* Bow Ribbon */}
    <path
      d="M12 6.5 C10 3.5 6 4.5 8 7.5 C10 9.5 14 8.5 16 9.5 C18 8.5 22 9.5 24 7.5 C26 4.5 22 3.5 20 6.5 C18 8.5 14 8.5 12 6.5 Z"
      fill="url(#giftWhite)"
    />
    {/* Lid */}
    <rect x="5" y="9.5" width="22" height="4.5" rx="1.5" fill="url(#giftSilver)" stroke="#E2E8F0" strokeWidth="0.8" />
    <rect x="14" y="9.5" width="4" height="4.5" fill="url(#giftWhite)" />
    {/* Lower Box */}
    <rect x="6.5" y="14" width="19" height="13" rx="1.5" fill="url(#giftSilver)" stroke="#CBD5E1" strokeWidth="0.8" />
    <rect x="14" y="14" width="4" height="13" fill="url(#giftWhite)" />
  </svg>
);

/**
 * Custom 3D Purple Diamond with Golden "V" (Promotion Tab)
 * Exact match for Image 2: Faceted purple crystal diamond with golden "V" inside
 */
const DiamondGemV3DIcon = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 drop-shadow-[0_0_12px_rgba(217,70,239,0.9)]"
  >
    <defs>
      <linearGradient id="diamondFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="20%" stopColor="#F472B6" />
        <stop offset="55%" stopColor="#C026D3" />
        <stop offset="100%" stopColor="#6B21A8" />
      </linearGradient>
      <linearGradient id="goldVGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="35%" stopColor="#FDE047" />
        <stop offset="70%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>
    {/* Faceted Diamond Silhouette */}
    <polygon points="22,4 36,15 22,39 8,15" fill="url(#diamondFaceGrad)" />
    {/* Top facets */}
    <polygon points="15,15 22,4 29,15" fill="#FFFFFF" opacity="0.5" />
    <polygon points="8,15 15,15 22,4" fill="#F472B6" opacity="0.6" />
    <polygon points="36,15 29,15 22,4" fill="#A21CAF" opacity="0.7" />
    {/* Bottom facets */}
    <polygon points="15,15 22,39 29,15" fill="#E879F9" opacity="0.3" />
    <polygon points="8,15 15,15 22,39" fill="#9333EA" opacity="0.5" />
    <polygon points="36,15 29,15 22,39" fill="#581C87" opacity="0.6" />
    <line x1="8" y1="15" x2="36" y2="15" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
    <line x1="15" y1="15" x2="22" y2="39" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.5" />
    <line x1="29" y1="15" x2="22" y2="39" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.5" />

    {/* Golden "V" in center of diamond */}
    <path
      d="M17 17 L22 28 L27 17 L24.5 17 L22 24 L19.5 17 Z"
      fill="url(#goldVGrad)"
      stroke="#78350F"
      strokeWidth="0.6"
      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
    />
  </svg>
);

/**
 * Custom 3D Silver Wallet Icon (Wallet Tab)
 * Exact match for Image 2: Silver wallet with folded flap and clasp
 */
const Wallet3DIcon = ({ size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
  >
    <defs>
      <linearGradient id="walletSilver" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F1F5F9" />
        <stop offset="50%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
    </defs>
    {/* White Paper / Card peeking out from top */}
    <path d="M12 7 L17 12 L22 7 Z" fill="#FFFFFF" />
    <rect x="11" y="8" width="10" height="4" fill="#FFFFFF" rx="0.5" />
    {/* Main Wallet Body */}
    <rect x="5" y="11" width="22" height="15" rx="3" fill="url(#walletSilver)" stroke="#CBD5E1" strokeWidth="0.8" />
    {/* Front Flap */}
    <path d="M18 15 L27 15 L27 22 L18 22 C16.5 22 15.5 20.5 15.5 18.5 C15.5 16.5 16.5 15 18 15 Z" fill="#CBD5E1" />
    {/* Clasp Button */}
    <circle cx="21" cy="18.5" r="1.6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.6" />
  </svg>
);

/**
 * Custom 3D Silver Account Icon (Account Tab)
 * Exact match for Image 2: Circular silver medal badge with user silhouette
 */
const Account3DIcon = ({ size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
  >
    <defs>
      <linearGradient id="accountSilver" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F1F5F9" />
        <stop offset="50%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
    </defs>
    {/* Circular Silver Medal */}
    <circle cx="16" cy="16" r="12" fill="url(#accountSilver)" stroke="#E2E8F0" strokeWidth="1" />
    <circle cx="16" cy="16" r="10" fill="none" stroke="#CBD5E1" strokeWidth="0.6" />
    {/* User Silhouette */}
    <circle cx="16" cy="13" r="3.2" fill="#FFFFFF" />
    <path d="M10 22 C10 18.5 13 17.5 16 17.5 C19 17.5 22 18.5 22 22 Z" fill="#FFFFFF" />
  </svg>
);

export const BottomNav = () => {
  const { play } = useSound();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-[480px] pointer-events-none select-none">
      {/* Wave-contoured metallic purple bar with neon top rim (Image 2) */}
      <div className="pointer-events-auto relative bg-gradient-to-t from-[#1C0D3D] via-[#24114E] to-[#361973] border-t-2 border-[#8E44EC] shadow-[0_-5px_22px_rgba(142,68,236,0.5)] px-2 pt-2 pb-2.5 flex items-center justify-between">
        
        {/* Diamond Sparkle on far-left corner (Image 2) */}
        <div className="absolute left-1.5 top-0.5 pointer-events-none">
          <span className="text-white text-[10px] drop-shadow-[0_0_6px_#fff] animate-pulse">✦</span>
        </div>

        {/* Diamond Sparkle on far-right corner (Image 2) */}
        <div className="absolute right-1.5 top-0.5 pointer-events-none">
          <span className="text-white text-[10px] drop-shadow-[0_0_6px_#fff] animate-pulse">✦</span>
        </div>

        {/* Tab 1: Home (Active with Golden Text in Image 2) */}
        <NavLink
          to="/home"
          onClick={() => play && play.click()}
          className="flex-1 flex flex-col items-center justify-center py-1 transition-colors"
        >
          {({ isActive }) => (
            <>
              <GameController3DIcon size={26} active={isActive} />
              <span className={`text-[10px] font-black tracking-tight mt-1 ${isActive ? 'text-[#FFB800]' : 'text-[#C5BEDE]'}`}>
                Home
              </span>
            </>
          )}
        </NavLink>

        {/* Tab 2: Activity */}
        <NavLink
          to="/refer"
          onClick={() => play && play.click()}
          className="flex-1 flex flex-col items-center justify-center py-1 transition-colors"
        >
          {({ isActive }) => (
            <>
              <GiftBox3DIcon size={26} />
              <span className={`text-[10px] font-black tracking-tight mt-1 ${isActive ? 'text-[#FFB800]' : 'text-[#C5BEDE]'}`}>
                Activity
              </span>
            </>
          )}
        </NavLink>

        {/* Tab 3: Promotion (THE BIG ELEVATED DOCK in Image 2) */}
        <div className="relative flex-1 flex flex-col items-center justify-center">
          <NavLink
            to="/refer"
            onClick={() => play && play.click()}
            className="group flex flex-col items-center -mt-7 focus:outline-none"
          >
            {/* Elevated Circular Dock with 3D Diamond containing Golden 'V' */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#6B21A8] via-[#9333EA] to-[#D946EF] p-[2px] shadow-[0_0_22px_rgba(168,85,247,0.85)] group-hover:scale-105 active:scale-95 transition-transform flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#1F0C42] border border-purple-400/50 flex items-center justify-center relative overflow-hidden">
                {/* Soft Radial Glow */}
                <div className="absolute inset-0 bg-radial from-purple-500/40 via-transparent to-transparent pointer-events-none" />
                {/* 3D Diamond with Golden V */}
                <DiamondGemV3DIcon size={36} />
              </div>
            </div>

            {/* Pill Base underneath with text 'Promotion' */}
            <span className="text-[10px] font-black text-white tracking-wide mt-1 bg-[#241147] px-2.5 py-0.5 rounded-full border border-purple-500/40 shadow-xs">
              Promotion
            </span>
          </NavLink>
        </div>

        {/* Tab 4: Wallet */}
        <NavLink
          to="/wallet"
          onClick={() => play && play.click()}
          className="flex-1 flex flex-col items-center justify-center py-1 transition-colors"
        >
          {({ isActive }) => (
            <>
              <Wallet3DIcon size={26} />
              <span className={`text-[10px] font-black tracking-tight mt-1 ${isActive ? 'text-[#FFB800]' : 'text-[#C5BEDE]'}`}>
                Wallet
              </span>
            </>
          )}
        </NavLink>

        {/* Tab 5: Account */}
        <NavLink
          to="/account"
          onClick={() => play && play.click()}
          className="flex-1 flex flex-col items-center justify-center py-1 transition-colors"
        >
          {({ isActive }) => (
            <>
              <Account3DIcon size={26} />
              <span className={`text-[10px] font-black tracking-tight mt-1 ${isActive ? 'text-[#FFB800]' : 'text-[#C5BEDE]'}`}>
                Account
              </span>
            </>
          )}
        </NavLink>

      </div>
    </nav>
  );
};
