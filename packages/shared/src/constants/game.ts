import type { DiceFace } from '../types/game';

// Dice faces
export const DICE_FACES: readonly DiceFace[] = ['bau', 'cua', 'tom', 'ca', 'ga', 'nai'];

// Game constants
export const DEFAULT_SCORE = 1000;
export const HOST_SCORE = 10000; // Nhà cái cần nhiều tiền hơn để cover
export const BET_UNIT = 100;
export const BETTING_TIME = 15; // seconds
export const SHAKE_DURATION = 3000; // ms
export const RESULT_DISPLAY_TIME = 3000; // ms

// Room constants
export const ROOM_CODE_LENGTH = 6;
export const MAX_ROOM_IDLE_TIME = 30 * 60 * 1000; // 30 minutes

// Dice count
export const DICE_COUNT = 3;

// Labels
export const DICE_FACE_LABELS: Record<DiceFace, string> = {
  bau: 'Bầu',
  cua: 'Cua',
  tom: 'Tôm',
  ca: 'Cá',
  ga: 'Gà',
  nai: 'Nai',
};
