import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const DisclaimerBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-pink-500/10 border-b border-amber-500/20 px-3 py-1.5 text-center text-[11px] text-amber-300 font-medium flex items-center justify-center gap-1.5 shadow-sm">
      <ShieldAlert className="w-3.5 h-3.5 text-brand-gold shrink-0" />
      <span>
        Demo project &bull; Virtual coins only &bull; No real money &bull; 18+ for entertainment
      </span>
    </div>
  );
};
