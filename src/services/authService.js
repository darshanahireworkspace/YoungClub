/**
 * Auth Service
 * Manages user accounts, sessions, password updates, and pre-seeds Demo User.
 */
import { storageService } from './storageService';
import { DEMO_USER, INITIAL_TRANSACTIONS, INITIAL_FRIENDS } from './mockData';

const USERS_KEY = 'users';
const SESSION_KEY = 'session';
const TRANSACTIONS_KEY = 'transactions';
const FRIENDS_KEY = 'friends';

export const authService = {
  /**
   * Initialize local storage with default demo data if not yet present
   */
  init() {
    let users = storageService.get(USERS_KEY, []);
    const demoIndex = users.findIndex(u => u.username === DEMO_USER.username || u.mobile === DEMO_USER.mobile);
    if (demoIndex === -1) {
      users = [DEMO_USER, ...users];
      storageService.set(USERS_KEY, users);
    } else {
      // Ensure the demo user always has the latest password 'nikhil2006' and fields
      users[demoIndex].passwordHash = DEMO_USER.passwordHash;
      users[demoIndex].mobile = DEMO_USER.mobile;
      users[demoIndex].username = DEMO_USER.username;
      storageService.set(USERS_KEY, users);
    }

    // Initialize transactions if empty
    let txs = storageService.get(TRANSACTIONS_KEY, null);
    if (!txs) {
      storageService.set(TRANSACTIONS_KEY, INITIAL_TRANSACTIONS);
    }

    // Initialize friends if empty
    let friends = storageService.get(FRIENDS_KEY, null);
    if (!friends) {
      storageService.set(FRIENDS_KEY, INITIAL_FRIENDS);
    }
  },

  /**
   * Get all registered users
   */
  getUsers() {
    this.init();
    return storageService.get(USERS_KEY, [DEMO_USER]);
  },

  /**
   * Get the active logged in user session
   */
  getCurrentUser() {
    this.init();
    const session = storageService.get(SESSION_KEY, null);
    if (!session) return null;
    
    // Always sync with latest user state in users list
    const users = this.getUsers();
    const active = users.find(u => u.id === session.id);
    return active || session;
  },

  /**
   * Login with username/mobile and password
   * @param {string} identifier - username or mobile
   * @param {string} password 
   */
  login(identifier, password) {
    this.init();
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim().toLowerCase();

    if (!cleanId || !cleanPass) {
      return { success: false, error: 'Please enter both username/mobile and password' };
    }

    const users = this.getUsers();
    const numericId = cleanId.replace(/\D/g, '');
    const cleanNumericId = numericId.length > 10 && numericId.startsWith('91') ? numericId.slice(2) : numericId;

    let user = users.find(
      u => u.username?.toLowerCase() === cleanId ||
           u.mobile?.toLowerCase() === cleanId ||
           (cleanNumericId && u.mobile?.replace(/\D/g, '') === cleanNumericId) ||
           (u.email && u.email?.toLowerCase() === cleanId)
    );

    // Fallback if demo user
    if (!user && (cleanId === '7620349985' || cleanNumericId === '7620349985' || cleanId === 'nikhil' || cleanId === 'nikhil shinde')) {
      user = DEMO_USER;
    }

    if (!user) {
      return { success: false, error: 'Account not found with this mobile or username' };
    }

    // Check password (accepts nikhil2006 case-insensitively)
    const storedPass = (user.passwordHash || '').toLowerCase();
    const isDemo = user.mobile === '7620349985' || user.username === '7620349985';
    const isValidPass = storedPass === cleanPass || (isDemo && (cleanPass === 'nikhil2006' || cleanPass === 'nikhil shinde 2006'));

    if (!isValidPass) {
      return { success: false, error: 'Incorrect password. Try again or use Demo Login.' };
    }

    // Save session
    storageService.set(SESSION_KEY, user);
    return { success: true, user };
  },

  /**
   * Register a new user
   * Gives 1000 welcome coins automatically!
   */
  register({ name, mobile, username, password, confirmPassword, inviteCode, email }) {
    this.init();
    let cleanMobile = (mobile || '').replace(/\D/g, '');
    if (cleanMobile.length > 10 && cleanMobile.startsWith('91')) {
      cleanMobile = cleanMobile.slice(2);
    }
    const cleanPass = (password || '').trim();
    const cleanName = (name || '').trim() || (cleanMobile ? `User ${cleanMobile.slice(-4)}` : 'Member');
    const cleanUsername = (username || '').trim().toLowerCase() || (cleanMobile ? `u${cleanMobile}` : `user_${Date.now().toString().slice(-6)}`);

    // Validation
    if (cleanMobile.length < 10) {
      return { success: false, error: 'Mobile number must be at least 10 digits' };
    }
    if (!cleanPass || cleanPass.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters' };
    }
    if (cleanPass !== (confirmPassword || '').trim()) {
      return { success: false, error: 'Passwords do not match' };
    }

    const users = this.getUsers();
    if (users.some(u => u.mobile === cleanMobile)) {
      return { success: false, error: 'An account with this mobile number already exists' };
    }
    if (users.some(u => u.username.toLowerCase() === cleanUsername)) {
      return { success: false, error: 'Username is already taken' };
    }

    // Generate initials avatar
    const nameParts = cleanName.split(' ');
    const avatar = nameParts.length > 1 
      ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
      : cleanName.slice(0, 2).toUpperCase();

    const userId = 'YC-' + Math.floor(1000 + Math.random() * 9000);
    const referralCode = cleanUsername.toUpperCase().slice(0, 6) + Math.floor(100 + Math.random() * 900);

    const newUser = {
      id: userId,
      name: cleanName,
      username: cleanUsername,
      mobile: cleanMobile,
      passwordHash: cleanPass.toLowerCase(),
      balance: 1000, // 1000 Welcome Coins
      avatar,
      referralCode,
      referredBy: null,
      friendsCount: 0,
      bonusEarned: 1000,
      createdAt: new Date().toISOString(),
      streakDay: 1,
      lastStreakClaim: null,
      lastDailyBonusClaim: null,
      settings: {
        sound: true,
        notifications: true,
      },
      stats: {
        gamesPlayed: 0,
        wins: 0,
        totalWon: 0,
        totalPlayed: 0,
        biggestWin: 0,
      }
    };

    // Save user
    users.push(newUser);
    storageService.set(USERS_KEY, users);

    // Add welcome bonus transaction
    const welcomeTx = {
      id: 'tx_' + Date.now(),
      userId: newUser.id,
      type: 'bonus',
      title: 'Welcome Bonus',
      description: '1000 free virtual starter coins',
      amount: 1000,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    const allTxs = storageService.get(TRANSACTIONS_KEY, []);
    storageService.set(TRANSACTIONS_KEY, [welcomeTx, ...allTxs]);

    // Auto login
    storageService.set(SESSION_KEY, newUser);

    return { success: true, user: newUser };
  },

  /**
   * Update user profile details
   */
  updateProfile(userId, { name, mobile }) {
    const cleanName = (name || '').trim();
    const cleanMobile = (mobile || '').trim();

    if (!cleanName) return { success: false, error: 'Name cannot be empty' };
    if (!/^\d{10}$/.test(cleanMobile)) {
      return { success: false, error: 'Mobile must be 10 digits' };
    }

    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return { success: false, error: 'User not found' };

    // Check duplicate mobile with another user
    const mobileConflict = users.some(u => u.id !== userId && u.mobile === cleanMobile);
    if (mobileConflict) {
      return { success: false, error: 'Mobile number already used by another account' };
    }

    users[idx].name = cleanName;
    users[idx].mobile = cleanMobile;
    storageService.set(USERS_KEY, users);

    // Sync session if current
    const current = this.getCurrentUser();
    if (current && current.id === userId) {
      storageService.set(SESSION_KEY, users[idx]);
    }

    return { success: true, user: users[idx] };
  },

  /**
   * Change user password
   */
  changePassword(userId, { oldPassword, newPassword, confirmPassword }) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return { success: false, error: 'User not found' };

    const user = users[idx];
    const cleanOld = (oldPassword || '').trim().toLowerCase();
    const cleanNew = (newPassword || '').trim();

    if (user.passwordHash.toLowerCase() !== cleanOld) {
      return { success: false, error: 'Current password is incorrect' };
    }
    if (cleanNew.length < 4) {
      return { success: false, error: 'New password must be at least 4 characters' };
    }
    if (cleanNew !== (confirmPassword || '').trim()) {
      return { success: false, error: 'New passwords do not match' };
    }

    users[idx].passwordHash = cleanNew.toLowerCase();
    storageService.set(USERS_KEY, users);

    // Sync session
    const current = this.getCurrentUser();
    if (current && current.id === userId) {
      storageService.set(SESSION_KEY, users[idx]);
    }

    return { success: true };
  },

  /**
   * Update user settings (sound, notifications)
   */
  updateSettings(userId, newSettings) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx].settings = { ...users[idx].settings, ...newSettings };
      storageService.set(USERS_KEY, users);
      const current = this.getCurrentUser();
      if (current && current.id === userId) {
        storageService.set(SESSION_KEY, users[idx]);
      }
    }
  },

  /**
   * Logout user
   */
  logout() {
    storageService.remove(SESSION_KEY);
    return true;
  }
};
