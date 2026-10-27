import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  HelpCircle, 
  Coins, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw,
  Palette 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  generateColorRoundOutcome, 
  calculateColorRoundWinnings, 
  INITIAL_COLOR_HISTORY 
} from '../../games/colorPredictionLogic';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import { useToast } from '../../context/ToastContext';
import { BetSelector } from '../../components/common/BetSelector';
import { Modal } from '../../components/ui/Modal';
import { AddCoinsModal } from '../../components/common/AddCoinsModal';
import { BalanceChip } from '../../components/ui/BalanceChip';

export const ColorGamePage = () => {
  const navigate = useNavigate();
  const { balance, deductBet, addWin } = useWallet();
  const { play } = useSound();
  const { error, success } = useToast();

  const [period, setPeriod] = useState(20261027111);
  const [timeLeft, setTimeLeft] = useState(25);
  const [history, setHistory] = useState(INITIAL_COLOR_HISTORY);
  const [betAmount, setBetAmount] = useState(100);
  const [placedBets, setPlacedBets] = useState([]);
  
  const [revealing, setRevealing] = useState(false);
  const [currentOutcome, setCurrentOutcome] = useState(null);
  const [roundResult, setRoundResult] = useState(null);
  
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showAddCoins, setShowAddCoins] = useState(false);

  // 30s countdown loop
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          triggerRoundResolution();
          return 30;
        }
        if (prev <= 5) {
          if (play) play.tick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [placedBets, period]);

  const triggerRoundResolution = () => {
    setRevealing(true);
    const outcome = generateColorRoundOutcome();
    setCurrentOutcome(outcome);

    const result = calculateColorRoundWinnings(placedBets, outcome);
    setRoundResult(result);

    setTimeout(() => {
      setRevealing(false);
      
      if (result.totalWon > 0) {
        addWin(0, result.totalWon, 'Color Prediction', `Number ${outcome.number}`);
      } else if (placedBets.length > 0) {
        if (play) play.lose();
      }

      setHistory((prev) => [
        {
          period: period.toString(),
          number: outcome.number,
          colors: outcome.colors,
        },
        ...prev.slice(0, 9),
      ]);

      setPeriod((p) => p + 1);
      setPlacedBets([]);
    }, 2500);
  };

  const handlePlaceBet = (type, choice) => {
    if (timeLeft <= 5) {
      error('Betting is locked during final 5 seconds!');
      return;
    }
    if (balance < betAmount) {
      error('Insufficient virtual coins for this bet!');
      setShowAddCoins(true);
      return;
    }

    const res = deductBet(betAmount, `Color Prediction (${choice})`);
    if (!res.success) return;

    setPlacedBets((prev) => [
      ...prev,
      { type, choice, amount: betAmount }
    ]);
    success(`Bet placed on ${choice.toString().toUpperCase()} (${betAmount} Coins)`);
  };

  const getColorBg = (colors) => {
    if (!colors || colors.length === 0) return 'bg-slate-700';
    if (colors.length > 1) {
      return 'bg-gradient-to-r from-purple-600 to-rose-600';
    }
    if (colors[0] === 'green') return 'bg-emerald-600';
    if (colors[0] === 'red') return 'bg-rose-600';
    return 'bg-purple-600';
  };

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
            <h2 className="text-base font-black tracking-wide font-display uppercase bg-gradient-to-r from-emerald-400 via-purple-300 to-pink-400 bg-clip-text text-transparent flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-emerald-400" />
              Colour Prediction
            </h2>
            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider font-num">
              30s Live Rounds
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

      <div className="p-4 space-y-4">
        {/* Period & Circular/Large Countdown Stage */}
        <div className="rounded-3xl p-5 bg-gradient-to-r from-[#171E3C] via-[#121730] to-[#0A0D1E] border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-num">
              Active Period
            </div>
            <div className="text-xl font-black font-num text-cyan-300 mt-0.5">
              #{period}
            </div>
            <div className="text-xs text-brand-gold font-num font-bold mt-1">
              {placedBets.length} bet(s) placed
            </div>
          </div>

          {/* Large Countdown Clock */}
          <div className="text-right">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-end gap-1 font-num">
              <Clock className="w-3.5 h-3.5 text-pink-400" />
              <span>Time Left</span>
            </div>
            <div
              className={`text-4xl font-black font-display mt-0.5 ${
                timeLeft <= 5 ? 'text-brand-red animate-pulse drop-shadow-glow-red' : 'text-brand-gold'
              }`}
            >
              00:{timeLeft.toString().padStart(2, '0')}
            </div>
            {timeLeft <= 5 && (
              <span className="text-[10px] font-black text-rose-400 uppercase font-num">
                Locking Bets...
              </span>
            )}
          </div>
        </div>

        {/* Revealing Banner / Result Animation */}
        <AnimatePresence>
          {revealing && currentOutcome && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="p-4 rounded-3xl bg-gradient-to-r from-purple-900/90 to-pink-900/90 border border-pink-500/50 shadow-glow-primary text-center"
            >
              <div className="text-xs uppercase font-black text-brand-gold tracking-widest mb-2 font-num">
                Round Result Revealed!
              </div>
              <div className="flex items-center justify-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl ${getColorBg(
                    currentOutcome.colors
                  )} flex items-center justify-center font-black font-display text-2xl text-white shadow-xl`}
                >
                  {currentOutcome.number}
                </div>
                <div className="text-left">
                  <div className="text-sm font-black text-white capitalize">
                    {currentOutcome.colors.join(' + ')}
                  </div>
                  <div className="text-xs text-brand-gold font-num font-bold">
                    Number: {currentOutcome.number}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3 Large Glossy Color Buttons */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Select Color (2.0x &ndash; 4.5x Payout)
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {/* Green */}
            <button
              disabled={timeLeft <= 5 || revealing}
              onClick={() => handlePlaceBet('color', 'green')}
              className="p-4 rounded-2xl bg-gradient-to-b from-emerald-500 via-emerald-600 to-green-700 hover:from-emerald-400 text-white font-black shadow-glow-green active:scale-95 transition-all disabled:opacity-40 flex flex-col items-center justify-center border border-emerald-400/30"
            >
              <span className="text-base tracking-wide font-display">GREEN</span>
              <span className="text-xs font-num font-black text-emerald-100 mt-0.5">2.0x</span>
            </button>

            {/* Violet */}
            <button
              disabled={timeLeft <= 5 || revealing}
              onClick={() => handlePlaceBet('color', 'violet')}
              className="p-4 rounded-2xl bg-gradient-to-b from-purple-500 via-purple-600 to-indigo-700 hover:from-purple-400 text-white font-black shadow-glow-purple active:scale-95 transition-all disabled:opacity-40 flex flex-col items-center justify-center border border-purple-400/30"
            >
              <span className="text-base tracking-wide font-display">VIOLET</span>
              <span className="text-xs font-num font-black text-purple-100 mt-0.5">4.5x</span>
            </button>

            {/* Red */}
            <button
              disabled={timeLeft <= 5 || revealing}
              onClick={() => handlePlaceBet('color', 'red')}
              className="p-4 rounded-2xl bg-gradient-to-b from-rose-500 via-rose-600 to-red-700 hover:from-rose-400 text-white font-black shadow-glow-red active:scale-95 transition-all disabled:opacity-40 flex flex-col items-center justify-center border border-rose-400/30"
            >
              <span className="text-base tracking-wide font-display">RED</span>
              <span className="text-xs font-num font-black text-rose-100 mt-0.5">2.0x</span>
            </button>
          </div>
        </div>

        {/* Numbers 0 - 9 Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Or Bet on Exact Number
            </label>
            <span className="text-xs font-black text-brand-gold font-num">
              9.0x Payout
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
              let colorBorder = 'border-white/10';
              if (num === 0) colorBorder = 'border-purple-400/60 bg-purple-500/15 text-purple-300';
              else if (num === 5) colorBorder = 'border-purple-400/60 bg-emerald-500/15 text-emerald-300';
              else if ([1, 3, 7, 9].includes(num)) colorBorder = 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300';
              else colorBorder = 'border-rose-400/40 bg-rose-500/15 text-rose-300';

              return (
                <button
                  key={num}
                  disabled={timeLeft <= 5 || revealing}
                  onClick={() => handlePlaceBet('number', num)}
                  className={`py-3 rounded-2xl border font-black font-num text-lg transition-all active:scale-95 disabled:opacity-40 hover:scale-105 shadow-sm ${colorBorder}`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* Placed Bets This Round */}
        {placedBets.length > 0 && (
          <div className="rounded-2xl p-3.5 bg-[#11172E] border border-white/10 space-y-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-num block">
              Your Placed Bets ({placedBets.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {placedBets.map((b, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-500/40 text-pink-300 text-xs font-bold font-num"
                >
                  {b.choice.toString().toUpperCase()}: {b.amount} Coins
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bet Selector with Stepper & Quick Chips */}
        <BetSelector
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          disabled={timeLeft <= 5 || revealing}
          onOpenAddCoins={() => setShowAddCoins(true)}
        />

        {/* Recent Results Table with Colored Dots */}
        <div className="rounded-2xl p-4 bg-[#11172E] border border-white/10 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider font-num">
              Recent Game History
            </h4>
            <span className="text-[10px] text-slate-400 font-num">Last 10 Rounds</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {history.map((h, i) => (
              <div
                key={i}
                className="p-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center"
              >
                <div
                  className={`w-8 h-8 rounded-full ${getColorBg(
                    h.colors
                  )} flex items-center justify-center font-black font-num text-sm text-white shadow-sm mb-1`}
                >
                  {h.number}
                </div>
                <span className="text-[9px] font-num text-slate-400 truncate w-full">
                  ..{h.period.slice(-3)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Play Modal */}
      <Modal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} title="Colour Prediction Rules">
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-emerald-400">Green (2.0x):</strong> Wins on numbers 1, 3, 7, 9. If 5 appears, split win with Violet (1.5x).
          </p>
          <p>
            <strong className="text-rose-400">Red (2.0x):</strong> Wins on numbers 2, 4, 6, 8. If 0 appears, split win with Violet (1.5x).
          </p>
          <p>
            <strong className="text-purple-400">Violet (4.5x):</strong> Triggered on 0 or 5 for an explosive 4.5x multiplier.
          </p>
          <p>
            <strong className="text-brand-gold">Exact Number 0-9 (9.0x):</strong> Predict the exact number outcome to win 9 times your virtual bet!
          </p>
        </div>
      </Modal>

      <AddCoinsModal isOpen={showAddCoins} onClose={() => setShowAddCoins(false)} />
    </div>
  );
};
