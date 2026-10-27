import React from 'react';
import { Users, Gift, Sparkles } from 'lucide-react';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { ReferralCodeCard } from '../components/refer/ReferralCodeCard';
import { MilestoneProgress } from '../components/refer/MilestoneProgress';
import { OffersSection } from '../components/refer/OffersSection';
import { FriendsList } from '../components/refer/FriendsList';

export const ReferEarnPage = () => {
  return (
    <div className="min-h-screen bg-[#050711] text-white flex flex-col max-w-lg mx-auto pb-20 relative">
      <Header />

      <main className="p-4 space-y-4">
        {/* Referral Code & Social Sharing */}
        <ReferralCodeCard />

        {/* Milestone Progression Bar */}
        <MilestoneProgress />

        {/* 7-Day Streak & Bonus Offers */}
        <OffersSection />

        {/* Invited Friends List & Simulate Button */}
        <FriendsList />
      </main>

      <BottomNav />
    </div>
  );
};
