import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameArtwork } from './GameArtwork';
import { useSound } from '../../context/SoundContext';

/**
 * Standard 3-column game card matching the casino UI in Screenshots 1, 3, 4, 5.
 */
export const GameCard = ({ game, showRtp = false }) => {
  const navigate = useNavigate();
  const { play } = useSound();

  const handleClick = () => {
    if (play) play.chip();
    if (game.path) {
      navigate(game.path);
    } else {
      navigate('/games/crash');
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="relative rounded-xl border border-white/10 shadow-md cursor-pointer overflow-hidden flex flex-col justify-between group bg-[#16192E] hover:border-[#7B61FF]/60 transition-all"
    >
      {/* Upper Artwork Box */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#111428]">
        {/* Provider Tag (Screenshot 1 & 4 & 5: Gold JILI badge top-right) */}
        {(game.provider || game.badge) && (
          <div className="absolute top-1 right-1 z-20 px-1.5 py-0.5 rounded bg-black/75 border border-amber-400/80 shadow-md backdrop-blur-xs flex items-center justify-center">
            <span className="text-[8px] font-black tracking-wider text-amber-300 font-display">
              {game.provider || game.badge}
            </span>
          </div>
        )}

        {/* Artwork Graphic */}
        <GameArtwork
          theme={game.theme}
          icon={game.icon}
          image={game.image}
          title={game.title}
        />
      </div>

      {/* Game Title Bar */}
      <div className="px-1.5 py-1 text-center bg-[#151933]">
        <h4 className="text-[10px] font-black text-white uppercase tracking-tight truncate drop-shadow-xs font-display">
          {game.title}
        </h4>
      </div>

      {/* Bottom RTP pill (Screenshots 1: RTP 97.62%) */}
      {(showRtp || game.rtp) && (
        <div className="px-1.5 pb-1.5 pt-0.5 bg-[#151933]">
          <div className="px-2 py-0.5 rounded-full bg-[#2E2259] border border-[#7B61FF]/50 flex items-center justify-between text-[9px] font-bold shadow-inner">
            <span className="text-[#A799FF] text-[8px] font-semibold">RTP</span>
            <span className="text-white font-num font-black text-[9px] tracking-tight">
              {game.rtp || '97.2%'}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
