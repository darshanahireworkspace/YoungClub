import React from 'react';

/**
 * YoungClubLogo
 * Faithfully recreates the vibrant 3D gaming logo shown in Screenshot 4:
 * - "YOUNG" in 3D cyan/blue bubble arcade lettering with highlights
 * - Center purple poker chip with card club ♣ symbol
 * - Royal crown on top of the chip
 * - Golden shooting star with glowing comet tail to the top-right
 * - Cyan glowing star at bottom-left
 * - "CLUB" in 3D purple/lavender bubble arcade lettering
 *
 * Designed with precise centered coordinates inside viewBox="0 0 300 64"
 * ensuring "YOUNG" is 100% visible on the left and never cut off.
 */
export const YoungClubLogo = ({ height = 36, className = '', useImage = false }) => {
  if (useImage) {
    return (
      <img
        src="/images/young_club_logo.jpg"
        alt="Young Club"
        style={{ height }}
        className={`object-contain rounded-md select-none shrink-0 ${className}`}
      />
    );
  }

  // Crisp Vector SVG recreation
  return (
    <div
      className={`inline-flex items-center justify-center select-none shrink-0 ${className}`}
      style={{ height }}
    >
      <svg
        viewBox="0 0 300 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto overflow-visible drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Gradient for YOUNG */}
          <linearGradient id="youngGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="18%" stopColor="#7EE8FA" />
            <stop offset="55%" stopColor="#00B4D8" />
            <stop offset="100%" stopColor="#0077B6" />
          </linearGradient>

          {/* Extrusion / Stroke for YOUNG */}
          <linearGradient id="youngExtrusion" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#005B8E" />
            <stop offset="100%" stopColor="#002947" />
          </linearGradient>

          {/* Gradient for CLUB */}
          <linearGradient id="clubGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="18%" stopColor="#E9D5FF" />
            <stop offset="55%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>

          {/* Extrusion for CLUB */}
          <linearGradient id="clubExtrusion" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#581C87" />
            <stop offset="100%" stopColor="#2E1065" />
          </linearGradient>

          {/* Center Chip Gradient */}
          <radialGradient id="chipGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#D8B4FE" />
            <stop offset="45%" stopColor="#9333EA" />
            <stop offset="85%" stopColor="#6B21A8" />
            <stop offset="100%" stopColor="#4C1D95" />
          </radialGradient>

          {/* Shooting Star Comet Trail */}
          <linearGradient id="cometGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>

          {/* Gold Star Gradient */}
          <linearGradient id="goldStar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>

          {/* Cyan Star Gradient */}
          <linearGradient id="cyanStar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CFFAFE" />
            <stop offset="40%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Crown Gradient */}
          <linearGradient id="crownGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#E9D5FF" />
          </linearGradient>
        </defs>

        {/* ===================== WORD "YOUNG" ===================== */}
        {/* Centered at x=74, leaving safe padding on left (x=19 to x=129) */}
        <g>
          {/* 3D Drop Shadow / Extrusion */}
          <text
            x="74"
            y="44"
            textAnchor="middle"
            fontSize="28"
            fontFamily="'Arial Black', 'Impact', sans-serif"
            fontWeight="900"
            letterSpacing="-0.5"
            fill="none"
            stroke="url(#youngExtrusion)"
            strokeWidth="7"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            YOUNG
          </text>
          <text
            x="74"
            y="44"
            textAnchor="middle"
            fontSize="28"
            fontFamily="'Arial Black', 'Impact', sans-serif"
            fontWeight="900"
            letterSpacing="-0.5"
            fill="#002D52"
          >
            YOUNG
          </text>

          {/* White outline for glossy bubble definition */}
          <text
            x="74"
            y="42"
            textAnchor="middle"
            fontSize="28"
            fontFamily="'Arial Black', 'Impact', sans-serif"
            fontWeight="900"
            letterSpacing="-0.5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          >
            YOUNG
          </text>

          {/* Main Vibrant Cyan Fill */}
          <text
            x="74"
            y="42"
            textAnchor="middle"
            fontSize="28"
            fontFamily="'Arial Black', 'Impact', sans-serif"
            fontWeight="900"
            letterSpacing="-0.5"
            fill="url(#youngGrad)"
          >
            YOUNG
          </text>
        </g>

        {/* ===================== CENTER BADGE ===================== */}
        <g transform="translate(146, 33)">
          {/* Crown on top */}
          <path
            d="M -13 -18 L -15 -27 L -6 -22 L 0 -30 L 6 -22 L 15 -27 L 13 -18 Z"
            fill="url(#crownGrad)"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Crown Jewels */}
          <circle cx="0" cy="-28" r="1.3" fill="#FACC15" />
          <circle cx="-13" cy="-25.5" r="1" fill="#FACC15" />
          <circle cx="13" cy="-25.5" r="1" fill="#FACC15" />

          {/* Comet Tail launching up-right */}
          <path
            d="M 5 -6 C 14 -12, 28 -20, 36 -24 C 28 -12, 18 -2, 8 4 Z"
            fill="url(#cometGrad)"
          />

          {/* Yellow Shooting Star */}
          <g transform="translate(36, -24) scale(0.7)">
            <polygon
              points="0,-12 3.5,-3.5 12,-3.5 5,2.5 8,11 0,6 -8,11 -5,2.5 -12,-3.5 -3.5,-3.5"
              fill="url(#goldStar)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>

          {/* Chip Outer Rim */}
          <circle cx="0" cy="0" r="17" fill="#4C1D95" stroke="#FFFFFF" strokeWidth="1.5" />
          
          {/* Poker Chip Dashes */}
          <circle cx="0" cy="0" r="15.5" fill="none" stroke="#C084FC" strokeWidth="2" strokeDasharray="3.5 4.5" />

          {/* Chip Center Body */}
          <circle cx="0" cy="0" r="13" fill="url(#chipGrad)" />
          <circle cx="0" cy="0" r="12" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />

          {/* Club Suit ♣ */}
          <g transform="scale(0.85) translate(0, -0.5)">
            <circle cx="0" cy="-4" r="3.2" fill="#FFFFFF" />
            <circle cx="-3.6" cy="1.5" r="3.2" fill="#FFFFFF" />
            <circle cx="3.6" cy="1.5" r="3.2" fill="#FFFFFF" />
            <path d="M 0 0 L -1.5 6 L 1.5 6 Z" fill="#FFFFFF" />
          </g>

          {/* Cyan Glowing Star at bottom left */}
          <g transform="translate(-16, 12) scale(0.65)">
            <polygon
              points="0,-11 3,-3 11,-3 4.5,2 7,10 0,5.5 -7,10 -4.5,2 -11,-3 -3,-3"
              fill="url(#cyanStar)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* ===================== WORD "CLUB" ===================== */}
        {/* Centered at x=216 */}
        <g>
          {/* 3D Drop Shadow / Extrusion */}
          <text
            x="216"
            y="44"
            textAnchor="middle"
            fontSize="28"
            fontFamily="'Arial Black', 'Impact', sans-serif"
            fontWeight="900"
            letterSpacing="-0.5"
            fill="none"
            stroke="url(#clubExtrusion)"
            strokeWidth="7"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            CLUB
          </text>
          <text
            x="216"
            y="44"
            textAnchor="middle"
            fontSize="28"
            fontFamily="'Arial Black', 'Impact', sans-serif"
            fontWeight="900"
            letterSpacing="-0.5"
            fill="#2E1065"
          >
            CLUB
          </text>

          {/* White outline for glossy bubble definition */}
          <text
            x="216"
            y="42"
            textAnchor="middle"
            fontSize="28"
            fontFamily="'Arial Black', 'Impact', sans-serif"
            fontWeight="900"
            letterSpacing="-0.5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          >
            CLUB
          </text>

          {/* Main Vibrant Lavender Fill */}
          <text
            x="216"
            y="42"
            textAnchor="middle"
            fontSize="28"
            fontFamily="'Arial Black', 'Impact', sans-serif"
            fontWeight="900"
            letterSpacing="-0.5"
            fill="url(#clubGrad)"
          >
            CLUB
          </text>
        </g>
      </svg>
    </div>
  );
};
