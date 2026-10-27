import React from 'react';

/**
 * FlagIcon
 * Renders circular vector flags for US and India
 */
export const FlagIcon = ({ country = 'US', size = 20, className = '' }) => {
  if (country === 'US') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        className={`rounded-full shrink-0 shadow-xs overflow-hidden ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <clipPath id="circleClipUS">
          <circle cx="16" cy="16" r="16" />
        </clipPath>
        <g clipPath="url(#circleClipUS)">
          {/* 13 Stripes */}
          <rect width="32" height="32" fill="#B22234" />
          <rect y="2.46" width="32" height="2.46" fill="#FFFFFF" />
          <rect y="7.38" width="32" height="2.46" fill="#FFFFFF" />
          <rect y="12.30" width="32" height="2.46" fill="#FFFFFF" />
          <rect y="17.23" width="32" height="2.46" fill="#FFFFFF" />
          <rect y="22.15" width="32" height="2.46" fill="#FFFFFF" />
          <rect y="27.07" width="32" height="2.46" fill="#FFFFFF" />

          {/* Blue Canton */}
          <rect width="14" height="17.23" fill="#1E2A5E" />

          {/* Stars grid representation */}
          <circle cx="3.5" cy="3.5" r="0.9" fill="#FFFFFF" />
          <circle cx="7" cy="3.5" r="0.9" fill="#FFFFFF" />
          <circle cx="10.5" cy="3.5" r="0.9" fill="#FFFFFF" />

          <circle cx="5.25" cy="6.2" r="0.9" fill="#FFFFFF" />
          <circle cx="8.75" cy="6.2" r="0.9" fill="#FFFFFF" />

          <circle cx="3.5" cy="9" r="0.9" fill="#FFFFFF" />
          <circle cx="7" cy="9" r="0.9" fill="#FFFFFF" />
          <circle cx="10.5" cy="9" r="0.9" fill="#FFFFFF" />

          <circle cx="5.25" cy="11.8" r="0.9" fill="#FFFFFF" />
          <circle cx="8.75" cy="11.8" r="0.9" fill="#FFFFFF" />

          <circle cx="3.5" cy="14.5" r="0.9" fill="#FFFFFF" />
          <circle cx="7" cy="14.5" r="0.9" fill="#FFFFFF" />
          <circle cx="10.5" cy="14.5" r="0.9" fill="#FFFFFF" />
        </g>
      </svg>
    );
  }

  // India Flag (HD, TA, TE)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`rounded-full shrink-0 shadow-xs overflow-hidden ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="circleClipIN">
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath="url(#circleClipIN)">
        {/* Saffron Top */}
        <rect width="32" height="10.66" fill="#FF9933" />
        {/* White Middle */}
        <rect y="10.66" width="32" height="10.66" fill="#FFFFFF" />
        {/* Green Bottom */}
        <rect y="21.32" width="32" height="10.68" fill="#138808" />

        {/* Ashoka Chakra Wheel */}
        <circle cx="16" cy="16" r="4.2" fill="none" stroke="#000080" strokeWidth="0.8" />
        <circle cx="16" cy="16" r="0.9" fill="#000080" />
        {/* Spokes */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="16"
            y1="16"
            x2={16 + 4.2 * Math.cos((i * Math.PI) / 6)}
            y2={16 + 4.2 * Math.sin((i * Math.PI) / 6)}
            stroke="#000080"
            strokeWidth="0.5"
          />
        ))}
      </g>
    </svg>
  );
};
