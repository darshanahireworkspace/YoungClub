import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { ReferEarnPage } from './pages/ReferEarnPage';
import { WalletPage } from './pages/WalletPage';
import { AccountPage } from './pages/AccountPage';

// Game Pages
import { CrashGamePage } from './pages/games/CrashGamePage';
import { ColorGamePage } from './pages/games/ColorGamePage';
import { SpinWheelPage } from './pages/games/SpinWheelPage';
import { DiceGamePage } from './pages/games/DiceGamePage';
import { MinesGamePage } from './pages/games/MinesGamePage';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F1E] flex flex-col items-center justify-center text-brand-purple font-num text-sm gap-2">
        <div className="w-10 h-10 rounded-full border-2 border-brand-purple border-t-brand-magenta animate-spin" />
        <span className="tracking-widest font-bold">LOADING YOUNG CLUB...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Guard (Redirects to /home if already logged in)
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (!loading && isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#070A16] text-slate-100 flex flex-col justify-between relative selection:bg-brand-magenta selection:text-white">
        {/* Desktop Ambient Background Orbs */}
        <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none hidden lg:block" />
        <div className="fixed -bottom-40 -right-40 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none hidden lg:block" />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none hidden lg:block" />

        {/* Persistent Top Disclaimer Banner */}
        <DisclaimerBanner />

        {/* Centered Mobile-First Frame (max-w-[480px]) */}
        <div className="w-full max-w-[480px] mx-auto min-h-screen flex flex-col relative shadow-[0_0_80px_rgba(0,0,0,0.85)] border-x border-white/5 bg-[#0B0F1E]">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicOnlyRoute>
                  <RegisterPage />
                </PublicOnlyRoute>
              }
            />

            {/* Protected Tab Pages */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/refer"
              element={
                <ProtectedRoute>
                  <ReferEarnPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wallet"
              element={
                <ProtectedRoute>
                  <WalletPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Games */}
            <Route
              path="/games/crash"
              element={
                <ProtectedRoute>
                  <CrashGamePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/color"
              element={
                <ProtectedRoute>
                  <ColorGamePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/spin"
              element={
                <ProtectedRoute>
                  <SpinWheelPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/dice"
              element={
                <ProtectedRoute>
                  <DiceGamePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/mines"
              element={
                <ProtectedRoute>
                  <MinesGamePage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Persistent Bottom Disclaimer Footer */}
        <footer className="w-full py-2.5 bg-[#070A16] border-t border-white/5 text-center text-[11px] text-slate-500 z-10">
          Demo project &bull; Virtual coins only &bull; No real money &bull; 18+ for entertainment
        </footer>
      </div>
    </HashRouter>
  );
}
