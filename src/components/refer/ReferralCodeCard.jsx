import React, { useState } from 'react';
import { Copy, Share2, Check, Send, MessageCircle, Gift, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

export const ReferralCodeCard = () => {
  const { currentUser } = useAuth();
  const { success } = useToast();
  const { play } = useSound();
  const [copied, setCopied] = useState(false);

  const code = currentUser?.referralCode || 'YOUNGCLUB';
  const shareUrl = `${window.location.origin}/#/register?ref=${code}`;
  const shareMessage = `🎮 Join Young Club with my referral code ${code} and get 1,000 FREE virtual coins instantly! Play Crash, Mines & Spin Wheel risk-free: ${shareUrl}`;

  const handleCopy = () => {
    if (play) play.click();
    navigator.clipboard.writeText(code);
    setCopied(true);
    success('Referral code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    if (play) play.click();
    navigator.clipboard.writeText(shareUrl);
    success('Referral link copied to clipboard!');
  };

  const handleWhatsApp = () => {
    if (play) play.click();
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };

  const handleTelegram = () => {
    if (play) play.click();
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    if (play) play.click();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Young Club',
          text: shareMessage,
          url: shareUrl,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Illustration Card with Gradient & Gift/Coins Artwork */}
      <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-purple-900/80 via-[#182042] to-[#0D1226] border border-purple-500/30 shadow-xl">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <Gift className="w-24 h-24 text-white" />
        </div>

        <div className="relative z-10 max-w-[75%] space-y-1">
          <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold text-[9px] font-black font-num tracking-wider border border-brand-gold/30 uppercase">
            REFERRAL SQUAD
          </span>
          <h3 className="text-xl font-black font-display text-white tracking-wide uppercase pt-0.5">
            Invite Friends, Earn Coins
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Both you and your friend get <strong className="text-brand-gold font-num font-bold">+200 Virtual Coins</strong> when they sign up!
          </p>
        </div>
      </div>

      {/* Dashed-Border Ticket-Style Referral Code Box */}
      <div className="rounded-2xl p-4 bg-[#11172E] border-2 border-dashed border-purple-500/40 relative shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider font-num">
            Your Referral Code
          </span>
          <span className="text-[10px] font-bold text-emerald-400 font-num">
            INSTANT BONUS
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[#090D1C] rounded-xl p-2 border border-white/10">
          <span className="flex-1 font-display font-black text-brand-gold text-lg tracking-widest pl-2">
            {code}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs transition-all active:scale-95 shadow-glow-primary"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Share Row (WhatsApp in green, Telegram in blue, More share) */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleTelegram}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 font-bold text-xs transition-all active:scale-95"
          >
            <Send className="w-4 h-4 text-sky-400" />
            <span>Telegram</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 font-bold text-xs transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4 text-purple-400" />
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  );
};
