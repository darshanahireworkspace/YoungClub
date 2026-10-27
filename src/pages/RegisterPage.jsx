import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Smartphone, Lock, UserPlus, Gift, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useSound } from '../context/SoundContext';
import { Logo } from '../components/ui/Logo';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { success, error } = useToast();
  const { play } = useSound();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Compute password strength (0 to 3)
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass) || pass.length >= 10) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['Weak', 'Moderate', 'Strong'];
  const strengthColors = ['bg-rose-500', 'bg-amber-400', 'bg-emerald-500'];

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!/^\d{10}$/.test(mobile.trim())) {
      setErrorMessage('Mobile number must be exactly 10 digits');
      return;
    }
    if (!username.trim() || username.length < 3) {
      setErrorMessage('Username must be at least 3 characters');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage('Password must be at least 4 characters');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = register({
        name,
        mobile,
        username,
        password,
        confirmPassword,
      });
      setLoading(false);

      if (res.success) {
        if (play) play.win();
        success('Account created! +1,000 Welcome Virtual Coins added! 🎉');
        navigate('/home');
      } else {
        if (play) play.lose();
        setErrorMessage(res.error || 'Registration failed');
        error(res.error || 'Failed to create account');
      }
    }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="min-h-screen bg-[#0B0F1E] text-white flex flex-col justify-between"
    >
      {/* Top Gradient Hero Area */}
      <div className="relative pt-6 pb-8 px-4 text-center overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-b from-purple-600/30 via-pink-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <Link to="/" className="mb-2 block">
            <Logo variant="icon-only" />
          </Link>
          <h2 className="text-2xl font-black font-display tracking-wide uppercase bg-gradient-to-r from-white via-purple-100 to-pink-300 bg-clip-text text-transparent">
            Join Young Club
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-black font-num mt-2">
            <Gift className="w-3.5 h-3.5" />
            <span>CLAIM 1,000 FREE WELCOME COINS</span>
          </div>
        </div>
      </div>

      {/* Rounded-t-3xl Glass Form Card Sliding Up */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 bg-[#11172E] border-t border-white/10 rounded-t-3xl p-6 shadow-2xl flex flex-col justify-between space-y-5"
      >
        <div className="space-y-3.5">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-brand-red/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3.5">
            <Input
              label="Full Name"
              placeholder="e.g. Nikhil Shinde"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Mobile Number (10 Digits)"
              placeholder="10-digit mobile"
              type="tel"
              maxLength="10"
              icon={Smartphone}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
              required
            />

            <Input
              label="Username"
              placeholder="Choose a player username"
              icon={User}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Password"
                placeholder="Min 4 chars"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Input
                label="Confirm"
                placeholder="Repeat pass"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Password Strength Meter Bar */}
            {password.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase font-num">
                  <span>Security Strength</span>
                  <span className={strength === 3 ? 'text-emerald-400' : strength === 2 ? 'text-amber-400' : 'text-rose-400'}>
                    {strengthLabels[strength - 1] || 'Too short'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 h-1.5 rounded-full overflow-hidden bg-slate-800">
                  <div className={`h-full ${strength >= 1 ? strengthColors[strength - 1] : 'bg-transparent'}`} />
                  <div className={`h-full ${strength >= 2 ? strengthColors[strength - 1] : 'bg-transparent'}`} />
                  <div className={`h-full ${strength >= 3 ? strengthColors[strength - 1] : 'bg-transparent'}`} />
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              icon={UserPlus}
              className="mt-3"
            >
              CREATE &amp; CLAIM 1,000 COINS
            </Button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-400 pt-2 border-t border-white/5">
          Already registered?{' '}
          <Link
            to="/login"
            className="text-brand-magenta hover:text-pink-300 font-bold underline ml-1"
          >
            Sign In Here
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
