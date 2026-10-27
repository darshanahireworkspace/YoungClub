# 🎮 Young Club — Free-to-Play Virtual Gaming Platform

> **Portfolio & Learning Project**  
> **Notice:** 100% Virtual Coins Only &bull; Zero Real Money &bull; No Payment Gateways &bull; No Withdrawals

Young Club is a modern, mobile-first web application designed and built as a gaming platform UI showcase and frontend architecture learning project. It features 5 fully functional virtual games with transparent client-side mathematical logic, persistent state management in `localStorage`, Web Audio API sound synthesis, and interactive bonus systems.

---

## ⚡ Tech Stack

- **Frontend Core**: React 19 + Vite
- **Styling**: Tailwind CSS with custom neon dark gaming design tokens and glassmorphism
- **Routing**: React Router (`HashRouter` for universal hosting compatibility)
- **Animations**: Framer Motion & Canvas Confetti
- **Icons**: Lucide React
- **Sound Effects**: Procedural Web Audio API sound synthesizer (zero external audio file dependencies)
- **State & Storage**: React Context API (`AuthContext`, `WalletContext`, `SoundContext`, `ToastContext`) + structured LocalStorage service layer

---

## 🎨 Design System

Young Club features a custom-engineered mobile gaming design system inspired by top Indian entertainment and gaming applications (WinZO, MPL, Dream11). It achieves a bold, high-contrast, electric game-lobby aesthetic while maintaining clean readability, tactile micro-interactions, and 60fps performance.

### 1. Color Palette & Neon Glows

| Token | Hex / Gradient | Purpose |
| :--- | :--- | :--- |
| **Canvas Background** | `#0B0F1E` | Deep navy-black with subtle radial ambient glow orbs |
| **Card / Surface** | `#12172B` (with `rgba(255,255,255,0.08)` border) | Elevated glassmorphism surfaces with soft inner glows |
| **Primary Gradient** | `#7C3AED` &rarr; `#EC4899` | Main CTA buttons, active state indicators, branded headers |
| **Gold Currency Gradient**| `#FFC83D` &rarr; `#FF8A00` | Virtual coin chips, balance counters, VIP badges, rewards |
| **Success Emerald** | `#22C55E` | Cash out triggers, positive balances, winning rounds |
| **Danger Crimson** | `#EF4444` | Crash explosions, mine detonators, logout triggers |
| **Electric Violet** | `#8B5CF6` | Secondary accents, prediction tiles, game borders |

### 2. Typography Rules

The typography hierarchy strictly separates human-readable text from high-intensity gaming numerals:
- **Body & Interface**: `Poppins` (Google Fonts) &bull; Clean, geometric, modern sans-serif with excellent legibility on compact mobile screens.
- **Game Numerals & Timers**: `Rajdhani` (Google Fonts) &bull; Condensed, squared numbers providing high-contrast readouts for multipliers, countdowns, and coin balances.
- **High-Impact Multipliers**: `Orbitron` (Google Fonts) &bull; Sci-fi futuristic display font reserved strictly for Aviator flight multipliers and jackpot reels.

### 3. Reusable UI Component Library (`src/components/ui/`)

All UI elements are organized into modular, presentational components with zero business logic leakage:

1. **`<Logo />`**: Custom inline SVG wordmark with stylized lightning-controller crown shield in `full`, `icon-only`, and `small` variants.
2. **`<Button />`**: Tactile interactive buttons with `primary`, `gold`, `outline`, `ghost`, `danger`, and `success` themes featuring `whileTap={{ scale: 0.97 }}` haptic press simulation.
3. **`<Card />`**: Elevated glassmorphic container with 16px radius (`rounded-2xl`), subtle white-alpha borders, and soft inner lighting.
4. **`<Input />`**: Neon focus-ring input field supporting leading icons, trailing password show/hide eye, and inline validation states.
5. **`<Modal />`**: Centered spring-animated overlay modal with glass backdrop blur and exit animations.
6. **`<BottomSheet />`**: Mobile slide-up sheet with native touch grab handle for quick checkout and action menus.
7. **`<Chip />`**: Compact selectable chip for quick bet steppers (`10`, `50`, `100`, `500`) and transaction category filters.
8. **`<Toggle />`**: iOS/Gaming-style animated toggle switch with glowing active track.
9. **`<GameCard />`**: High-impact card component supporting both full-width hero layout (Aviator) and 2-column lobby grid.
10. **`<BalanceChip />`**: Pill-shaped gold coin chip displaying live balances with Rajdhani font.
11. **`<Toast />`**: Floating notification item with green/red/purple status indicators and auto-dismissal.

