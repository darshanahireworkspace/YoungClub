/**
 * Color Prediction Game Logic
 * Simulates standard 30-second color prediction rounds with
 * Red, Green, Violet, and Numbers 0-9.
 */

export const COLOR_CONFIG = {
  green: {
    name: 'Green',
    color: '#10b981',
    bgClass: 'bg-emerald-600 hover:bg-emerald-500 shadow-glow-green',
    payout: 2.0,
    numbers: [1, 3, 7, 9],
    splitNumber: 5,
  },
  violet: {
    name: 'Violet',
    color: '#a855f7',
    bgClass: 'bg-purple-600 hover:bg-purple-500 shadow-glow-purple',
    payout: 4.5,
    numbers: [0, 5],
  },
  red: {
    name: 'Red',
    color: '#f43f5e',
    bgClass: 'bg-rose-600 hover:bg-rose-500 shadow-glow-magenta',
    payout: 2.0,
    numbers: [2, 4, 6, 8],
    splitNumber: 0,
  }
};

/**
 * Generate a random round outcome (number 0 to 9)
 * and resolve its winning colors.
 */
export function generateColorRoundOutcome() {
  const number = Math.floor(Math.random() * 10);
  let colors = [];

  if (number === 0) {
    colors = ['violet', 'red'];
  } else if (number === 5) {
    colors = ['violet', 'green'];
  } else if ([1, 3, 7, 9].includes(number)) {
    colors = ['green'];
  } else {
    colors = ['red'];
  }

  return {
    number,
    colors,
    primaryColor: colors[0],
    isSplit: colors.length > 1
  };
}

/**
 * Calculate winnings for an array of placed bets against the outcome
 * @param {Array} bets - e.g. [{ type: 'color', choice: 'green', amount: 100 }, { type: 'number', choice: 7, amount: 50 }]
 * @param {Object} outcome - from generateColorRoundOutcome()
 */
export function calculateColorRoundWinnings(bets, outcome) {
  let totalWon = 0;
  const itemResults = [];

  bets.forEach(bet => {
    let won = false;
    let payoutMult = 0;
    let winAmount = 0;

    if (bet.type === 'color') {
      if (outcome.colors.includes(bet.choice)) {
        won = true;
        // If it's a split number (0 or 5), pure color bet gets 1.5x, Violet gets 4.5x
        if (outcome.isSplit && bet.choice !== 'violet') {
          payoutMult = 1.5;
        } else if (bet.choice === 'violet') {
          payoutMult = 4.5;
        } else {
          payoutMult = 2.0;
        }
        winAmount = Math.round(bet.amount * payoutMult);
      }
    } else if (bet.type === 'number') {
      if (Number(bet.choice) === outcome.number) {
        won = true;
        payoutMult = 9.0;
        winAmount = Math.round(bet.amount * payoutMult);
      }
    }

    if (won) {
      totalWon += winAmount;
    }

    itemResults.push({
      ...bet,
      won,
      payoutMult,
      winAmount
    });
  });

  return {
    totalWon,
    itemResults
  };
}

/**
 * Initial historical results
 */
export const INITIAL_COLOR_HISTORY = [
  { period: '20261027101', number: 7, colors: ['green'] },
  { period: '20261027102', number: 2, colors: ['red'] },
  { period: '20261027103', number: 0, colors: ['violet', 'red'] },
  { period: '20261027104', number: 9, colors: ['green'] },
  { period: '20261027105', number: 4, colors: ['red'] },
  { period: '20261027106', number: 5, colors: ['violet', 'green'] },
  { period: '20261027107', number: 3, colors: ['green'] },
  { period: '20261027108', number: 8, colors: ['red'] },
  { period: '20261027109', number: 1, colors: ['green'] },
  { period: '20261027110', number: 6, colors: ['red'] },
];
