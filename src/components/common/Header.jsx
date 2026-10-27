import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { YoungClubLogo } from './YoungClubLogo';
import { FlagIcon } from './FlagIcon';
import { LanguageModal } from './LanguageModal';
import { AddCoinsModal } from './AddCoinsModal';

/**
 * DownloadTrayIcon
 * Exact replica of the icon in Image 1:
 * Golden inbox tray with bright green down-arrow descending into it
 */
const DownloadTrayIcon = ({ size = 19 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
  >
    {/* Bright Green Down Arrow */}
    <path
      d="M12 2 L12 11.5 M12 11.5 L8.5 8 M12 11.5 L15.5 8"
      stroke="#22C55E"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Golden Box/Tray */}
    <path
      d="M3 11 L5 18 C5.2 18.6 5.8 19 6.5 19 L17.5 19 C18.2 19 18.8 18.6 19 18 L21 11 L16 11 L14.5 13.5 L9.5 13.5 L8 11 Z"
      fill="#E5A024"
      stroke="#D97706"
      strokeWidth="0.8"
    />
    {/* Inner shadow in cutout of tray */}
    <path
      d="M8 11 L9.5 13.5 L14.5 13.5 L16 11 Z"
      fill="#92400E"
      opacity="0.4"
    />
  </svg>
);

export const Header = () => {
  const navigate = useNavigate();
  const { balance } = useWallet();
  const { play } = useSound();
  const { info } = useToast();
  const { currentLanguage, activeLangObj } = useLanguage();

  const [showAddCoins, setShowAddCoins] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);

  const handleDownload = () => {
    if (play) play.click();
    info('Young Club Web App is installed and running!');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0C0F22] select-none shadow-[0_4px_25px_rgba(0,0,0,0.7)] overflow-hidden">
        <div className="relative w-full h-[52px] max-w-[480px] mx-auto flex items-center justify-between px-2">
          
          {/* Left Wing Gradient (Electric Blue to Violet) with Angled Cut & Glossy Top Edge */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[36%] bg-gradient-to-r from-[#2B4DE6] via-[#3B4EEB] to-[#7E42EE] border-t border-white/35"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 84% 100%, 0 100%)'
            }}
          />

          {/* Right Wing Gradient (Violet to Electric Blue) with Angled Cut & Glossy Top Edge */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[36%] bg-gradient-to-r from-[#7E42EE] via-[#3B4EEB] to-[#2B4DE6] border-t border-white/35"
            style={{
              clipPath: 'polygon(16% 0, 100% 0, 100% 100%, 0 100%)'
            }}
          />

          {/* Sparkle on top-left vertex of center cutout */}
          <div className="absolute left-[31.5%] top-0.5 z-20 pointer-events-none">
            <span className="text-white text-[11px] drop-shadow-[0_0_6px_#fff] animate-pulse">✦</span>
          </div>

          {/* Sparkle on top-right vertex of center cutout */}
          <div className="absolute right-[31.5%] top-0.5 z-20 pointer-events-none">
            <span className="text-white text-[11px] drop-shadow-[0_0_6px_#fff] animate-pulse">✦</span>
          </div>

          {/* Left Content: Balance Pill with Gold Plus Button */}
          <div className="relative z-10 w-[33%] flex items-center justify-start">
            <div className="bg-[#171B36] hover:bg-[#1E2347] border border-[#4C3D82] rounded-full h-8 px-2.5 flex items-center justify-between gap-1 w-full max-w-[130px] shadow-inner transition-colors">
              <span className="text-[12px] font-black text-[#FACC15] font-num tracking-tight truncate">
                ₹{(balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (play) play.click();
                  setShowAddCoins(true);
                }}
                title="Add Coins"
                className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FDE047] text-slate-950 flex items-center justify-center font-black active:scale-95 transition-transform shrink-0 shadow-[0_0_8px_rgba(250,204,21,0.6)]"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3] text-slate-950" />
              </button>
            </div>
          </div>

          {/* Center Content: Full Young Club Logo in Recessed Dark Center */}
          <div
            onClick={() => {
              if (play) play.click();
              navigate('/home');
            }}
            className="relative z-10 flex-1 flex items-center justify-center cursor-pointer px-1 min-w-0"
          >
            <YoungClubLogo height={34} />
          </div>

          {/* Right Content: Download Tray + Language Option */}
          <div className="relative z-10 w-[33%] flex items-center justify-end">
            <div className="bg-[#171B36] border border-[#4C3D82] rounded-full h-8 px-2 flex items-center justify-between gap-1.5 w-full max-w-[130px] shadow-inner">
              {/* Golden Inbox Box with Green Down Arrow */}
              <button
                type="button"
                onClick={handleDownload}
                title="Download App"
                className="p-0.5 hover:scale-105 active:scale-95 transition-transform shrink-0"
              >
                <DownloadTrayIcon size={19} />
              </button>

              {/* Language Flag & Code */}
              <button
                type="button"
                onClick={() => setShowLanguage(true)}
                className="flex items-center gap-1 text-white font-bold text-xs hover:text-purple-200 transition-colors pl-1 border-l border-purple-400/20 shrink-0"
              >
                <FlagIcon country={activeLangObj?.flag || 'US'} size={15} />
                <span className="font-display tracking-tight text-[11px] font-black">{currentLanguage}</span>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Modals */}
      <AddCoinsModal isOpen={showAddCoins} onClose={() => setShowAddCoins(false)} />
      <LanguageModal isOpen={showLanguage} onClose={() => setShowLanguage(false)} />
    </>
  );
};
