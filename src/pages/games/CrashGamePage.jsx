import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  HelpCircle, 
  Coins, 
  Plane, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  generateCrashPoint, 
  calculateMultiplierAtTime, 
  getMultiplierBadgeClass, 
  INITIAL_CRASH_HISTORY 
} from '../../games/crashLogic';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import { useToast } from '../../context/ToastContext';
import { BetSelector } from '../../components/common/BetSelector';
import { Modal } from '../../components/ui/Modal';
import { AddCoinsModal } from '../../components/common/AddCoinsModal';
import { BalanceChip } from '../../components/ui/BalanceChip';

export const CrashGamePage = () => {
  const navigate = useNavigate();
  const { balance, deductBet, addWin } = useWallet();
  const { play } = useSound();
  const { error, success } = useToast();

  const [history, setHistory] = useState(INITIAL_CRASH_HISTORY);
  const [gameState, setGameState] = useState('IDLE'); // 'IDLE' | 'COUNTDOWN' | 'FLYING' | 'CRASHED'
  const [betAmount, setBetAmount] = useState(100);
  const [autoCashout, setAutoCashout] = useState('');
  const [currentMultiplier, setCurrentMultiplier] = useState(1.00);
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const [cashedOutAt, setCashedOutAt] = useState(null);
  const [finalCrashPoint, setFinalCrashPoint] = useState(null);
  const [countdown, setCountdown] = useState(3);
  
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showAddCoins, setShowAddCoins] = useState(false);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const flightStartTimeRef = useRef(null);
  const crashPointRef = useRef(null);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle countdown before flight
  useEffect(() => {
    let timer;
    if (gameState === 'COUNTDOWN') {
      if (countdown > 0) {
        if (play) play.tick();
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        startFlight();
      }
    }
    return () => clearTimeout(timer);
  }, [gameState, countdown]);

  const handlePlaceBet = () => {
    if (gameState !== 'IDLE') return;
    if (balance < betAmount) {
      error('Insufficient virtual coins for this bet!');
      setShowAddCoins(true);
      return;
    }

    const res = deductBet(betAmount, 'Aviator Crash');
    if (!res.success) return;

    setHasCashedOut(false);
    setCashedOutAt(null);
    setCurrentMultiplier(1.00);
    setFinalCrashPoint(null);
    setCountdown(3);
    setGameState('COUNTDOWN');
  };

  const startFlight = () => {
    const crash = generateCrashPoint();
    crashPointRef.current = crash;
    setFinalCrashPoint(crash);
    setGameState('FLYING');
    flightStartTimeRef.current = performance.now();

    const renderLoop = (now) => {
      const elapsedSeconds = (now - flightStartTimeRef.current) / 1000;
      const mult = calculateMultiplierAtTime(elapsedSeconds);

      // Check auto cashout
      const autoVal = parseFloat(autoCashout);
      if (!hasCashedOut && autoVal && autoVal > 1.00 && mult >= autoVal && mult < crash) {
        triggerCashout(autoVal);
      }

      if (mult >= crash) {
        // Plane Crashes
        setCurrentMultiplier(crash);
        setGameState('CRASHED');
        if (play) play.explosion();
        
        // Add to round history
        setHistory((prev) => [{ id: 'c_' + Date.now(), multiplier: crash }, ...prev.slice(0, 11)]);
        return;
      }

      setCurrentMultiplier(mult);
      drawCanvas(mult, elapsedSeconds);
      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);
  };

  const triggerCashout = (multiplierToUse) => {
    if (gameState !== 'FLYING' || hasCashedOut) return;

    const mult = multiplierToUse || currentMultiplier;
    const winAmount = Math.round(betAmount * mult);

    setHasCashedOut(true);
    setCashedOutAt(mult);
    addWin(betAmount, winAmount, 'Aviator Crash', `${mult.toFixed(2)}x`);
  };

  const handleManualCashout = () => {
    triggerCashout(currentMultiplier);
  };

  // Draw the rising curve on HTML5 Canvas
  const drawCanvas = (mult, elapsed) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw dark grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Normalized progress along canvas
    const maxFlightSec = 8;
    const progressX = Math.min(width - 30, 30 + (elapsed / maxFlightSec) * (width - 60));
    const normalizedMult = Math.min(height - 40, ((mult - 1) / 4) * (height - 60));
    const progressY = height - 30 - normalizedMult;

    // Fill under curve with purple-magenta gradient
    const gradient = ctx.createLinearGradient(0, height, 0, progressY);
    gradient.addColorStop(0, 'rgba(124, 58, 237, 0.0)');
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0.4)');

    ctx.beginPath();
    ctx.moveTo(30, height - 30);
    ctx.quadraticCurveTo(width * 0.35, height - 30, progressX, progressY);
    ctx.lineTo(progressX, height - 30);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw neon glowing flight curve
    ctx.beginPath();
    ctx.moveTo(30, height - 30);
    ctx.quadraticCurveTo(width * 0.35, height - 30, progressX, progressY);
    ctx.strokeStyle = '#EC4899';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#EC4899';
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.shadowBlur = 0; // reset
  };

  const potentialWin = Math.round(betAmount * currentMultiplier);

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
            <h2 className="text-base font-black tracking-wide font-display uppercase bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent flex items-center gap-1.5">
              <Plane className="w-4 h-4 text-cyan-400" />
              Aviator Crash
            </h2>
            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider font-num">
              Provably Fair
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
            title="How to play"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Round History Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-black text-slate-500 uppercase font-num shrink-0 pr-1">
            History:
          </span>
          {history.map((h, idx) => (
            <span
              key={h.id || idx}
              className={`px-2.5 py-0.5 rounded-lg border text-xs font-num font-black shrink-0 ${
                h.multiplier >= 10
                  ? 'bg-amber-500/20 text-brand-gold border-amber-500/40'
                  : h.multiplier >= 2
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              }`}
            >
              {h.multiplier.toFixed(2)}x
            </span>
          ))}
        </div>

        {/* Framed Neon Flight Stage */}
        <div className="relative w-full h-64 sm:h-72 rounded-3xl bg-gradient-to-b from-[#111734] to-[#0A0D1E] border border-purple-500/30 overflow-hidden shadow-2xl flex items-center justify-center">
          {/* HTML5 Canvas Curve */}
          <canvas
            ref={canvasRef}
            width={440}
            height={280}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Centered Status Overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none text-center">
            {gameState === 'COUNTDOWN' && (
              <motion.div
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
              >
                <div className="text-6xl font-black font-display text-cyan-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]">
                  {countdown}
                </div>
                <div className="text-xs font-black text-slate-300 uppercase tracking-widest mt-2 font-num">
                  Prepare for Liftoff...
                </div>
              </motion.div>
            )}

            {gameState === 'FLYING' && (
              <div>
                <motion.div
                  key={currentMultiplier.toFixed(2)}
                  className="text-6xl sm:text-7xl font-black font-display tracking-tight bg-gradient-to-r from-white via-pink-200 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]"
                >
                  {currentMultiplier.toFixed(2)}x
                </motion.div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-pink-300 font-bold uppercase tracking-wider font-num mt-1">
                  <Plane className="w-3.5 h-3.5 animate-bounce-subtle" />
                  <span>Flying High</span>
                </div>
              </div>
            )}

            {gameState === 'CRASHED' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="text-4xl sm:text-5xl font-black font-display text-brand-red drop-shadow-[0_0_25px_rgba(239,68,68,0.7)]">
                  CRASHED @ {finalCrashPoint?.toFixed(2)}x
                </div>
                <div className="text-xs text-red-300/90 font-black uppercase tracking-wider mt-1 font-num">
                  Plane Flew Away
                </div>
              </motion.div>
            )}

            {gameState === 'IDLE' && (
              <div className="space-y-1">
                <Plane className="w-12 h-12 text-purple-400/50 mx-auto animate-pulse" />
                <div className="text-sm font-bold text-slate-200">Ready for Flight</div>
                <div className="text-xs text-slate-400">Choose your virtual bet and start flight</div>
              </div>
            )}

            {/* Cashed Out Badge */}
            {hasCashedOut && (
              <div className="mt-3 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black font-num flex items-center gap-1.5 shadow-glow-green">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CASHED OUT @ {cashedOutAt?.toFixed(2)}x (+{potentialWin} Coins)</span>
              </div>
            )}
          </div>
        </div>

        {/* Big Action Button (Green for Cash Out, Purple for Bet, Red for Crashed) */}
        <div>
          {gameState === 'FLYING' ? (
            <button
              onClick={handleManualCashout}
              disabled={hasCashedOut}
              className={`w-full py-4 rounded-2xl font-black font-num text-lg tracking-wider transition-all transform active:scale-97 shadow-xl flex flex-col items-center justify-center ${
                hasCashedOut
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 shadow-glow-green animate-pulse'
              }`}
            >
              <span>{hasCashedOut ? 'CASHED OUT' : 'CASH OUT NOW'}</span>
              <span className="text-xs font-bold">
                {hasCashedOut
                  ? `+${Math.round(betAmount * cashedOutAt).toLocaleString()} Coins Won`
                  : `+${potentialWin.toLocaleString()} Coins Payout`}
              </span>
            </button>
          ) : gameState === 'COUNTDOWN' ? (
            <button
              disabled
              className="w-full py-4 rounded-2xl bg-purple-900/50 text-white font-black font-num text-lg tracking-wider cursor-wait"
            >
              WAITING FOR TAKEOFF ({countdown}s)...
            </button>
          ) : gameState === 'CRASHED' ? (
            <button
              onClick={() => {
                if (play) play.click();
                setGameState('IDLE');
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black font-num text-base shadow-glow-primary flex items-center justify-center gap-2 active:scale-97"
            >
              <RotateCcw className="w-5 h-5" />
              <span>PLAY NEXT ROUND</span>
            </button>
          ) : (
            <button
              onClick={handlePlaceBet}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black font-num text-lg tracking-wider shadow-glow-primary transition-all transform active:scale-97 flex items-center justify-center gap-2"
            >
              <Plane className="w-5 h-5" />
              <span>START FLIGHT ({betAmount} COINS)</span>
            </button>
          )}
        </div>

        {/* Bet Selector with Stepper & Quick Chips */}
        <BetSelector
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          disabled={gameState === 'FLYING' || gameState === 'COUNTDOWN'}
          onOpenAddCoins={() => setShowAddCoins(true)}
        />

        {/* Auto Cashout Config */}
        <div className="bg-[#11172E] border border-white/10 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-bold text-white">Auto Cashout</div>
            <div className="text-[10px] text-slate-400">Exit automatically at target multiplier</div>
          </div>
          <div className="flex items-center gap-1.5 w-28">
            <input
              type="number"
              step="0.1"
              min="1.1"
              max="100"
              placeholder="e.g. 2.0"
              disabled={gameState === 'FLYING' || gameState === 'COUNTDOWN'}
              value={autoCashout}
              onChange={(e) => setAutoCashout(e.target.value)}
              className="w-full bg-[#0A0D1D] border border-white/10 focus:border-brand-purple rounded-xl px-2.5 py-1.5 text-xs text-white text-right font-num font-black focus:outline-none"
            />
            <span className="text-brand-gold font-black font-num">x</span>
          </div>
        </div>
      </div>

      {/* How to Play Modal */}
      <Modal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} title="Aviator Crash Rules">
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-cyan-400">1. Place Your Virtual Bet:</strong> Use stepper (− / +) or chips (10, 50, 100, 500) to select your wager.
          </p>
          <p>
            <strong className="text-brand-magenta">2. Multiplier Flight:</strong> Once the rocket launches, the multiplier rises continuously from 1.00x upwards.
          </p>
          <p>
            <strong className="text-emerald-400">3. Cash Out in Time:</strong> Hit "Cash Out" before the rocket crashes! Your payout equals your bet multiplied by that multiplier.
          </p>
          <p>
            <strong className="text-brand-red">4. Crash Condition:</strong> If the plane flies away before you cash out, the round ends and the virtual bet is lost.
          </p>
        </div>
      </Modal>

      <AddCoinsModal isOpen={showAddCoins} onClose={() => setShowAddCoins(false)} />
    </div>
  );
};
