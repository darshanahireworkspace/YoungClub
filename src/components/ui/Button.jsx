import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 select-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.97]';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5 min-h-[36px]',
    md: 'px-4 py-2.5 text-sm rounded-xl gap-2 min-h-[44px]',
    lg: 'px-6 py-3.5 text-base rounded-2xl gap-2.5 min-h-[50px]',
    pill: 'px-5 py-2.5 text-xs font-black rounded-full gap-2 min-h-[40px]',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-glow-primary border border-white/20',
    gold: 'bg-gradient-to-r from-brand-gold to-brand-goldEnd hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black shadow-glow-gold border border-amber-300/40',
    outline: 'bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 backdrop-blur-sm',
    ghost: 'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white',
    danger: 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-glow-red border border-red-400/30',
    success: 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black shadow-glow-green border border-emerald-300/40',
    glass: 'bg-white/10 hover:bg-white/15 text-white backdrop-blur-md border border-white/20 shadow-sm',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={!disabled && !loading ? { scale: 0.97 } : undefined}
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {IconRight && <IconRight className="w-4 h-4 shrink-0" />}
        </>
      )}
    </motion.button>
  );
};
