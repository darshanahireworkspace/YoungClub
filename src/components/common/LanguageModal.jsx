import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';
import { FlagIcon } from './FlagIcon';

export const LanguageModal = ({ isOpen, onClose }) => {
  const { currentLanguage, changeLanguage } = useLanguage();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-[2px]"
        />

        {/* Bottom Sheet Drawer */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-w-[480px] bg-[#1D213A] border-t border-white/10 rounded-t-2xl overflow-hidden shadow-2xl pb-6"
        >
          {/* Subtle drag handle */}
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-2.5 mb-2" />

          {/* Language Options List */}
          <div className="divide-y divide-white/5">
            {LANGUAGES.map((lang) => {
              const isSelected = currentLanguage === lang.code;

              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    changeLanguage(lang.code);
                    onClose();
                  }}
                  className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${
                    isSelected ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Left: Flag + Code */}
                  <div className="flex items-center gap-3">
                    <FlagIcon country={lang.flag} size={24} />
                    <span className="text-sm font-bold text-white tracking-wide">
                      {lang.code}
                    </span>
                    <span className="text-xs text-slate-400 font-normal">
                      ({lang.name})
                    </span>
                  </div>

                  {/* Right: Radio Indicator (Screenshot 3 shows purple checked circle for selected, hollow ring for unselected) */}
                  <div>
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-[#7B61FF] flex items-center justify-center shadow-[0_0_8px_rgba(123,97,255,0.6)]">
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-500/70" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
