import React, { useState } from 'react';
import { Coins, CheckCircle, ShieldCheck, Loader2, Sparkles, Smartphone, Zap } from 'lucide-react';
import { BottomSheet } from '../ui/BottomSheet';
import { useWallet } from '../../context/WalletContext';

export const AddCoinsModal = ({ isOpen, onClose }) => {
  const { addCoins } = useWallet();
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [method, setMethod] = useState('Instant Free Recharge');
  const [processing, setProcessing] = useState(false);
  const [successState, setSuccessState] = useState(false);

  const packs = [
    { amt: 200, tag: null },
    { amt: 300, tag: null },
    { amt: 500, tag: 'POPULAR' },
    { amt: 1000, tag: 'BEST VALUE' },
  ];

  const handleRecharge = () => {
    const finalAmount = customAmount ? parseInt(customAmount, 10) : selectedAmount;
    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) return;

    setProcessing(true);
    // Simulate short gateway delay
    setTimeout(() => {
      addCoins(finalAmount, method);
      setProcessing(false);
      setSuccessState(true);

      setTimeout(() => {
        setSuccessState(false);
        setCustomAmount('');
        onClose();
      }, 1200);
    }, 1200);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Add Free Virtual Coins"
      subtitle="Instant practice coin recharge"
    >
      {successState ? (
        <div className="py-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30 animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h4 className="text-xl font-black text-white mb-1">Recharge Successful!</h4>
          <p className="text-xs text-slate-300">Free demo coins credited directly to your wallet.</p>
        </div>
      ) : processing ? (
        <div className="py-10 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-12 h-12 text-brand-gold animate-spin mb-4" />
          <h4 className="text-lg font-black text-white mb-1">Processing Simulated Top-Up...</h4>
          <p className="text-xs text-slate-400">Crediting free virtual practice coins</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Prominent Disclaimer Banner */}
          <div className="bg-amber-500/10 border border-brand-gold/30 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-200">
            <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Simulated payment &ndash; no real money:</span>{' '}
              This is a free practice platform. No real currency, bank accounts, or payments are involved.
            </div>
          </div>

          {/* 4 Amount Tiles with POPULAR tag on 500 */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Virtual Coin Pack
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {packs.map((pack) => {
                const isSelected = selectedAmount === pack.amt && !customAmount;
                return (
                  <button
                    key={pack.amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(pack.amt);
                      setCustomAmount('');
                    }}
                    className={`relative flex flex-col p-3 rounded-2xl border transition-all text-left ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-500/20 via-purple-900/30 to-[#121730] border-brand-gold shadow-glow-gold'
                        : 'bg-[#151C38] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {pack.tag && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-brand-gold to-brand-goldEnd text-slate-950 font-black text-[9px] uppercase tracking-wider shadow-sm font-num">
                        {pack.tag}
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center">
                        <Coins className="w-3.5 h-3.5 text-brand-gold" />
                      </div>
                      <span className="font-black font-num text-lg text-white">
                        +{pack.amt.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400">
                      100% FREE
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Or Custom Coin Amount
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="Enter amount (e.g. 2500)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                min="10"
                max="50000"
                className="w-full bg-[#0A0D1D] border border-white/10 focus:border-brand-purple rounded-xl px-4 py-2.5 text-sm text-white font-num font-bold placeholder-slate-500 focus:outline-none"
              />
              <Coins className="w-4 h-4 text-brand-gold absolute right-3.5 top-3" />
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleRecharge}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-gold via-amber-400 to-brand-goldEnd hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm tracking-wide shadow-glow-gold transition-all transform active:scale-97 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>
              Claim +{customAmount ? Number(customAmount).toLocaleString() : selectedAmount.toLocaleString()} Free Coins
            </span>
          </button>
        </div>
      )}
    </BottomSheet>
  );
};
