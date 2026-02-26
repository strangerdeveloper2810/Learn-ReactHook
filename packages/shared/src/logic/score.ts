import type { BetItem, DiceFace } from '../types/game';

/**
 * Tính điểm thắng/thua cho 1 player dựa trên bets và kết quả xúc xắc
 *
 * Luật chơi:
 * - Mỗi mặt xúc xắc khớp với bet → trả lại tiền cược + tiền thưởng = bet * matchCount
 * - Không khớp → mất tiền cược
 *
 * Ví dụ: Đặt 200 vào "cua", xúc xắc ra 2 con cua
 * → Thắng: 200 (trả lại) + 200 * 2 (thưởng) = 600
 * → Net win: 600 - 200 = 400
 *
 * @returns net winAmount (+ nếu thắng, - nếu thua, 0 nếu huề)
 */
export function calculateScore(
  bets: BetItem[],
  diceResults: [DiceFace, DiceFace, DiceFace]
): number {
  let totalBet = 0;
  let totalReturn = 0;

  for (const bet of bets) {
    if (bet.amount <= 0) continue;

    totalBet += bet.amount;

    const matchCount = diceResults.filter((d) => d === bet.face).length;

    if (matchCount > 0) {
      // Trả lại tiền cược + thưởng theo số lần khớp
      totalReturn += bet.amount + bet.amount * matchCount;
    }
    // Không khớp → mất tiền cược (không cộng gì)
  }

  // Net = tổng nhận được - tổng đã đặt
  return totalReturn - totalBet;
}

/**
 * Roll ngẫu nhiên 3 con xúc xắc
 */
export function rollDice(faces: DiceFace[]): [DiceFace, DiceFace, DiceFace] {
  const roll = (): DiceFace => faces[Math.floor(Math.random() * faces.length)];
  return [roll(), roll(), roll()];
}

/**
 * Validate bets - check xem bets có hợp lệ không
 */
export function validateBets(bets: BetItem[], availableScore: number): {
  valid: boolean;
  error?: string;
} {
  const totalBet = bets.reduce((sum, b) => sum + b.amount, 0);

  if (totalBet <= 0) {
    return { valid: false, error: 'Bạn chưa đặt cược' };
  }

  if (totalBet > availableScore) {
    return { valid: false, error: 'Không đủ điểm để đặt cược' };
  }

  if (bets.some((b) => b.amount < 0)) {
    return { valid: false, error: 'Số tiền cược không hợp lệ' };
  }

  return { valid: true };
}
