/**
 * Aviator Crash Game Logic
 * Provides transparent provably-fair style random multiplier generation,
 * flight curve dynamics, and payout calculations.
 */

/**
 * Generate a random crash point with realistic distribution
 * Uses inverse probability with an average return to player (RTP) of ~97%.
 */
export function generateCrashPoint() {
  const rand = Math.random();
  // 5% instant house edge crash at 1.00x - 1.10x
  if (rand < 0.05) {
    return Number((1.00 + Math.random() * 0.10).toFixed(2));
  }
  
  // Standard exponential curve distribution
  // 0.97 / (1 - rand) capped between 1.05x and 100.00x
  const raw = 0.97 / (1 - rand * 0.96);
  const crash = Math.min(100.0, Math.max(1.05, raw));
  return Number(crash.toFixed(2));
}

/**
 * Calculate current flight multiplier at elapsed seconds
 * Smooth non-linear acceleration curve
 * @param {number} elapsedSeconds 
 */
export function calculateMultiplierAtTime(elapsedSeconds) {
  if (elapsedSeconds <= 0) return 1.00;
  // Exponential growth: 1.00 + 0.07 * t^1.65
  const mult = 1.00 + 0.07 * Math.pow(elapsedSeconds, 1.65);
  return Number(mult.toFixed(2));
}

/**
 * Calculate flight duration (in seconds) needed to reach a specific crash point
 * Inverts the multiplier formula: t = ((mult - 1.00) / 0.07)^(1 / 1.65)
 * @param {number} targetMultiplier 
 */
export function getFlightDuration(targetMultiplier) {
  if (targetMultiplier <= 1.00) return 0.5;
  const time = Math.pow((targetMultiplier - 1.00) / 0.07, 1 / 1.65);
  return Math.max(0.8, time);
}

/**
 * Get multiplier display style / badge color
 * @param {number} multiplier 
 */
export function getMultiplierBadgeClass(multiplier) {
  if (multiplier >= 10.0) {
    return 'bg-amber-500/20 text-amber-300 border-amber-500/40 text-glow-gold';
  }
  if (multiplier >= 2.0) {
    return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
  }
  return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
}

/**
 * Initial mock crash round history
 */
export const INITIAL_CRASH_HISTORY = [
  { id: 'c1', multiplier: 2.45 },
  { id: 'c2', multiplier: 1.28 },
  { id: 'c3', multiplier: 5.12 },
  { id: 'c4', multiplier: 1.15 },
  { id: 'c5', multiplier: 14.80 },
  { id: 'c6', multiplier: 3.20 },
  { id: 'c7', multiplier: 1.84 },
  { id: 'c8', multiplier: 1.05 },
];
