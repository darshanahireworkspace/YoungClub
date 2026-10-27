import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * WelcomePopupSequence
 * Displays the 2 consecutive confirmation dialog boxes after login/register
 * as shown in Screenshot 1 and Screenshot 2:
 * Step 1: "Welcome to the New YoungClub"
 * Step 2: "Enjoy Bigger Rewards"
 */
export const WelcomePopupSequence = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onClose();
      setStep(1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          key={step}
          initial={{ scale: 0.88, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative z-10 w-full max-w-[360px] bg-[#16192E] border border-white/10 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col select-none"
        >
          {/* STEP 1: Welcome to the New YoungClub */}
          {step === 1 ? (
            <>
              {/* Header Gradient Banner */}
              <div className="px-4 py-3 bg-gradient-to-r from-[#FF7657] via-[#D354DF] to-[#5C94FF] flex items-center justify-center gap-1.5 shadow-md">
                <span className="text-base">🦋</span>
                <h3 className="text-sm font-black text-white tracking-wide font-display">
                  Welcome to the New YoungClub
                </h3>
                <span className="text-base">📢</span>
              </div>

              {/* Subtitle Information */}
              <div className="px-4 pt-3 pb-2 text-center space-y-0.5">
                <p className="text-[10px] font-black text-slate-100 uppercase tracking-wider font-display">
                  ENTER THE WORLD OF YOUNG CLUB
                </p>
                <p className="text-[9px] text-slate-300 font-medium">
                  Premium Gaming Experience With Bigger Rewards
                </p>
                <p className="text-[9px] text-slate-400 font-medium">
                  Exclusive Promotions &bull; VIP Benefits &bull; Endless Fun
                </p>
              </div>

              {/* Graphic Banner Area */}
              <div className="px-3 py-1">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-[#0B0F1E]">
                  <img
                    src="/images/welcome_banner.jpg"
                    alt="Welcome Young Club"
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>

              {/* Bottom Confirm Button */}
              <div className="p-4 pt-3">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full py-3 rounded-full font-bold text-sm tracking-wide bg-gradient-to-r from-[#FF7657] via-[#D052DE] to-[#5C94FF] text-white shadow-lg active:scale-98 hover:brightness-105 transition-all flex items-center justify-center font-display uppercase"
                >
                  Confirm
                </button>
              </div>
            </>
          ) : (
            /* STEP 2: Enjoy Bigger Rewards */
            <>
              {/* Header Gradient Banner */}
              <div className="px-4 py-3 bg-gradient-to-r from-[#FF7657] via-[#D354DF] to-[#5C94FF] flex items-center justify-center gap-1.5 shadow-md">
                <span className="text-base">🎁</span>
                <h3 className="text-sm font-black text-white tracking-wide font-display">
                  Enjoy Bigger Rewards
                </h3>
                <span className="text-base">🎁</span>
              </div>

              {/* Subtitle Information */}
              <div className="px-4 pt-3 pb-2 text-center space-y-0.5">
                <p className="text-[10px] font-black text-slate-100 uppercase tracking-wider font-display">
                  READY TO WIN MORE?
                </p>
                <p className="text-[9px] text-slate-300 font-medium">
                  Experience Bigger Rewards with YOUNG Club ➡️ CLICK JOIN NOW
                </p>
              </div>

              {/* Graphic Banner Area */}
              <div className="px-3 py-1">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-[#0B0F1E]">
                  <img
                    src="/images/rewards_banner.jpg"
                    alt="Why Join Young Club"
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>

              {/* Bottom Confirm Button */}
              <div className="p-4 pt-3">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full py-3 rounded-full font-bold text-sm tracking-wide bg-gradient-to-r from-[#FF7657] via-[#D052DE] to-[#5C94FF] text-white shadow-lg active:scale-98 hover:brightness-105 transition-all flex items-center justify-center font-display uppercase"
                >
                  Confirm
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
