import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  label,
  icon: Icon,
  type = 'text',
  error,
  helperText,
  value,
  onChange,
  placeholder,
  disabled = false,
  rightElement,
  className = '',
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>
            {label} {required && <span className="text-brand-magenta">*</span>}
          </span>
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[11px] text-slate-400 hover:text-brand-magenta transition-colors flex items-center gap-1 font-normal lowercase"
            >
              {showPassword ? (
                <>
                  <EyeOff className="w-3 h-3" />
                  <span>hide</span>
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3" />
                  <span>show</span>
                </>
              )}
            </button>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full bg-[#0A0E1D] border rounded-xl py-3 text-sm text-white placeholder-slate-500
            transition-all duration-200 outline-none
            ${Icon ? 'pl-10' : 'pl-4'}
            ${isPassword || rightElement ? 'pr-11' : 'pr-4'}
            ${
              error
                ? 'border-brand-red/80 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 text-red-200'
                : 'border-white/10 hover:border-white/20 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/25'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-900/40' : ''}
          `}
          {...props}
        />

        {/* Right Element or Password Toggle */}
        {rightElement && (
          <div className="absolute right-3 text-slate-400 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-[11px] font-medium text-brand-red mt-1 flex items-center gap-1">
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-400 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
