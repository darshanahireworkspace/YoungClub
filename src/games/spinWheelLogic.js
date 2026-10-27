/**
 * Spin Wheel Game Logic
 * Computes wheel slices, rotation physics, target stop angles, and payouts.
 */

export const WHEEL_SEGMENTS = [
  { id: 0, label: '0x', multiplier: 0, color: '#1e293b', text: '#94a3b8', description: 'Better luck next time' },
  { id: 1, label: '1.2x', multiplier: 1.2, color: '#06b6d4', text: '#ffffff', description: 'Nice return!' },
  { id: 2, label: '2.0x', multiplier: 2.0, color: '#8b5cf6', text: '#ffffff', description: 'Double Win!' },
  { id: 3, label: '0.5x', multiplier: 0.5, color: '#3b82f6', text: '#ffffff', description: '50% Back' },
  { id: 4, label: '3.0x', multiplier: 3.0, color: '#f59e0b', text: '#ffffff', description: 'Triple Treat!' },
  { id: 5, label: '1.5x', multiplier: 1.5, color: '#10b981', text: '#ffffff', description: '1.5x Boost!' },
  { id: 6, label: '5.0x', multiplier: 5.0, color: '#ec4899', text: '#ffffff', description: 'Mega Win!' },
  { id: 7, label: '10.0x', multiplier: 10.0, color: '#eab308', text: '#000000', description: 'Jackpot Crown!' },
];

/**
 * Weighted random segment picker
 * High payouts have lower probability, smaller payouts have higher probability.
 */
export function pickRandomSegment() {
  const weights = [
    { id: 0, weight: 15 }, // 0x
    { id: 1, weight: 25 }, // 1.2x
    { id: 2, weight: 20 }, // 2.0x
    { id: 3, weight: 15 }, // 0.5x
    { id: 4, weight: 10 }, // 3.0x
    { id: 5, weight: 10 }, // 1.5x
    { id: 6, weight: 4 },  // 5.0x
    { id: 7, weight: 1 },  // 10.0x Jackpot
  ];

  const totalWeight = weights.reduce((acc, cur) => acc + cur.weight, 0);
  let random = Math.random() * totalWeight;

  for (const item of weights) {
    if (random < item.weight) {
      return WHEEL_SEGMENTS.find(s => s.id === item.id);
    }
    random -= item.weight;
  }

  return WHEEL_SEGMENTS[0];
}

/**
 * Compute the stopping rotation angle (in degrees) for a target segment
 * Slices are 45 degrees wide (360 / 8).
 * The pointer is at the very top (270 degrees in SVG coordinate or 0 with offset).
 * @param {number} segmentIndex 
 * @param {number} currentRotation 
 * @param {number} spins 
 */
export function calculateWheelStopAngle(segmentIndex, currentRotation = 0, spins = 5) {
  const segmentCount = WHEEL_SEGMENTS.length;
  const segmentAngle = 360 / segmentCount; // 45 deg

  // Top pointer alignment:
  // Segment 0 center is at [0, 45] deg.
  // To align segment center with top pointer (270 deg or 0 deg indicator):
  const segmentCenter = segmentIndex * segmentAngle + (segmentAngle / 2);
  const targetOffset = 360 - segmentCenter;

  // Add multiple full 360-degree spins for excitement
  const baseSpins = 360 * spins;
  const normalizedCurrent = currentRotation % 360;
  const extraNeeded = (targetOffset - normalizedCurrent + 360) % 360;

  return currentRotation + baseSpins + extraNeeded;
}
