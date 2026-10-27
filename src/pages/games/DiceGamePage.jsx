import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  HelpCircle, 
  Dices, 
  CheckCircle2,
  XCircle 
} from 'lucide-react';
import { 
  calculateDiceWinChance, 
  calculateDiceMultiplier, 
  rollDice, 
  checkDiceWin,
  INITIAL_DICE_HISTORY 
} from '../../games/diceRollLogic';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import { useToast } from '../../context/ToastContext';
import { BetSelector } from '../../components/common/BetSelector';
import { Modal } from '../../components/ui/Modal';
import { AddCoinsModal } from '../../components/common/AddCoinsModal';
import { BalanceChip } from '../../components/ui/BalanceChip';

export const DiceGamePage = () => {
  const navigate = useNavigate();
  const { balance, deductBet, addWin } = useWallet();
  const { play } = useSound();
  const { error, success } = useToast();

  const [betAmount, setBetAmount] = useState(100);
  const [targetNumber, setTargetNumber] = useState(50);
  const [mode, setMode] = useState('under');
  const [rolling, setRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState(null);
  const [history, setHistory] = useState(INITIAL_DICE_HISTORY);
  
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showAddCoins, setShowAddCoins] = useState(false);

  const winChance = calculateDiceWinChance(targetNumber, mode);
  const multiplier = calculateDiceMultiplier(winChance);
  const potentialProfit = Math.round(betAmount * multiplier);

  const handleRoll = () => {
    if (rolling) return;
    if (balance < betAmount) {
      error('Insufficient virtual coins for this bet!');
      setShowAddCoins(true);
      return;
    }

    const res = deductBet(betAmount, 'Dice Roll');
    if (!res.success) return;

    setRolling(true);
    if (play) play.chip();

    let scrambles = 0;
    const interval = setInterval(() => {
      setLastRoll({ roll: (Math.random() * 100).toFixed(2), won: null });
      if (play) play.tick();
      scrambles++;

      if (scrambles > 8) {
        clearInterval(interval);
        const finalNumber = rollDice();
        const won = checkDiceWin(finalNumber, targetNumber, mode);

        setLastRoll({ roll: finalNumber, won });
        setRolling(false);

        setHistory((prev) => [
          { roll: finalNumber, target: targetNumber, mode, won, multiplier },
          ...prev.slice(0, 9)
        ]);

        if (won) {
          addWin(betAmount, potentialProfit, 'Dice Roll', `${multiplier}x Multiplier`);
        } else {
          if (play) play.lose();
        }
      }
    }, 80);
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
            <h2 className="text-base font-black tracking-wide font-display uppercase bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-1.5">
              <Dices className="w-4 h-4 text-purple-400" />
              Dice Roll
            </h2>
            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider font-num">
              Adjustable Odds &bull; 98% RTP
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
        {/* Roll Display Arena */}
        <div className="relative rounded-3xl p-6 bg-gradient-to-b from-[#161D3C] to-[#0A0D1E] border border-purple-500/30 shadow-2xl flex flex-col items-center justify-center text-center">
          <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1 font-num">
            Roll {mode.toUpperCase()} {targetNumber}
          </div>

          {/* Big Rolled Number Display in Orbitron */}
          <div className="my-2">
            <span
              className={`text-6xl sm:text-7xl font-black font-display tracking-tight ${
                lastRoll
                  ? lastRoll.won === true
                    ? 'text-emerald-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.6)]'
                    : lastRoll.won === false
                    ? 'text-brand-red drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]'
                    : 'text-pink-300'
                  : 'text-white'
              }`}
            >
              {lastRoll ? Number(lastRoll.roll).toFixed(2) : '50.00'}
            </span>
          </div>

          {/* Result Tag */}
          {lastRoll && lastRoll.won !== null && (
            <div
              className={`px-3.5 py-1 rounded-full text-xs font-black font-num flex items-center gap-1.5 ${
                lastRoll.won
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-green'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}
            >
              {lastRoll.won ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>WIN! (+{potentialProfit.toLocaleString()} Coins)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5" />
                  <span>MISSED TARGET</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mode Selector (Under / Over) */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={rolling}
            onClick={() => {
              if (play) play.click();
              setMode('under');
            }}
            className={`py-3.5 rounded-2xl font-black font-num text-sm tracking-wide border transition-all ${
              mode === 'under'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-pink-400 text-white shadow-glow-primary'
                : 'bg-[#11172E] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            ROLL UNDER {targetNumber}
          </button>
          <button
            type="button"
            disabled={rolling}
            onClick={() => {
              if (play) play.click();
              setMode('over');
            }}
            className={`py-3.5 rounded-2xl font-black font-num text-sm tracking-wide border transition-all ${
              mode === 'over'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-pink-400 text-white shadow-glow-primary'
                : 'bg-[#11172E] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            ROLL OVER {targetNumber}
          </button>
        </div>

        {/* Slick Slider with Gradient Track */}
        <div className="rounded-2xl p-4 bg-[#11172E] border border-white/10 space-y-3 shadow-lg">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider">
              Target Threshold
            </span>
            <span className="font-black font-display text-brand-gold text-lg">
              {targetNumber}
            </span>
          </div>

          <input
            type="range"
            min="2"
            max="98"
            disabled={rolling}
            value={targetNumber}
            onChange={(e) => setTargetNumber(parseInt(e.target.value, 10))}
            className="w-full accent-pink-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-num">
            <span>2 (Min)</span>
            <span>50 (Even)</span>
            <span>98 (Max)</span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
            <div className="p-2 rounded-xl bg-white/5">
              <div className="text-[10px] text-slate-400 uppercase font-black font-num">Multiplier</div>
              <div className="text-sm font-black font-num text-brand-gold mt-0.5">
                {multiplier}x
              </div>
            </div>
            <div className="p-2 rounded-xl bg-white/5">
              <div className="text-[10px] text-slate-400 uppercase font-black font-num">Win Chance</div>
              <div className="text-sm font-black font-num text-cyan-300 mt-0.5">
                {winChance}%
              </div>
            </div>
            <div className="p-2 rounded-xl bg-white/5">
              <div className="text-[10px] text-slate-400 uppercase font-black font-num">Win Payout</div>
              <div className="text-sm font-black font-num text-emerald-400 mt-0.5">
                +{potentialProfit}
              </div>
            </div>
          </div>
        </div>

        {/* Roll Dice Primary Action Button */}
        <button
          disabled={rolling}
          onClick={handleRoll}
          className={`w-full py-4 rounded-2xl font-black font-num text-lg tracking-wider transition-all transform active:scale-97 shadow-xl flex items-center justify-center gap-2 ${
            rolling
              ? 'bg-slate-800 text-slate-500 cursor-wait'
              : 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-glow-primary'
          }`}
        >
          <Dices className={`w-5 h-5 ${rolling ? 'animate-spin' : ''}`} />
          <span>{rolling ? 'ROLLING DICE...' : `ROLL DICE (${betAmount} COINS)`}</span>
        </button>

        {/* Bet Selector with Stepper & Quick Chips */}
        <BetSelector
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          disabled={rolling}
          onOpenAddCoins={() => setShowAddCoins(true)}
        />

        {/* History Strip */}
        <div className="rounded-2xl p-4 bg-[#11172E] border border-white/10 space-y-2">
          <div className="text-xs font-black text-slate-300 uppercase tracking-wider font-num">
            Recent Rolls
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {history.map((h, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-xl text-xs font-num font-black shrink-0 border ${
                  h.won
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}
              >
                {Number(h.roll).toFixed(2)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* How to Play Modal */}
      <Modal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} title="Dice Roll Rules">
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-pink-400">1. Adjust Slider &amp; Mode:</strong> Choose Roll Under or Roll Over, then set your target number (2 to 98).
          </p>
          <p>
            <strong className="text-brand-gold">2. Dynamic Multiplier:</strong> Win chance adjusts dynamically with a 98% Return To Player (RTP) formula.
          </p>
          <p>
            <strong className="text-emerald-400">3. Roll:</strong> Tap "Roll Dice" to test your fortune!
          </p>
        </div>
      </Modal>

      <AddCoinsModal isOpen={showAddCoins} onClose={() => setShowAddCoins(false)} />
    </div>
  );
};
