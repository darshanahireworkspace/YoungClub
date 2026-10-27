/**
 * Mines Game Logic
 * Standard 5x5 grid (25 tiles) with configurable mine count,
 * combinatoric fair multiplier formulas (98% RTP), and grid generation.
 */

export const GRID_SIZE = 25;

/**
 * Generate a randomized 5x5 grid with specified number of mines
 * @param {number} mineCount - between 1 and 24
 */
export function generateMinesGrid(mineCount = 3) {
  const safeMineCount = Math.max(1, Math.min(24, mineCount));
  
  // Create an array with indices [0...24]
  const indices = Array.from({ length: GRID_SIZE }, (_, i) => i);
  
  // Shuffle indices (Fisher-Yates)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Mine indices are the first `safeMineCount` of shuffled indices
  const mineIndices = new Set(indices.slice(0, safeMineCount));

  // Build the 25 cell objects
  return Array.from({ length: GRID_SIZE }, (_, idx) => ({
    id: idx,
    isMine: mineIndices.has(idx),
    revealed: false,
  }));
}

/**
 * Calculate the exact multiplier after revealing `revealedCount` safe gems
 * Using standard combinatorics:
 * P(k safe) = ((25 - m) / 25) * ((24 - m) / 24) * ...
 * Multiplier = 0.98 / P(k safe)
 * @param {number} revealedCount 
 * @param {number} mineCount 
 */
export function calculateMinesMultiplier(revealedCount, mineCount = 3) {
  if (revealedCount <= 0) return 1.00;
  const safeTilesTotal = GRID_SIZE - mineCount;
  if (revealedCount > safeTilesTotal) return 1.00;

  let cumulativeProb = 1.0;
  for (let i = 0; i < revealedCount; i++) {
    cumulativeProb *= (safeTilesTotal - i) / (GRID_SIZE - i);
  }

  // 0.98 RTP (2% house edge)
  const multiplier = 0.98 / cumulativeProb;
  return Number(multiplier.toFixed(2));
}

/**
 * Get the multiplier that will be awarded on the NEXT safe gem
 */
export function calculateNextMinesMultiplier(revealedCount, mineCount = 3) {
  return calculateMinesMultiplier(revealedCount + 1, mineCount);
}
