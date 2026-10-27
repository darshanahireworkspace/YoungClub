import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../../services/mockData';
import { useSound } from '../../context/SoundContext';

export const FAQAccordion = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const { play } = useSound();

  const toggle = (idx) => {
    play.click();
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <div className="rounded-2xl p-4 glass-card border border-white/10 bg-[#0c102a]/90 space-y-3">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-cyan-400" />
        <h4 className="text-sm font-bold text-white">Frequently Asked Questions</h4>
      </div>

      <div className="space-y-2">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-white/5 bg-white/5 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-3 text-left flex items-center justify-between gap-2 hover:bg-white/5 transition-colors"
              >
                <span className="text-xs font-bold text-white leading-snug">{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                    isOpen ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-3 pb-3 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
