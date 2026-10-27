import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  HelpCircle, 
  RotateCw, 
  Crown,
  Sparkles 
} from 'lucide-react';
import { 
  WHEEL_SEGMENTS, 
  pickRandomSegment, 
  calculateWheelStopAngle 
} from '../../games/spinWheelLogic';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import { useToast } from '../../context/ToastContext';
import { BetSelector } from '../../components/common/BetSelector';
import { Modal } from '../../components/ui/Modal';
import { AddCoinsModal } from '../../components/common/AddCoinsModal';
import { BalanceChip } from '../../components/ui/BalanceChip';

export const SpinWheelPage = () => {
  const navigate = useNavigate();
  const { balance, deductBet, addWin } = useWallet();
  const { play } = useSound();
  const { error, success } = useToast();

  const [betAmount, setBetAmount] = useState(100);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lastWin, setLastWin] = useState(null);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showAddCoins, setShowAddCoins] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    if (balance < betAmount) {
      error('Insufficient virtual coins for this bet!');
      setShowAddCoins(true);
      return;
    }

    const res = deductBet(betAmount, 'Spin Wheel');
    if (!res.success) return;

    setIsSpinning(true);
    setLastWin(null);

    const targetSegment = pickRandomSegment();
    const finalAngle = calculateWheelStopAngle(targetSegment.id, rotation, 6);
    setRotation(finalAngle);

    const tickInterval = setInterval(() => {
      if (play) play.spin();
    }, 120);

    setTimeout(() => {
      clearInterval(tickInterval);
      setIsSpinning(false);
      setLastWin(targetSegment);

      const winAmount = Math.round(betAmount * targetSegment.multiplier);
      if (winAmount > 0) {
        addWin(betAmount, winAmount, 'Spin Wheel', `${targetSegment.multiplier}x Multiplier`);
      } else {
        if (play) play.lose();
      }
    }, 4500);
  };

  const segmentAngle = 360 / WHEEL_SEGMENTS.length; // 45 deg

  return (
    <div className="min-h-screen bg-[#0B0F1E] text-white flex flex-col max-w-lg mx-auto pb-16">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-[#0B0F1E]/95 backdrop-blur-md px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (play) play.click();
              navigate('/home');
            }}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black tracking-wide font-display uppercase bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-1.5">
              <RotateCw className="w-4 h-4 text-brand-gold" />
              Spin Wheel
            </h2>
            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider font-num">
              10x Jackpot Crown
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <BalanceChip
            balance={balance}
            onAddClick={() => setShowAddCoins(true)}
          />

          <button
            onClick={() => {
              if (play) play.click();
              setShowHowToPlay(true);
            }}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Wheel Arena */}
        <div className="relative flex flex-col items-center justify-center pt-3 pb-2">
          {/* Top Gold Pointer Indicator */}
          <div className="z-20 -mb-3 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[26px] border-t-brand-gold" />
          </div>

          {/* Glowing Circular Outer Frame */}
          <div className="relative p-2.5 rounded-full bg-gradient-to-tr from-brand-gold via-purple-600 to-pink-500 shadow-glow-primary">
            {/* The Rotating Wheel SVG */}
            <div
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-2xl"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning
                  ? 'transform 4.5s cubic-bezier(0.15, 0.95, 0.25, 1)'
                  : 'none',
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {WHEEL_SEGMENTS.map((seg, i) => {
                  const startAngle = i * segmentAngle;
                  const endAngle = (i + 1) * segmentAngle;
                  
                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;
                  
                  const x1 = 50 + 50 * Math.cos(startRad);
                  const y1 = 50 + 50 * Math.sin(startRad);
                  const x2 = 50 + 50 * Math.cos(endRad);
                  const y2 = 50 + 50 * Math.sin(endRad);

                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
                  const textAngle = startAngle + segmentAngle / 2;

                  return (
                    <g key={seg.id}>
                      <path d={pathData} fill={seg.color} stroke="#0B0F1E" strokeWidth="1" />
                      <g transform={`rotate(${textAngle} 50 50)`}>
                        <text
                          x="50"
                          y="20"
                          fill={seg.text}
                          fontSize="5.5"
                          fontWeight="900"
                          textAnchor="middle"
                          fontFamily="Rajdhani, Orbitron, sans-serif"
                        >
                          {seg.label}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* Glowing Rim Center Hub */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-[#0B0F1E] border-2 border-brand-gold flex items-center justify-center shadow-glow-gold">
                  <Crown className="w-6 h-6 text-brand-gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Outcome Announcement */}
          {lastWin && !isSpinning && (
            <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/80 via-pink-900/70 to-indigo-900/80 border border-brand-gold/40 text-center animate-bounce-subtle w-full max-w-xs shadow-glow-primary">
              <div className="text-xs text-slate-300 font-medium">{lastWin.description}</div>
              <div className="text-2xl font-black font-num text-brand-gold mt-0.5">
                {lastWin.multiplier > 0
                  ? `+${Math.round(betAmount * lastWin.multiplier).toLocaleString()} Coins!`
                  : '0 Coins'}
              </div>
            </div>
          )}
        </div>

        {/* Spin Wheel Big Primary Action Button */}
        <button
          disabled={isSpinning}
          onClick={handleSpin}
          className={`w-full py-4 rounded-2xl font-black font-num text-lg tracking-wider transition-all transform active:scale-97 shadow-xl flex items-center justify-center gap-2 ${
            isSpinning
              ? 'bg-slate-800 text-slate-500 cursor-wait'
              : 'bg-gradient-to-r from-brand-gold via-amber-400 to-brand-goldEnd hover:from-amber-300 hover:to-orange-400 text-slate-950 shadow-glow-gold'
          }`}
        >
          <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'SPINNING WHEEL...' : `SPIN WHEEL (${betAmount} COINS)`}</span>
        </button>

        {/* Bet Selector with Stepper & Quick Chips */}
        <BetSelector
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          disabled={isSpinning}
          onOpenAddCoins={() => setShowAddCoins(true)}
        />
      </div>

      {/* How to Play Modal */}
      <Modal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} title="Spin Wheel Rules">
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-brand-gold">1. Select Bet:</strong> Set your virtual chips amount before launching the wheel.
          </p>
          <p>
            <strong className="text-brand-magenta">2. Multiplier Segments:</strong> Slices range from 0x up to the 10x Mega Jackpot Crown.
          </p>
          <p>
            <strong className="text-emerald-400">3. Physics Deceleration:</strong> The slice landing directly beneath the top gold pointer awards the win instantly.
          </p>
        </div>
      </Modal>

      <AddCoinsModal isOpen={showAddCoins} onClose={() => setShowAddCoins(false)} />
    </div>
  );
};
