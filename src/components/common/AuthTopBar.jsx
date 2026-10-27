import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { YoungClubLogo } from './YoungClubLogo';
import { FlagIcon } from './FlagIcon';
import { LanguageModal } from './LanguageModal';
import { useLanguage } from '../../context/LanguageContext';

export const AuthTopBar = () => {
  const navigate = useNavigate();
  const { currentLanguage, activeLangObj } = useLanguage();
  const [showLangModal, setShowLangModal] = useState(false);

  return (
    <>
      <div className="w-full h-14 bg-[#181B34] border-b border-white/5 px-3 flex items-center justify-between sticky top-0 z-30 select-none">
        {/* Left: Back Arrow */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 text-white hover:text-slate-300 transition-colors shrink-0 w-8 flex items-center justify-start"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Center: Full Young Club Logo */}
        <div className="flex-1 flex items-center justify-center overflow-visible px-2 min-w-0">
          <YoungClubLogo height={36} />
        </div>

        {/* Right: Language Option Pill Button (Matches Screenshot 1, 2, 3) */}
        <button
          type="button"
          onClick={() => setShowLangModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all text-white font-bold text-xs shrink-0"
        >
          <FlagIcon country={activeLangObj?.flag || 'US'} size={18} />
          <span className="tracking-wide font-display">{currentLanguage}</span>
        </button>
      </div>

      {/* Language Bottom Sheet Modal */}
      <LanguageModal
        isOpen={showLangModal}
        onClose={() => setShowLangModal(false)}
      />
    </>
  );
};
