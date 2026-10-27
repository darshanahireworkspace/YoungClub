import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  Check,
  AlertCircle,
  Sparkles,
  HelpCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useSound } from '../context/SoundContext';
import { useLanguage } from '../context/LanguageContext';
import { AuthTopBar } from '../components/common/AuthTopBar';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { success, error } = useToast();
  const { play } = useSound();
  const { t } = useLanguage();

  // Tab state: 'phone' or 'email'
  const [activeTab, setActiveTab] = useState('phone');

  // Input states
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Check if form is filled
  const isFilled = activeTab === 'phone'
    ? phone.trim().length >= 4 && password.trim().length >= 4
    : email.trim().length >= 4 && password.trim().length >= 4;

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const identifier = activeTab === 'phone' ? phone.trim() : email.trim();

    if (!identifier) {
      setErrorMessage(activeTab === 'phone' ? t('enterPhone') : t('enterEmail'));
      return;
    }
    if (!password.trim()) {
      setErrorMessage(t('enterPassword'));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(identifier, password);
      setLoading(false);

      if (res.success) {
        if (play) play.win();
        success(t('loginSuccess'));
        navigate('/home');
      } else {
        if (play) play.lose();
        setErrorMessage(res.error || 'Login failed. Please verify credentials.');
        error(res.error || 'Login failed');
      }
    }, 350);
  };

  const handleQuickDemo = () => {
    setActiveTab('phone');
    setPhone('7620349985');
    setPassword('Nikhil2006');
    setErrorMessage('');
    if (play) play.chip();
  };

  return (
    <div className="min-h-screen bg-[#16192E] text-white flex flex-col justify-between selection:bg-[#7B61FF] selection:text-white">
      <div>
        {/* Top Bar with < Back Chevron, Young Club Logo, and Language Option */}
        <AuthTopBar />

        {/* Vibrant Gradient Banner (Coral-Orange to Purple to Blue as in Screenshot 1) */}
        <div className="relative px-5 py-5 bg-gradient-to-r from-[#FF7657] via-[#D354DF] to-[#5C94FF] text-white shadow-md">
          <h1 className="text-[22px] font-bold tracking-tight mb-1 font-display">
            {t('login')}
          </h1>
          <p className="text-xs text-white/95 leading-relaxed font-normal">
            {t('loginSubtitle1')}
          </p>
          <p className="text-xs text-white/90 leading-relaxed font-normal">
            {t('loginSubtitle2')}
          </p>
        </div>

        {/* Two-Tab Navigation: Phone Number & Email */}
        <div className="bg-[#181B30] border-b border-white/5 flex items-center">
          {/* Phone Number Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('phone');
              setErrorMessage('');
            }}
            className={`flex-1 py-3.5 flex flex-col items-center justify-center gap-1.5 relative transition-colors ${
              activeTab === 'phone' ? 'text-[#8E82E3]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {/* Mobile device icon */}
            <div className={`p-1 rounded-md ${activeTab === 'phone' ? 'bg-[#8E82E3]/15' : 'bg-transparent'}`}>
              <Smartphone className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-xs font-bold tracking-wide">
              {t('phoneNumber')}
            </span>
            {/* Active underline indicator */}
            {activeTab === 'phone' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#8E82E3] rounded-full"
              />
            )}
          </button>

          {/* Email Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('email');
              setErrorMessage('');
            }}
            className={`flex-1 py-3.5 flex flex-col items-center justify-center gap-1.5 relative transition-colors ${
              activeTab === 'email' ? 'text-[#8E82E3]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {/* Mail icon */}
            <div className={`p-1 rounded-md ${activeTab === 'email' ? 'bg-[#8E82E3]/15' : 'bg-transparent'}`}>
              <Mail className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-xs font-bold tracking-wide">
              {t('email')}
            </span>
            {activeTab === 'email' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#8E82E3] rounded-full"
              />
            )}
          </button>
        </div>

        {/* Form Container */}
        <div className="p-5 space-y-5">
          {/* Error Banner */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Field 1: Phone number OR Email */}
            {activeTab === 'phone' ? (
              <div className="space-y-2">
                {/* Field Label with soft purple phone icon */}
                <div className="flex items-center gap-2 text-white text-xs font-semibold">
                  <div className="w-5 h-5 rounded-md bg-[#8E82E3]/20 flex items-center justify-center text-[#8E82E3]">
                    <Smartphone className="w-3.5 h-3.5" />
                  </div>
                  <span>{t('phoneNumberField')}</span>
                </div>

                {/* Input Row: Country Code Selector + Phone Input */}
                <div className="flex items-center gap-2">
                  <div className="bg-[#212745] hover:bg-[#282f54] text-white px-3 h-12 rounded-xl flex items-center justify-between gap-1.5 cursor-pointer border border-transparent focus-within:border-[#7B61FF] transition-colors shrink-0">
                    <span className="text-xs font-bold font-num">+91</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder={t('enterPhone')}
                    className="flex-1 bg-[#212745] text-white text-xs placeholder-[#6E7599] h-12 px-4 rounded-xl outline-none border border-transparent focus:border-[#7B61FF] transition-all"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white text-xs font-semibold">
                  <div className="w-5 h-5 rounded-md bg-[#8E82E3]/20 flex items-center justify-center text-[#8E82E3]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span>{t('email')}</span>
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('enterEmail')}
                  className="w-full bg-[#212745] text-white text-xs placeholder-[#6E7599] h-12 px-4 rounded-xl outline-none border border-transparent focus:border-[#7B61FF] transition-all"
                />
              </div>
            )}

            {/* Field 2: Password */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white text-xs font-semibold">
                <div className="w-5 h-5 rounded-md bg-[#8E82E3]/20 flex items-center justify-center text-[#8E82E3]">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <span>{t('password')}</span>
              </div>

              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('enterPassword')}
                  className="w-full bg-[#212745] text-white text-xs placeholder-[#6E7599] h-12 pl-4 pr-11 rounded-xl outline-none border border-transparent focus:border-[#7B61FF] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-white p-1"
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4 text-[#8E82E3]" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember password & Forgot password Row */}
            <div className="flex items-center justify-between pt-1 text-xs">
              {/* Remember password */}
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-2 text-slate-300 hover:text-white select-none"
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                    rememberMe
                      ? 'bg-[#7B61FF] border border-[#7B61FF]'
                      : 'border border-slate-500 bg-transparent'
                  }`}
                >
                  {rememberMe && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                </div>
                <span className="text-[11px] text-slate-300">{t('rememberPassword')}</span>
              </button>

              {/* Forgot password */}
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] text-[#637CFF] hover:underline"
              >
                {t('forgotPassword')}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              {/* Button 1: Log in (Pill shape) */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 rounded-full font-bold text-sm tracking-wide transition-all duration-200 shadow-md flex items-center justify-center ${
                  isFilled
                    ? 'bg-gradient-to-r from-[#FF7657] via-[#D052DE] to-[#438EFF] text-white hover:brightness-105 active:scale-[0.98]'
                    : 'bg-[#484D6B] text-[#A5ABC4] cursor-pointer hover:bg-[#525779]'
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <span>{t('login')}</span>
                )}
              </button>

              {/* Button 2: Register (Pill shape with purple border) */}
              <Link
                to="/register"
                className="w-full h-12 rounded-full font-bold text-sm tracking-wide border border-[#6B66C5] bg-transparent text-[#9D94FF] hover:bg-white/5 active:scale-[0.98] transition-all flex items-center justify-center"
              >
                <span>{t('register')}</span>
              </Link>
            </div>
          </form>

          {/* Discreet Quick Demo Login Chip */}
          <div className="pt-3 border-t border-white/5">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 flex items-center justify-between text-left transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] text-slate-300">
                  Demo: <strong className="text-white font-num">7620349985</strong> • Pass: <strong className="text-white">Nikhil2006</strong>
                </span>
              </div>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full font-num">
                1-Click Autofill
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForgotModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-sm bg-[#1D213A] border border-white/10 rounded-2xl p-5 text-center space-y-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#8E82E3]/20 text-[#8E82E3] flex items-center justify-center mx-auto">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Forgot Password?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                As stated on the top banner: Please contact Young Club Customer Service or use the demo login credentials.
              </p>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="w-full py-2.5 rounded-full bg-[#7B61FF] text-white text-xs font-bold hover:bg-[#6c51f5]"
              >
                Understood
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
