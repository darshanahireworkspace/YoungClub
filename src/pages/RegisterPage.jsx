import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Smartphone,
  Lock,
  Tag,
  Eye,
  EyeOff,
  ChevronDown,
  Check,
  AlertCircle,
  ShieldCheck,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useSound } from '../context/SoundContext';
import { useLanguage } from '../context/LanguageContext';
import { AuthTopBar } from '../components/common/AuthTopBar';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { success, error } = useToast();
  const { play } = useSound();
  const { t } = useLanguage();

  // Input states
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [agreed, setAgreed] = useState(true);

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Feedback states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleRegister = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!phone.trim()) {
      setErrorMessage(t('enterPhone'));
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMessage(t('phoneMustBe10Digits'));
      return;
    }
    if (!password.trim()) {
      setErrorMessage(t('enterSetPassword'));
      return;
    }
    if (password.length < 4) {
      setErrorMessage('Password must be at least 4 characters');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage(t('passwordsDoNotMatch'));
      return;
    }
    if (!agreed) {
      setErrorMessage('Please read and agree to the Privacy Agreement');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = register({
        mobile: phone,
        password,
        confirmPassword,
        inviteCode: inviteCode.trim() || undefined,
      });
      setLoading(false);

      if (res.success) {
        if (play) play.win();
        success(t('registerSuccess'));
        navigate('/home');
      } else {
        if (play) play.lose();
        setErrorMessage(res.error || 'Registration failed');
        error(res.error || 'Failed to create account');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#16192E] text-white flex flex-col justify-between selection:bg-[#7B61FF] selection:text-white">
      <div>
        {/* Top Bar with < Back Chevron, Young Club Logo, and Language Option */}
        <AuthTopBar />

        {/* Vibrant Gradient Banner (Coral-Orange to Purple to Blue as in Screenshot 2) */}
        <div className="relative px-5 py-5 bg-gradient-to-r from-[#FF7657] via-[#D354DF] to-[#5C94FF] text-white shadow-md">
          <h1 className="text-[22px] font-bold tracking-tight mb-1 font-display">
            {t('register')}
          </h1>
          <p className="text-xs text-white/95 leading-relaxed font-normal">
            {t('registerSubtitle')}
          </p>
        </div>

        {/* Tab: Register your phone */}
        <div className="bg-[#181B30] border-b border-white/5 flex items-center">
          <div className="flex-1 py-3.5 flex flex-col items-center justify-center gap-1.5 relative text-[#8E82E3]">
            <div className="p-1 rounded-md bg-[#8E82E3]/15">
              <Smartphone className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-xs font-bold tracking-wide">
              {t('registerPhone')}
            </span>
            {/* Active underline indicator */}
            <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#8E82E3] rounded-full" />
          </div>
        </div>

        {/* Form Container */}
        <div className="p-5 space-y-4">
          {/* Error Message */}
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

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Field 1: Phone number */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white text-xs font-semibold">
                <div className="w-5 h-5 rounded-md bg-[#8E82E3]/20 flex items-center justify-center text-[#8E82E3]">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <span>{t('phoneNumberField')}</span>
              </div>

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

            {/* Field 2: Set password */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white text-xs font-semibold">
                <div className="w-5 h-5 rounded-md bg-[#8E82E3]/20 flex items-center justify-center text-[#8E82E3]">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <span>{t('setPassword')}</span>
              </div>

              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('enterSetPassword')}
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

            {/* Field 3: Confirm password */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white text-xs font-semibold">
                <div className="w-5 h-5 rounded-md bg-[#8E82E3]/20 flex items-center justify-center text-[#8E82E3]">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <span>{t('confirmPassword')}</span>
              </div>

              <div className="relative flex items-center">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('enterConfirmPassword')}
                  className="w-full bg-[#212745] text-white text-xs placeholder-[#6E7599] h-12 pl-4 pr-11 rounded-xl outline-none border border-transparent focus:border-[#7B61FF] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-white p-1"
                >
                  {showConfirmPassword ? (
                    <Eye className="w-4 h-4 text-[#8E82E3]" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Field 4: Invite code */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white text-xs font-semibold">
                <div className="w-5 h-5 rounded-md bg-[#8E82E3]/20 flex items-center justify-center text-[#8E82E3]">
                  <Tag className="w-3.5 h-3.5" />
                </div>
                <span>{t('inviteCode')}</span>
              </div>

              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder={t('enterInviteCode')}
                className="w-full bg-[#212745] text-white text-xs placeholder-[#6E7599] h-12 px-4 rounded-xl outline-none border border-transparent focus:border-[#7B61FF] transition-all"
              />
            </div>

            {/* Agreement Checkbox (Screenshot 2: Checked purple circle + red agreement text) */}
            <div className="flex items-center gap-2 pt-1 text-xs select-none">
              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  agreed
                    ? 'bg-[#7B61FF] border border-[#7B61FF]'
                    : 'border border-slate-500 bg-transparent'
                }`}
              >
                {agreed && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
              </button>

              <div className="text-[11px] text-slate-300">
                <span>{t('readAndAgree')} </span>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-[#FF5252] font-semibold hover:underline"
                >
                  {t('privacyAgreement')}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              {/* Button 1: Register (Vibrant Gradient Pill Button as in Screenshot 2) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-full font-bold text-sm tracking-wide bg-gradient-to-r from-[#FF7657] via-[#D052DE] to-[#438EFF] text-white shadow-lg hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <span>{t('register')}</span>
                )}
              </button>

              {/* Button 2: I have an account Login (Pill shape with purple border) */}
              <Link
                to="/login"
                className="w-full h-12 rounded-full font-bold text-sm tracking-wide border border-[#6B66C5] bg-transparent text-[#9D94FF] hover:bg-white/5 active:scale-[0.98] transition-all flex items-center justify-center"
              >
                <span>{t('haveAccountLogin')}</span>
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Privacy Agreement Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivacyModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-sm bg-[#1D213A] border border-white/10 rounded-2xl p-5 space-y-3 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2 text-white text-sm font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#7B61FF]" />
                  <span>Privacy Agreement</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-slate-300 space-y-2 max-h-60 overflow-y-auto pr-1">
                <p>
                  Welcome to <strong>Young Club</strong>. By creating an account, you agree to:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-400">
                  <li>Use virtual tokens for entertainment purposes only (no real money involved).</li>
                  <li>Protect your password and login credentials.</li>
                  <li>Comply with platform fair play guidelines and respect other community members.</li>
                  <li>Receive platform updates and system notifications.</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAgreed(true);
                  setShowPrivacyModal(false);
                }}
                className="w-full py-2.5 rounded-full bg-[#7B61FF] text-white text-xs font-bold hover:bg-[#6c51f5]"
              >
                I Agree
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
