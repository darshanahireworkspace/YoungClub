/**
 * Mock Data & Initial Seeds for Young Club
 * Pre-populates the Demo User (Nikhil Shinde), initial transactions,
 * promotional banners, and live ticker items.
 */

export const DEMO_USER = {
  id: 'YC-7620',
  name: 'Nikhil Shinde',
  username: '7620349985',
  mobile: '7620349985',
  // Password stored in lower-case trimmed for case-insensitive verification
  passwordHash: 'nikhil shinde 2006',
  balance: 5000,
  avatar: 'NS',
  referralCode: 'NIKHIL7620',
  referredBy: null,
  friendsCount: 3,
  bonusEarned: 600,
  createdAt: '2024-01-15T10:00:00.000Z',
  streakDay: 2,
  lastStreakClaim: null,
  lastDailyBonusClaim: null,
  settings: {
    sound: true,
    notifications: true,
  },
  stats: {
    gamesPlayed: 24,
    wins: 15,
    totalWon: 8450,
    totalPlayed: 6200,
    biggestWin: 2400,
  }
};

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx_001',
    userId: 'YC-7620',
    type: 'bonus',
    title: 'Welcome Bonus',
    description: 'Portfolio starter virtual coins',
    amount: 1000,
    timestamp: '2024-01-15T10:00:00.000Z',
    status: 'completed'
  },
  {
    id: 'tx_002',
    userId: 'YC-7620',
    type: 'bonus',
    title: 'Referral Bonus',
    description: 'Friend Amit Patel joined',
    amount: 200,
    timestamp: '2024-01-16T14:22:00.000Z',
    status: 'completed'
  },
  {
    id: 'tx_003',
    userId: 'YC-7620',
    type: 'credit',
    title: 'Simulated Recharge',
    description: 'Virtual coins demo pack',
    amount: 2000,
    timestamp: '2024-01-17T09:15:00.000Z',
    status: 'completed'
  },
  {
    id: 'tx_004',
    userId: 'YC-7620',
    type: 'game_win',
    title: 'Crash Game Win',
    description: 'Cashed out at 2.45x',
    amount: 1450,
    timestamp: '2024-01-18T18:40:00.000Z',
    status: 'completed'
  },
  {
    id: 'tx_005',
    userId: 'YC-7620',
    type: 'debit',
    title: 'Mines Game Wager',
    description: 'Placed 500 coin bet',
    amount: -500,
    timestamp: '2024-01-19T21:10:00.000Z',
    status: 'completed'
  },
  {
    id: 'tx_006',
    userId: 'YC-7620',
    type: 'game_win',
    title: 'Spin Wheel Jackpot',
    description: 'Landed 3x Multiplier slice',
    amount: 1500,
    timestamp: '2024-01-20T16:30:00.000Z',
    status: 'completed'
  },
  {
    id: 'tx_007',
    userId: 'YC-7620',
    type: 'debit',
    title: 'Color Prediction Bet',
    description: 'Placed bet on Green',
    amount: -300,
    timestamp: '2024-01-21T12:05:00.000Z',
    status: 'completed'
  },
  {
    id: 'tx_008',
    userId: 'YC-7620',
    type: 'bonus',
    title: 'Daily Check-in',
    description: 'Day 2 streak reward',
    amount: 100,
    timestamp: '2024-01-21T12:06:00.000Z',
    status: 'completed'
  }
];

export const INITIAL_FRIENDS = [
  {
    id: 'fr_1',
    name: 'Amit Patel',
    mobile: '9820******',
    joinedDate: '2 days ago',
    bonusGranted: 200,
    status: 'Active'
  },
  {
    id: 'fr_2',
    name: 'Sneha Rao',
    mobile: '9934******',
    joinedDate: '4 days ago',
    bonusGranted: 200,
    status: 'Active'
  },
  {
    id: 'fr_3',
    name: 'Vikram Joshi',
    mobile: '7712******',
    joinedDate: '1 week ago',
    bonusGranted: 200,
    status: 'Active'
  }
];

