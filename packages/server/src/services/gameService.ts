import type { Room, BetItem, DiceFace, RoundResult, PlayerRoundResult } from '@baucua/shared';
import { calculateScore, rollDice, validateBets, DICE_FACES, BETTING_TIME } from '@baucua/shared';
import * as roomService from './roomService.js';

export function startRound(room: Room): boolean {
  if (room.state !== 'waiting') {
    return false;
  }

  room.state = 'betting';
  room.currentRound += 1;
  room.countdown = BETTING_TIME;
  room.bets = {};

  return true;
}

export function placeBet(
  room: Room,
  playerId: string,
  bets: BetItem[]
): { success: boolean; error?: string } {
  if (room.state !== 'betting') {
    return { success: false, error: 'Không trong giai đoạn đặt cược' };
  }

  const player = roomService.getPlayer(room, playerId);
  if (!player) {
    return { success: false, error: 'Không tìm thấy người chơi' };
  }

  // Host (nhà cái) không đặt cược
  if (player.isHost) {
    return { success: false, error: 'Nhà cái không đặt cược' };
  }

  const validation = validateBets(bets, player.score);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  room.bets[playerId] = bets;
  return { success: true };
}

export function endBetting(room: Room): void {
  room.state = 'shaking';
  room.countdown = 0;
}

export function shakeDice(room: Room): RoundResult {
  room.state = 'shaking';

  // Roll dice
  const diceResults = rollDice(DICE_FACES as DiceFace[]);

  // Calculate results for each player
  const playerResults: PlayerRoundResult[] = [];
  let totalHostChange = 0; // Track host's win/loss

  for (const player of room.players) {
    // Host không chơi
    if (player.isHost) continue;

    const playerBets = room.bets[player.id] || [];
    const totalBet = playerBets.reduce((sum, b) => sum + b.amount, 0);

    if (totalBet === 0) {
      // Không đặt cược
      playerResults.push({
        playerId: player.id,
        name: player.name,
        bets: [],
        winAmount: 0,
        newScore: player.score,
      });
      continue;
    }

    const winAmount = calculateScore(playerBets, diceResults);
    const newScore = player.score + winAmount;

    // Update player score
    roomService.updatePlayerScore(room, player.id, newScore);

    // Host loses what player wins (and vice versa)
    totalHostChange -= winAmount;

    playerResults.push({
      playerId: player.id,
      name: player.name,
      bets: playerBets,
      winAmount,
      newScore,
    });
  }

  // Update host score
  const host = room.players.find((p) => p.isHost);
  if (host) {
    const newHostScore = host.score + totalHostChange;
    roomService.updatePlayerScore(room, host.id, newHostScore);

    // Add host result to playerResults for display
    playerResults.push({
      playerId: host.id,
      name: host.name,
      bets: [],
      winAmount: totalHostChange,
      newScore: newHostScore,
    });
  }

  const result: RoundResult = {
    roundNumber: room.currentRound,
    diceResults,
    playerResults,
    timestamp: Date.now(),
  };

  room.state = 'result';

  return result;
}

export function finishRound(room: Room): void {
  roomService.resetRoomForNewRound(room);
}

export function decrementCountdown(room: Room): number {
  if (room.countdown > 0) {
    room.countdown -= 1;
  }
  return room.countdown;
}