### 4. Layout & Mobile-First Container

- **Viewport**: Mobile-first architecture locked to `max-w-[480px]` centered on desktop screens.
- **Ambient Desktop Backdrop**: On wide viewports (`> 1024px`), ambient blurred purple and magenta orbs create an immersive theater experience.
- **Resilience**: Zero external image URL dependencies; all art is generated via inline SVG, CSS gradients, Canvas, and Lucide React vectors.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```

---

## 🔑 Pre-Seeded Demo Account

The application comes pre-configured with a ready-to-test demo account:

- **Name**: `Nikhil Shinde`
- **Mobile / Username**: `7620349985`
- **Password**: `Nikhil Shinde 2006` *(accepts case-insensitive: `nikhil shinde 2006`)*
- **Starting Balance**: `5,000` Virtual Coins
- **Pre-Loaded History**: Sample transaction ledger with wins, bonuses, and bets.

> 💡 **Tip:** You can also click the prominent **"Use Demo Login"** button on the Login page or **"Instant Demo Access"** on the Landing page to log in instantly.

---

## 🎲 The 5 Virtual Games

All games feature customizable bet selectors (10, 50, 100, 500 chips, 1/2, 2x, Max), balance deduction on placement, automatic win calculation, sound effects, and transaction ledger updates.

### 1. Aviator-Style Crash (`src/games/crashLogic.js` & `src/pages/games/CrashGamePage.jsx`)
- **Gameplay**: Multiplier climbs exponentially on an HTML5 canvas curve as the plane flies higher. Players can tap "Cash Out" at any time before the rocket crashes to lock in `Bet × Multiplier`.
- **Logic**: Random crash points are generated with an inverse probability formula (`RTP ~ 97%`), including occasional instant crashes and high multiplier runs up to 100x.
- **Features**: Live round history strip, auto-cashout target setting, and explosion sound effects.

### 2. Color Prediction (`src/games/colorPredictionLogic.js` & `src/pages/games/ColorGamePage.jsx`)
- **Gameplay**: 30-second continuous countdown rounds. Players bet on **Green** (2.0x), **Red** (2.0x), **Violet** (4.5x), or exact **Numbers 0–9** (9.0x).
- **Logic**: Outcome numbers `0–9` map to color distributions (0 = Red+Violet, 5 = Green+Violet, odd = Green, even = Red).
- **Features**: Real-time timer, 5-second lock period, animated result reveal card, and last-10 rounds history table.

### 3. Spin Wheel (`src/games/spinWheelLogic.js` & `src/pages/games/SpinWheelPage.jsx`)
- **Gameplay**: High-action 8-segment wheel with multipliers: `0x`, `0.5x`, `1.2x`, `1.5x`, `2.0x`, `3.0x`, `5.0x`, and `10.0x Jackpot Crown`.
- **Logic**: Physics-based deceleration rotation with target stopping angles dynamically calculated to land precisely under the top pointer.
- **Features**: Wheel spin ratchet ticks, celebratory confetti on wins, and instant wallet balance updates.

### 4. Dice Roll (`src/games/diceRollLogic.js` & `src/pages/games/DiceGamePage.jsx`)
- **Gameplay**: Players choose to roll **Under** or **Over** a target number between 2 and 98.
- **Logic**: Dynamic calculation of exact win chance % and payout multiplier based on standard `98% Return To Player (RTP)`.
- **Features**: Interactive target slider, 3D dice roll scramble animation, and recent rolls strip.

### 5. Mines Tactical (`src/games/minesLogic.js` & `src/pages/games/MinesGamePage.jsx`)
- **Gameplay**: 5x5 grid (25 tiles). The player selects the number of hidden bombs (1 to 24, default 3).
- **Logic**: Combinatoric probability formula dynamically calculates rising multipliers for each consecutive safe diamond revealed:  
  `P(k safe) = ((25 - m) / 25) * ((24 - m) / 24) * ...`  
  `Multiplier = 0.98 / P(k safe)`
- **Features**: Next-tile payout preview, cash out anytime, explosion sound on mine hit with board reveal.

---

## 🎁 Bonuses & Referral System

1. **Welcome Bonus**: +1,000 free coins automatically awarded upon creating an account.
2. **24-Hour Daily Bonus**: +100 coins claimable once every 24 hours with an active real-time countdown timer.
3. **7-Day Daily Check-in Streak**: Progressive rewards from Day 1 (+50) to Day 7 (+500 Mega Chest).
4. **Weekend Bonanza**: Instant +500 promotional coin pack.
5. **Refer & Earn**:
   - Unique referral code and share links (WhatsApp, Telegram, and Web Share API).
   - Milestone progress bar (5 friends = 500 bonus, 10 friends = 1,500 bonus, 25 friends = 5,000 bonus).
   - **"Simulate Friend Joined" button**: Allows instant testing of referral credits (+200 coins per friend) and milestone advancement without needing external users.

---

## 💳 Simulated Wallet Architecture

- **Zero Real Money**: Clearly labeled practice demo wallet.
- **Instant Demo Recharge**: Recharge options (+200, +300, +500, +1,000, or custom amount) with simulated checkout processing animation.
- **Complete Ledger**: Categorized transaction history with filter tabs:
  - `All`
  - `Recharges`
  - `Wins`
  - `Bets`
  - `Bonuses`
- **Summary Cards**: Track Lifetime Won, Total Played, and Total Bonus Coins earned.

---

## 📁 Project Structure

```
YoungClub/
├── public/                  # Static assets & icons
├── src/
│   ├── components/
│   │   ├── common/          # Header, BottomNav, DisclaimerBanner, BetSelector, Modals, Toasts
│   │   ├── home/            # PromoCarousel, DailyBonusCard, RecentWinnersTicker, GameCard
│   │   ├── refer/           # ReferralCodeCard, MilestoneProgress, OffersSection, FriendsList
│   │   ├── wallet/          # BalanceCard, WalletSummary, TransactionHistory
│   │   └── account/         # ProfileHeader, GameStatsGrid, SettingsSection, FAQAccordion
│   ├── context/
│   │   ├── AuthContext.jsx   # Session, login, register, profile update, demo seed
│   │   ├── WalletContext.jsx # Live balance, bet deductions, win credits, bonuses
│   │   ├── SoundContext.jsx  # Global audio toggle and sound triggers
│   │   └── ToastContext.jsx  # Animated notification toasts
│   ├── games/
│   │   ├── crashLogic.js           # Multiplier flight curve & random crash generator
│   │   ├── colorPredictionLogic.js # 30s round timer, color matching, and payouts
│   │   ├── spinWheelLogic.js       # Slices, deceleration angles, weighted picks
│   │   ├── diceRollLogic.js        # Over/Under odds math & roll simulation
│   │   └── minesLogic.js           # 5x5 grid generation & combinatoric multipliers
│   ├── pages/
│   │   ├── LandingPage.jsx         # Public landing with game previews & CTAs
│   │   ├── LoginPage.jsx           # Login with One-Click Demo button
│   │   ├── RegisterPage.jsx        # Registration with 1,000 welcome coins
│   │   ├── HomePage.jsx            # Main dashboard & games list
│   │   ├── ReferEarnPage.jsx       # Referrals, streak calendar, friends
│   │   ├── WalletPage.jsx          # Balance & transaction ledger
│   │   ├── AccountPage.jsx         # Profile, stats, settings, FAQs, About
│   │   └── games/
│   │       ├── CrashGamePage.jsx
│   │       ├── ColorGamePage.jsx
│   │       ├── SpinWheelPage.jsx
│   │       ├── DiceGamePage.jsx
│   │       └── MinesGamePage.jsx
│   ├── services/
│   │   ├── storageService.js       # Safe localStorage wrapper with youngclub_ prefix
│   │   ├── mockData.js             # Initial seeds (Nikhil Shinde, promos, FAQs)
│   │   ├── authService.js          # Authentication business logic & validations
│   │   ├── walletService.js        # Balance math & transaction records
│   │   └── soundService.js         # Web Audio API sound synthesizer
│   ├── App.jsx                     # HashRouter, protected routes, mobile-first shell
│   ├── index.css                   # Tailwind styles, glassmorphism, glow utilities
│   └── main.jsx                    # Root application entry with Providers
├── index.html                      # HTML5 template with Outfit & Inter typography
├── package.json                    # Dependencies & build scripts
├── tailwind.config.js              # Dark gaming theme & neon color tokens
└── README.md                       # Documentation
```

---

## 🛡️ License & Disclaimer

Young Club is developed exclusively as a **free educational UI showcase and learning project**. It contains no gambling features, no real money exchange, no deposits, and no withdrawals. All tokens are simulated virtual practice coins.
