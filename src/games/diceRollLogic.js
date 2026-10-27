/**
 * Dice Roll Game Logic
 * Provides Over/Under target slider, probability calculations,
 * and random outcome generation with 98% Return To Player (RTP).
 */

/**
 * Calculate win probability percentage based on target and mode
 * @param {number} target - between 2 and 98
 * @param {'under'|'over'} mode 
 */
export function calculateDiceWinChance(target, mode) {
  if (mode === 'under') {
    // Rolling strictly below target: e.g. target 50 means range [0.00, 49.99] => ~50%
    return Math.max(1, Math.min(98, target - 1));
  } else {
    // Rolling strictly above target: e.g. target 50 means range [50.01, 100.00] => ~50%
    return Math.max(1, Math.min(98, 100 - target));
  }
}

/**
 * Calculate multiplier based on win chance
 * Uses a 2% house edge (98% RTP) standard in gaming platforms.
 * @param {number} winChancePercent 
 */
export function calculateDiceMultiplier(winChancePercent) {
  if (winChancePercent <= 0) return 1.01;
  const mult = 98 / winChancePercent;
  return Number(mult.toFixed(2));
}

/**
 * Generate a random dice roll outcome between 0.00 and 100.00
 */
export function rollDice() {
  const random = Math.random() * 100;
  return Number(random.toFixed(2));
}

/**
 * Check if the roll was a win
 * @param {number} rollResult 
 * @param {number} target 
 * @param {'under'|'over'} mode 
 */
export function checkDiceWin(rollResult, target, mode) {
  if (mode === 'under') {
    return rollResult < target;
  } else {
    return rollResult > target;
  }
}

/**
 * Initial recent roll history
 */
export const INITIAL_DICE_HISTORY = [
  { roll: 42.15, target: 50, mode: 'under', won: true, multiplier: 2.0 },
  { roll: 88.40, target: 50, mode: 'over', won: true, multiplier: 2.0 },
  { roll: 67.22, target: 50, mode: 'under', won: false, multiplier: 2.0 },
  { roll: 12.05, target: 25, mode: 'under', won: true, multiplier: 4.08 },
  { roll: 79.91, target: 70, mode: 'over', won: true, multiplier: 3.26 },
];
