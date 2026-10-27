import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * Toast Item Component
 * @param {Object} props
 * @param {'success'|'error'|'info'} props.type
 * @param {string} props.message
 * @param {Function} props.onClose
 */
export const Toast = ({ type = 'info', message, onClose }) => {
  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border text-xs sm:text-sm font-semibold w-full ${
        isSuccess
          ? 'bg-[#0E201B]/95 text-emerald-200 border-emerald-500/40 shadow-glow-green'
          : isError
          ? 'bg-[#220E15]/95 text-rose-200 border-rose-500/40 shadow-glow-red'
          : 'bg-[#14122C]/95 text-purple-200 border-purple-500/40 shadow-glow-primary'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-brand-gold shrink-0" />}
        <span className="leading-snug">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export default Toast;
