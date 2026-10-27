import React from 'react';

export const Card = ({
  children,
  variant = 'default',
  hover = false,
  padding = 'p-4',
  className = '',
  onClick,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-gradient-to-b from-[rgba(22,29,58,0.75)] to-[rgba(14,19,40,0.85)] border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.08)]',
    glass: 'bg-white/[0.04] backdrop-blur-xl border-white/10',
    primary: 'bg-gradient-to-br from-purple-900/40 via-fuchsia-950/30 to-[#0B0F1E] border-purple-500/25',
    gold: 'bg-gradient-to-br from-amber-950/30 via-[#161D3A] to-[#0B0F1E] border-amber-500/30',
    surface: 'bg-[#11172E] border-white/5',
  };

  const hoverStyle = hover
    ? 'cursor-pointer hover:border-purple-500/40 hover:bg-gradient-to-b hover:from-[rgba(30,40,80,0.85)] hover:to-[rgba(18,25,54,0.95)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.6),0_0_20px_-3px_rgba(124,58,237,0.2)] transition-all duration-200'
    : '';

  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl border backdrop-blur-md
        ${variantStyles[variant] || variantStyles.default}
        ${hoverStyle}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