export const PROMO_BANNERS = [
  {
    id: 'promo-1',
    title: 'Aviator Crash Arena',
    subtitle: 'Ride the rocket curve & cash out before it flies away!',
    tag: 'POPULAR',
    accentColor: 'from-cyan-500 to-blue-600',
    buttonText: 'Play Crash',
    link: '/games/crash',
    icon: 'Plane'
  },
  {
    id: 'promo-2',
    title: '7-Day Check-in Streak',
    subtitle: 'Claim up to 1,500 bonus virtual coins every week!',
    tag: 'FREE BONUS',
    accentColor: 'from-amber-500 to-orange-600',
    buttonText: 'Claim Streak',
    link: '/refer',
    icon: 'Gift'
  },
  {
    id: 'promo-3',
    title: 'Mines Tactical Grid',
    subtitle: 'Pick diamonds, avoid bombs & cash out anytime.',
    tag: 'HIGH PAYOUT',
    accentColor: 'from-fuchsia-600 to-pink-600',
    buttonText: 'Play Mines',
    link: '/games/mines',
    icon: 'Bomb'
  },
  {
    id: 'promo-4',
    title: 'Refer & Win Big',
    subtitle: 'Get 200 virtual coins for every friend who signs up.',
    tag: 'REWARDS',
    accentColor: 'from-emerald-500 to-teal-600',
    buttonText: 'Invite Friends',
    link: '/refer',
    icon: 'Users'
  }
];

export const LIVE_WINNERS_TICKER = [
  { user: 'Karan M.', game: 'Crash', amount: 1250, multiplier: '2.5x' },
  { user: 'Pooja S.', game: 'Mines', amount: 840, multiplier: '4.2x' },
  { user: 'Rahul D.', game: 'Spin Wheel', amount: 3000, multiplier: '6.0x' },
  { user: 'Aman V.', game: 'Color Game', amount: 900, multiplier: '2.0x' },
  { user: 'Divya T.', game: 'Dice Roll', amount: 1600, multiplier: '3.2x' },
  { user: 'Suresh K.', game: 'Crash', amount: 4800, multiplier: '9.6x' },
  { user: 'Neha P.', game: 'Mines', amount: 1100, multiplier: '5.5x' },
];

export const STREAK_DAYS = [
  { day: 1, reward: 50, label: '+50 Coins' },
  { day: 2, reward: 75, label: '+75 Coins' },
  { day: 3, reward: 100, label: '+100 Coins' },
  { day: 4, reward: 150, label: '+150 Coins' },
  { day: 5, reward: 200, label: '+200 Coins' },
  { day: 6, reward: 300, label: '+300 Coins' },
  { day: 7, reward: 500, label: 'Mega Chest (+500)' },
];

export const FAQ_ITEMS = [
  {
    q: 'Is there real money involved in Young Club?',
    a: 'No. Young Club is strictly a free-to-play UI demo and educational portfolio project. All tokens are 100% virtual demo coins with zero financial value. There are no deposits, no real payment gateways, and no cash withdrawals.'
  },
  {
    q: 'How do I get more virtual coins if I run out?',
    a: 'You can tap "Add Coins" in the Wallet tab to instantly simulate a free recharge of 200 to 1000+ virtual coins. You can also claim the Daily Bonus (+100 every 24h) and 7-day Check-in Streak rewards.'
  },
  {
    q: 'Are the game outcomes fair and random?',
    a: 'Yes, every game round uses transparent, client-side pseudorandom number generators with clean mathematical logic in separate modules. You can inspect the source code in the `src/games/` folder.'
  },
  {
    q: 'Can I test the referral system without real friends?',
    a: 'Yes! Head to the "Refer & Earn" tab and tap the "Simulate Friend Joined" button. It will generate a new simulated referral and immediately reward you with +200 virtual coins.'
  },
  {
    q: 'How does the Crash game work?',
    a: 'You place a virtual coin bet, and the multiplier begins climbing from 1.00x upwards. You must tap "Cash Out" before the rocket crashes at a randomly chosen threshold. If you cash out in time, you win your bet multiplied by that multiplier.'
  }
];
