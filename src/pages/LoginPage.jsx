import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, LogIn, Sparkles, AlertCircle, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useSound } from '../context/SoundContext';
import { Logo } from '../components/ui/Logo';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { success, error } = useToast();
  const { play } = useSound();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Please enter both username/mobile and password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(identifier, password);
      setLoading(false);

      if (res.success) {
        if (play) play.win();
        success(`Welcome back, ${res.user.name}!`);
        navigate('/home');
      } else {
        if (play) play.lose();
        setErrorMessage(res.error || 'Login failed. Check your credentials.');
        error(res.error || 'Login failed');
      }
    }, 400);
  };

  const handleUseDemo = () => {
    if (play) play.chip();
    const demoId = '7620349985';
    const demoPass = 'Nikhil Shinde 2006';

    setIdentifier(demoId);
    setPassword(demoPass);

    setLoading(true);
    setTimeout(() => {
      const res = login(demoId, demoPass);
      setLoading(false);

      if (res.success) {
        if (play) play.win();
        success('Logged in as Demo User: Nikhil Shinde (5,000 Coins)');
        navigate('/home');
      }
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="min-h-screen bg-[#0B0F1E] text-white flex flex-col justify-between"
    >
      {/* Top Gradient Hero Area */}
      <div className="relative pt-8 pb-10 px-4 text-center overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-b from-purple-600/30 via-pink-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <Link to="/" className="mb-3 block">
            <Logo variant="icon-only" />
          </Link>
          <h2 className="text-2xl font-black font-display tracking-wide uppercase bg-gradient-to-r from-white via-purple-100 to-pink-300 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xs">
            Enter your mobile or username to enter the Young Club arena
          </p>
        </div>
      </div>

      {/* Rounded-t-3xl Glass Form Card Sliding Up */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 bg-[#11172E] border-t border-white/10 rounded-t-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6"
      >
        <div className="space-y-4">
          {/* One-Click Demo Login Banner Chip */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#182042] to-purple-900/20 border border-brand-gold/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold font-num">
                <Zap className="w-4 h-4 fill-brand-gold" />
                <span>PRE-SEEDED DEMO ACCOUNT</span>
              </div>
              <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full font-num font-black">
                5,000 Coins
              </span>
            </div>

            <div className="text-[11px] text-slate-300 leading-snug">
              <div><strong className="text-white">User:</strong> Nikhil Shinde (7620349985)</div>
              <div><strong className="text-white">Pass:</strong> Nikhil Shinde 2006</div>
            </div>

            <button
              type="button"
              onClick={handleUseDemo}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldEnd hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs shadow-glow-gold flex items-center justify-center gap-1.5 transition-all active:scale-97 font-num"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>USE DEMO LOGIN (ONE-CLICK)</span>
            </button>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-brand-red/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Username or Mobile Number"
              placeholder="7620349985 or username"
              icon={User}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <Input
              label="Password"
              placeholder="Enter password"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              icon={LogIn}
              className="mt-2"
            >
              SIGN IN TO ARENA
            </Button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-400 pt-2 border-t border-white/5">
          Don&apos;t have an account yet?{' '}
          <Link
            to="/register"
            className="text-brand-magenta hover:text-pink-300 font-bold underline ml-1"
          >
            Register (+1,000 Free Coins)
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
