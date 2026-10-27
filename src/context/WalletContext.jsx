import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { walletService } from '../services/walletService';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { useSound } from './SoundContext';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const { currentUser, refreshUser } = useAuth();
  const { success, error } = useToast();
  const { play } = useSound();

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [friends, setFriends] = useState([]);
  const [dailyBonusStatus, setDailyBonusStatus] = useState({ canClaim: false, remainingMs: 0 });

  // Sync state whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      setBalance(currentUser.balance || 0);
      setTransactions(walletService.getTransactions(currentUser.id));
      setFriends(walletService.getFriends());
      setDailyBonusStatus(walletService.checkDailyBonusStatus(currentUser.id));
    } else {
      setBalance(0);
      setTransactions([]);
      setFriends([]);
    }
  }, [currentUser]);

  // Trigger celebratory confetti effect
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00f2fe', '#ec4899', '#f59e0b', '#8b5cf6'],
      });
    } catch {
      // Fallback silently if canvas not available
    }
  }, []);

  // Refresh transactions list
  const refreshTransactions = useCallback((filter = 'all') => {
    if (!currentUser) return;
    const txs = walletService.getTransactions(currentUser.id, filter);
    setTransactions(txs);
  }, [currentUser]);

  // Add virtual coins (mock recharge)
  const addCoins = useCallback((amount, method = 'Instant Demo Recharge') => {
    if (!currentUser) return { success: false, error: 'Please login first' };

    const res = walletService.addCoins(currentUser.id, amount, method);
    if (res.success) {
      setBalance(res.balance);
      refreshUser();
      refreshTransactions();
      play.cashout();
      triggerConfetti();
      success(`Successfully added +${amount.toLocaleString()} Virtual Coins!`);
    } else {
      error(res.error || 'Failed to add coins');
    }
    return res;
  }, [currentUser, refreshUser, refreshTransactions, play, triggerConfetti, success, error]);

  // Deduct bet amount
  const deductBet = useCallback((betAmount, gameName) => {
    if (!currentUser) return { success: false, error: 'Please login first' };

    const res = walletService.deductBet(currentUser.id, betAmount, gameName);
    if (res.success) {
      setBalance(res.balance);
      refreshUser();
      refreshTransactions();
      play.chip();
    } else {
      play.lose();
      error(res.error || 'Insufficient virtual coins');
    }
    return res;
  }, [currentUser, refreshUser, refreshTransactions, play, error]);

  // Add winnings
  const addWin = useCallback((betAmount, winAmount, gameName, multiplierText = '') => {
    if (!currentUser) return;

    const res = walletService.addWin(currentUser.id, betAmount, winAmount, gameName, multiplierText);
    if (res.success) {
      setBalance(res.balance);
      refreshUser();
      refreshTransactions();

      if (winAmount > betAmount) {
        play.win();
        triggerConfetti();
        success(`Awesome! You won +${winAmount.toLocaleString()} Virtual Coins! 🎉`);
      }
    }
    return res;
  }, [currentUser, refreshUser, refreshTransactions, play, triggerConfetti, success]);

  // Claim Daily Bonus (+100 coins)
  const claimDailyBonus = useCallback(() => {
    if (!currentUser) return;

    const res = walletService.claimDailyBonus(currentUser.id);
    if (res.success) {
      setBalance(res.balance);
      refreshUser();
      refreshTransactions();
      setDailyBonusStatus({ canClaim: false, remainingMs: 24 * 60 * 60 * 1000 });
      play.cashout();
      triggerConfetti();
      success('Claimed +100 Daily Bonus Virtual Coins!');
    } else {
      error(res.error || 'Daily bonus not available yet');
    }
    return res;
  }, [currentUser, refreshUser, refreshTransactions, play, triggerConfetti, success, error]);

  // Claim 7-day streak day
  const claimStreakDay = useCallback((day) => {
    if (!currentUser) return;

    const res = walletService.claimStreakDay(currentUser.id, day);
    if (res.success) {
      setBalance(res.balance);
      refreshUser();
      refreshTransactions();
      play.cashout();
      triggerConfetti();
      success(`Claimed Day ${day} Streak Reward: +${res.reward} Coins! 🎁`);
    } else {
      error(res.error || 'Failed to claim streak');
    }
    return res;
  }, [currentUser, refreshUser, refreshTransactions, play, triggerConfetti, success, error]);

  // Claim promotional offer (e.g. Weekend Bonanza)
  const claimOffer = useCallback((offerKey, reward, title) => {
    if (!currentUser) return;

    const res = walletService.claimOffer(currentUser.id, offerKey, reward, title);
    if (res.success) {
      setBalance(res.balance);
      refreshUser();
      refreshTransactions();
      play.cashout();
      triggerConfetti();
      success(`Claimed offer: +${reward} Coins! 🚀`);
    }
    return res;
  }, [currentUser, refreshUser, refreshTransactions, play, triggerConfetti, success]);

  // Simulate friend joined
  const simulateFriendJoined = useCallback(() => {
    if (!currentUser) return;

    const res = walletService.simulateFriendJoin(currentUser.id);
    if (res.success) {
      setBalance(res.balance);
      setFriends(walletService.getFriends());
      refreshUser();
      refreshTransactions();
      play.win();
      triggerConfetti();
      success(`Friend joined! +200 Referral Coins added to your wallet! 👥`);
    }
    return res;
  }, [currentUser, refreshUser, refreshTransactions, play, triggerConfetti, success]);

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        friends,
        dailyBonusStatus,
        addCoins,
        deductBet,
        addWin,
        claimDailyBonus,
        claimStreakDay,
        claimOffer,
        simulateFriendJoined,
        refreshTransactions,
        triggerConfetti,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
