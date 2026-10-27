import React from 'react';
import { Gift, Bell, Trophy, ShieldCheck } from 'lucide-react';
import { Modal } from './Modal';

export const NotificationModal = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      title: 'Welcome to Young Club!',
      desc: '1,000 complimentary virtual coins added to your portfolio wallet.',
      time: '10m ago',
      icon: Gift,
      color: 'text-pink-400 bg-pink-500/10'
    },
    {
      id: 2,
      title: 'Daily Bonus Active',
      desc: 'Tap the Daily Bonus on the Home page to collect your free 100 coins.',
      time: '1h ago',
      icon: Bell,
      color: 'text-cyan-400 bg-cyan-500/10'
    },
    {
      id: 3,
      title: 'New High Score Record!',
      desc: 'Player Rahul D. hit a 6.0x multiplier on Spin Wheel.',
      time: '3h ago',
      icon: Trophy,
      color: 'text-amber-400 bg-amber-500/10'
    },
    {
      id: 4,
      title: 'Virtual Environment Notice',
      desc: 'Reminder: All tokens are simulated coins with zero financial value.',
      time: '1d ago',
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-500/10'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Notifications">
      <div className="space-y-3">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/[0.08] transition-colors"
            >
              <div className={`p-2 rounded-lg ${item.color} shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-sm font-semibold text-white truncate">{item.title}</h5>
                  <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
