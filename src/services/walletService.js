/**
 * Wallet Service
 * Manages virtual coin balance, transaction history, bet deductions,
 * win credits, simulated recharges, daily bonuses, and streaks.
 */
import { storageService } from './storageService';
import { STREAK_DAYS } from './mockData';

const USERS_KEY = 'users';
const SESSION_KEY = 'session';
const TRANSACTIONS_KEY = 'transactions';
const FRIENDS_KEY = 'friends';

export const walletService = {
  /**
   * Helper to update user in both users array and active session
   */
  _updateUser(userId, updaterFn) {
    const users = storageService.get(USERS_KEY, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return null;

    const updatedUser = updaterFn({ ...users[idx] });
    users[idx] = updatedUser;
    storageService.set(USERS_KEY, users);

    // Sync session if currently active
    const session = storageService.get(SESSION_KEY, null);
    if (session && session.id === userId) {
      storageService.set(SESSION_KEY, updatedUser);
    }

    return updatedUser;
  },

  /**
   * Record a transaction
   */
  _recordTx({ userId, type, title, description, amount }) {
    const tx = {
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      userId,
      type, // 'credit' | 'debit' | 'game_win' | 'bonus'
      title,
      description,
      amount: Math.round(amount),
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    const allTxs = storageService.get(TRANSACTIONS_KEY, []);
    storageService.set(TRANSACTIONS_KEY, [tx, ...allTxs]);
    return tx;
  },

  /**
   * Get user balance
   */
  getBalance(userId) {
    const users = storageService.get(USERS_KEY, []);
    const user = users.find(u => u.id === userId);
    return user ? user.balance : 0;
  },

  /**
   * Add virtual coins (mock recharge)
   */
  addCoins(userId, amount, method = 'Instant Demo Recharge') {
    const coinAmt = Math.round(Number(amount));
    if (coinAmt <= 0) return { success: false, error: 'Invalid coin amount' };

    const updated = this._updateUser(userId, u => ({
      ...u,
      balance: (u.balance || 0) + coinAmt
    }));

    if (!updated) return { success: false, error: 'User not found' };

    this._recordTx({
      userId,
      type: 'credit',
      title: 'Simulated Coin Pack',
      description: `Added via ${method} (Demo)`,
      amount: coinAmt
    });

    return { success: true, balance: updated.balance, user: updated };
  },

  /**
   * Deduct bet amount before starting a game
   */
  deductBet(userId, betAmount, gameName) {
    const bet = Math.round(Number(betAmount));
    if (bet <= 0) return { success: false, error: 'Invalid bet amount' };

    const currentBal = this.getBalance(userId);
    if (currentBal < bet) {
      return { success: false, error: 'Insufficient virtual coins for this bet' };
    }

    const updated = this._updateUser(userId, u => {
      const stats = u.stats || { gamesPlayed: 0, wins: 0, totalWon: 0, totalPlayed: 0, biggestWin: 0 };
      return {
        ...u,
        balance: u.balance - bet,
        stats: {
          ...stats,
          gamesPlayed: (stats.gamesPlayed || 0) + 1,
          totalPlayed: (stats.totalPlayed || 0) + bet
        }
      };
    });

    this._recordTx({
      userId,
      type: 'debit',
      title: `${gameName} Bet`,
      description: `Wagered on ${gameName}`,
      amount: -bet
    });

    return { success: true, balance: updated.balance, user: updated };
  },

  /**
   * Add winnings after game result
   */
  addWin(userId, betAmount, winAmount, gameName, multiplierText = '') {
    const win = Math.round(Number(winAmount));
    if (win <= 0) return { success: true, balance: this.getBalance(userId) };

    const updated = this._updateUser(userId, u => {
      const stats = u.stats || { gamesPlayed: 0, wins: 0, totalWon: 0, totalPlayed: 0, biggestWin: 0 };
      const newTotalWon = (stats.totalWon || 0) + win;
      const newBiggest = Math.max(stats.biggestWin || 0, win);
      return {
        ...u,
        balance: (u.balance || 0) + win,
        stats: {
          ...stats,
          wins: (stats.wins || 0) + 1,
          totalWon: newTotalWon,
          biggestWin: newBiggest
        }
      };
    });

    this._recordTx({
      userId,
      type: 'game_win',
      title: `${gameName} Win`,
      description: multiplierText ? `Won at ${multiplierText}` : `Profit from ${gameName}`,
      amount: win
    });

    return { success: true, balance: updated.balance, user: updated };
  },

  /**
   * Claim Daily Bonus (100 coins once every 24h)
   */
  claimDailyBonus(userId) {
    const users = storageService.get(USERS_KEY, []);
    const user = users.find(u => u.id === userId);
    if (!user) return { success: false, error: 'User not found' };

    const now = Date.now();
    const lastClaim = user.lastDailyBonusClaim ? new Date(user.lastDailyBonusClaim).getTime() : 0;
    const cooldownMs = 24 * 60 * 60 * 1000; // 24 hours

    if (lastClaim && now - lastClaim < cooldownMs) {
      const remainingMs = cooldownMs - (now - lastClaim);
      const remainingHours = Math.ceil(remainingMs / (1000 * 60 * 60));
      return {
        success: false,
        error: `Daily bonus claimed! Next claim available in ${remainingHours}h`,
        canClaim: false,
        remainingMs
      };
    }

    const bonusAmount = 100;
    const updated = this._updateUser(userId, u => ({
      ...u,
      balance: (u.balance || 0) + bonusAmount,
      bonusEarned: (u.bonusEarned || 0) + bonusAmount,
      lastDailyBonusClaim: new Date().toISOString()
    }));

    this._recordTx({
      userId,
      type: 'bonus',
      title: 'Daily Bonus',
      description: 'Daily login +100 virtual coins',
      amount: bonusAmount
    });

    return { success: true, balance: updated.balance, user: updated, amount: bonusAmount };
  },

  /**
   * Check daily bonus eligibility
   */
  checkDailyBonusStatus(userId) {
    const users = storageService.get(USERS_KEY, []);
    const user = users.find(u => u.id === userId);
    if (!user) return { canClaim: false, remainingMs: 0 };

    if (!user.lastDailyBonusClaim) {
      return { canClaim: true, remainingMs: 0 };
    }

    const now = Date.now();
    const lastClaim = new Date(user.lastDailyBonusClaim).getTime();
    const cooldownMs = 24 * 60 * 60 * 1000;
    const diff = now - lastClaim;

    if (diff >= cooldownMs) {
      return { canClaim: true, remainingMs: 0 };
    }

    return { canClaim: false, remainingMs: cooldownMs - diff };
  },

  /**
   * Claim 7-day streak reward
   */
  claimStreakDay(userId, targetDay) {
    const users = storageService.get(USERS_KEY, []);
    const user = users.find(u => u.id === userId);
    if (!user) return { success: false, error: 'User not found' };

    const streakConfig = STREAK_DAYS[targetDay - 1];
    if (!streakConfig) return { success: false, error: 'Invalid streak day' };

    const reward = streakConfig.reward;
    const nextDay = targetDay >= 7 ? 1 : targetDay + 1;

    const updated = this._updateUser(userId, u => ({
      ...u,
      balance: (u.balance || 0) + reward,
      bonusEarned: (u.bonusEarned || 0) + reward,
      streakDay: nextDay,
      lastStreakClaim: new Date().toISOString()
    }));

    this._recordTx({
      userId,
      type: 'bonus',
      title: `Day ${targetDay} Streak Reward`,
      description: streakConfig.label,
      amount: reward
    });

    return { success: true, reward, user: updated, balance: updated.balance };
  },

  /**
   * Claim Weekend Bonanza Offer (+500 Coins)
   */
  claimOffer(userId, offerKey, rewardAmount, title) {
    const updated = this._updateUser(userId, u => ({
      ...u,
      balance: (u.balance || 0) + rewardAmount,
      bonusEarned: (u.bonusEarned || 0) + rewardAmount
    }));

    this._recordTx({
      userId,
      type: 'bonus',
      title,
      description: 'Promotional Offer Claim',
      amount: rewardAmount
    });

    return { success: true, reward: rewardAmount, user: updated, balance: updated.balance };
  },

  /**
   * Simulate a friend joining through referral
   */
  simulateFriendJoin(userId) {
    const sampleNames = ['Rohan Verma', 'Kunal Shah', 'Ananya Roy', 'Mayur Patil', 'Varun Iyer', 'Shruti Deshmukh'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomMobile = '9' + Math.floor(100000000 + Math.random() * 900000000).toString().slice(0, 3) + '******';

    const newFriend = {
      id: 'fr_' + Date.now(),
      name: randomName,
      mobile: randomMobile,
      joinedDate: 'Just now',
      bonusGranted: 200,
      status: 'Active'
    };

    const friends = storageService.get(FRIENDS_KEY, []);
    storageService.set(FRIENDS_KEY, [newFriend, ...friends]);

    const reward = 200;
    const updated = this._updateUser(userId, u => ({
      ...u,
      balance: (u.balance || 0) + reward,
      friendsCount: (u.friendsCount || 0) + 1,
      bonusEarned: (u.bonusEarned || 0) + reward
    }));

    this._recordTx({
      userId,
      type: 'bonus',
      title: 'Referral Bonus',
      description: `Friend ${randomName} signed up`,
      amount: reward
    });

    return { success: true, friend: newFriend, balance: updated.balance, user: updated };
  },

  /**
   * Get all transactions for a user
   */
  getTransactions(userId, filter = 'all') {
    const all = storageService.get(TRANSACTIONS_KEY, []);
    const userTxs = all.filter(t => t.userId === userId || !t.userId);

    if (filter === 'all') return userTxs;
    if (filter === 'credits') return userTxs.filter(t => t.type === 'credit' || t.amount > 0);
    if (filter === 'debits') return userTxs.filter(t => t.type === 'debit' || t.amount < 0);
    if (filter === 'game_win') return userTxs.filter(t => t.type === 'game_win');
    if (filter === 'bonus') return userTxs.filter(t => t.type === 'bonus');
    return userTxs;
  },

  /**
   * Get friends list
   */
  getFriends() {
    return storageService.get(FRIENDS_KEY, []);
  }
};
