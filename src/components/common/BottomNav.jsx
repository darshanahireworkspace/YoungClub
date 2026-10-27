import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Wallet, User } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const BottomNav = () => {
  const { play } = useSound();

  const navItems = [
    { label: 'Home', path: '/home', icon: Home },
    { label: 'Refer & Earn', path: '/refer', icon: Users },
    { label: 'Wallet', path: '/wallet', icon: Wallet },
    { label: 'Account', path: '/account', icon: User },
  ];

  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-full max-w-[460px] px-3 pointer-events-none">
      <div className="pointer-events-auto bg-[#0E1428]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(124,58,237,0.15)] flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => play && play.click()}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-2xl transition-all duration-200 select-none group ${
                  isActive
                    ? 'text-white font-extrabold'
                    : 'text-slate-400 hover:text-slate-200 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Glowing active gradient pill */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 rounded-2xl shadow-glow-primary -z-10" />
                  )}

                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                  />
                  <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
