import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  HelpCircle, 
  Coins, 
  Bomb, 
  Gem, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  generateMinesGrid, 
  calculateMinesMultiplier, 
  calculateNextMinesMultiplier, 
  GRID_SIZE 
} from '../../games/minesLogic';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import { useToast } from '../../context/ToastContext';
import { BetSelector } from '../../components/common/BetSelector';
import { Modal } from '../../components/ui/Modal';
import { AddCoinsModal } from '../../components/common/AddCoinsModal';
import { BalanceChip } from '../../components/ui/BalanceChip';

export const MinesGamePage = () => {
  const navigate = useNavigate();
  const { balance, deductBet, addWin } = useWallet();
  const { play } = useSound();
  const { error, success } = useToast();

  const [betAmount, setBetAmount] = useState(100);
  const [mineCount, setMineCount] = useState(3);
  const [inGame, setInGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [grid, setGrid] = useState(() => Array.from({ length: GRID_SIZE }, (_, i) => ({ id: i, isMine: false, revealed: false })));
  const [revealedCount, setRevealedCount] = useState(0);

  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showAddCoins, setShowAddCoins] = useState(false);

  const currentMultiplier = calculateMinesMultiplier(revealedCount, mineCount);
  const nextMultiplier = calculateNextMinesMultiplier(revealedCount, mineCount);
  const currentCashout = Math.round(betAmount * currentMultiplier);

  const handleStartGame = () => {
    if (inGame) return;
    if (balance < betAmount) {
      error('Insufficient virtual coins for this bet!');
      setShowAddCoins(true);
      return;
    }

    const res = deductBet(betAmount, 'Mines');
    if (!res.success) return;

    const newGrid = generateMinesGrid(mineCount);
    setGrid(newGrid);
    setRevealedCount(0);
    setInGame(true);
    setGameOver(false);
    setHasWon(false);
  };

  const handleTileClick = (index) => {
    if (!inGame || gameOver) return;
    const tile = grid[index];
    if (tile.revealed) return;

    const updatedGrid = [...grid];
    updatedGrid[index] = { ...tile, revealed: true };

    if (tile.isMine) {
      if (play) play.explosion();
      const revealedAll = updatedGrid.map((t) => ({ ...t, revealed: true }));
      setGrid(revealedAll);
      setInGame(false);
      setGameOver(true);
      setHasWon(false);
      return;
    }

    if (play) play.cashout();
    const newRevealed = revealedCount + 1;
    setRevealedCount(newRevealed);
    setGrid(updatedGrid);

    if (newRevealed === GRID_SIZE - mineCount) {
      handleCashout(updatedGrid);
    }
  };

  const handleCashout = (currentG = grid) => {
    if (!inGame || gameOver || revealedCount === 0) return;

    const winAmount = Math.round(betAmount * currentMultiplier);
    addWin(betAmount, winAmount, 'Mines', `${currentMultiplier.toFixed(2)}x`);

    const revealedAll = currentG.map((t) => ({ ...t, revealed: true }));
    setGrid(revealedAll);
    setInGame(false);
    setGameOver(true);
    setHasWon(true);
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
            <h2 className="text-base font-black tracking-wide font-display uppercase bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent flex items-center gap-1.5">
              <Bomb className="w-4 h-4 text-pink-400" />
              Mines Tactical
            </h2>
            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider font-num">
              Pick Gems &bull; Avoid Bombs
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
        {/* Game Stats Card */}
        <div className="rounded-2xl p-4 bg-[#11172E] border border-white/10 flex items-center justify-between shadow-lg">
          <div className="text-left">
            <span className="text-[10px] uppercase font-black text-slate-400 font-num">Current Multiplier</span>
            <div className="text-xl font-black font-num text-pink-400">
              {currentMultiplier.toFixed(2)}x
            </div>
          </div>

          <div className="text-center">
            <span className="text-[10px] uppercase font-black text-slate-400 font-num">Gems Found</span>
            <div className="text-xl font-black font-num text-emerald-400 flex items-center justify-center gap-1">
              <Gem className="w-4 h-4 text-emerald-400" />
              <span>{revealedCount} / {GRID_SIZE - mineCount}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-black text-slate-400 font-num">Next Tile</span>
            <div className="text-xl font-black font-num text-brand-gold">
              {nextMultiplier.toFixed(2)}x
            </div>
          </div>
        </div>

        {/* 5x5 Mines Grid with 3D-Styled Tiles */}
        <div className="relative p-3.5 rounded-3xl bg-gradient-to-b from-[#151C3B] to-[#0A0D1E] border border-purple-500/30 shadow-2xl">
          <div className="grid grid-cols-5 gap-2.5 aspect-square">
            {grid.map((cell) => {
              const isRevealed = cell.revealed;
              return (
                <button
                  key={cell.id}
                  disabled={!inGame || isRevealed}
                  onClick={() => handleTileClick(cell.id)}
                  className={`relative rounded-2xl border flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md ${
                    !isRevealed
                      ? inGame
                        ? 'bg-gradient-to-b from-[#222B52] to-[#141A38] hover:from-[#2B3766] hover:to-[#1A234A] border-white/15 cursor-pointer hover:border-pink-400/50 hover:shadow-glow-primary'
                        : 'bg-[#151C3B] border-white/5 cursor-default'
                      : cell.isMine
                      ? 'bg-gradient-to-b from-rose-900 to-red-950 border-rose-500 shadow-glow-red'
                      : 'bg-gradient-to-b from-emerald-900 to-green-950 border-emerald-500 shadow-glow-green'
                  }`}
                >
                  {isRevealed ? (
                    cell.isMine ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Bomb className="w-7 h-7 text-rose-300 animate-pulse drop-shadow-glow-red" />
                      </motion.div>
                    ) : (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Gem className="w-7 h-7 text-emerald-300 drop-shadow-glow-green" />
                      </motion.div>
                    )
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Game Over Banner Overlay */}
          {gameOver && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3.5 p-3.5 rounded-2xl text-center border backdrop-blur-md"
            >
              {hasWon ? (
                <div className="bg-emerald-500/20 border-emerald-500/40 text-emerald-300 p-2.5 rounded-xl shadow-glow-green">
                  <div className="text-xs font-black uppercase font-num">CASHED OUT SUCCESSFULLY!</div>
                  <div className="text-lg font-black font-num mt-0.5">
                    +{currentCashout.toLocaleString()} Virtual Coins Won
                  </div>
                </div>
              ) : (
                <div className="bg-rose-500/20 border-rose-500/40 text-rose-300 p-2.5 rounded-xl shadow-glow-red">
                  <div className="text-xs font-black uppercase font-num">BOOM! YOU HIT A MINE</div>
                  <div className="text-xs mt-0.5 text-rose-200">Better luck next round!</div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Action Button: Green for Cashout, Purple for Start */}
        <div>
          {inGame ? (
            <button
              onClick={() => handleCashout()}
              disabled={revealedCount === 0}
              className={`w-full py-4 rounded-2xl font-black font-num text-lg tracking-wider transition-all transform active:scale-97 shadow-xl flex items-center justify-center gap-2 ${
                revealedCount === 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 shadow-glow-green animate-pulse'
              }`}
            >
              <Gem className="w-5 h-5" />
              <span>
                {revealedCount === 0
                  ? 'PICK A TILE FIRST'
                  : `CASH OUT (+${currentCashout.toLocaleString()} COINS)`}
              </span>
            </button>
          ) : (
            <button
              onClick={handleStartGame}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black font-num text-lg tracking-wider shadow-glow-primary transition-all transform active:scale-97 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-brand-gold" />
              <span>START GAME ({betAmount} COINS)</span>
            </button>
          )}
        </div>

        {/* Mines Count Selector */}
        <div className="bg-[#11172E] border border-white/10 rounded-2xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Bomb className="w-4 h-4 text-pink-400" />
              <span>Mines Count</span>
            </span>
            <span className="font-black font-num text-pink-400">{mineCount} Mines</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 3, 5, 10].map((count) => (
              <button
                key={count}
                type="button"
                disabled={inGame}
                onClick={() => {
                  if (play) play.chip();
                  setMineCount(count);
                }}
                className={`py-2 rounded-xl font-black font-num text-xs border transition-all ${
                  mineCount === count
                    ? 'bg-pink-500/25 text-pink-300 border-pink-400 shadow-glow-primary'
                    : 'bg-[#151C38] border-white/10 text-slate-400 hover:text-white'
                } disabled:opacity-40 active:scale-95`}
              >
                {count} Mines
              </button>
            ))}
          </div>
        </div>

        {/* Bet Selector with Stepper & Quick Chips */}
        <BetSelector
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          disabled={inGame}
          onOpenAddCoins={() => setShowAddCoins(true)}
        />
      </div>

      {/* How to Play Modal */}
      <Modal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} title="How to Play Mines">
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-cyan-400">1. Setup Your Grid:</strong> Select your virtual bet and choose how many hidden bombs to plant (1 to 10).
          </p>
          <p>
            <strong className="text-emerald-400">2. Pick Tiles:</strong> Each gem uncovered safely increases your multiplier.
          </p>
          <p>
            <strong className="text-brand-gold">3. Cash Out Anytime:</strong> Tap "Cash Out" at any moment to lock in your profit before hitting a bomb!
          </p>
        </div>
      </Modal>

      <AddCoinsModal isOpen={showAddCoins} onClose={() => setShowAddCoins(false)} />
    </div>
  );
};
