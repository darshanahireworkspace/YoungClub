import React from 'react';
import { Wallet as WalletIcon, Coins, ShieldCheck } from 'lucide-react';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { BalanceCard } from '../components/wallet/BalanceCard';
import { WalletSummary } from '../components/wallet/WalletSummary';
import { TransactionHistory } from '../components/wallet/TransactionHistory';

export const WalletPage = () => {
  return (
    <div className="min-h-screen bg-[#050711] text-white flex flex-col max-w-lg mx-auto pb-20 relative">
      <Header />

      <main className="p-4 space-y-4">
        {/* Large Balance Card */}
        <BalanceCard />

        {/* Summary Metric Cards */}
        <WalletSummary />

        {/* Filterable Transaction History */}
        <TransactionHistory />
      </main>

      <BottomNav />
    </div>
  );
};
