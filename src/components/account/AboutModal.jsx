import React from 'react';
import { Info, ShieldAlert, Code2, Sparkles, CheckCircle } from 'lucide-react';
import { Modal } from '../common/Modal';

export const AboutModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="About Young Club">
      <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
        {/* Hero Notice */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-pink-500/15 border border-cyan-500/30">
          <div className="flex items-center gap-2 text-sm font-bold text-white mb-1">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Young Club Learning Platform</span>
          </div>
          <p>
            Young Club is an interactive, free-to-play mobile web application built as an advanced frontend learning and portfolio showcase.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Virtual Practice Coins Only:</span> There is zero real currency involved. No payment gateways, no deposits, and no withdrawals. All coins are purely simulation tokens.
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <h5 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Architecture & Technology Stack</span>
          </h5>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>React 19 + Vite</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tailwind CSS</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Framer Motion</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lucide React Icons</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Web Audio Synth</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>LocalStorage State</span>
            </div>
          </div>
        </div>

        <div className="pt-2 text-center text-slate-500 text-[11px] border-t border-white/10">
          Young Club &copy; {new Date().getFullYear()} &bull; Built with precision for educational purposes.
        </div>
      </div>
    </Modal>
  );
};
