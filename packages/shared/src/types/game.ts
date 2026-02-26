// 6 mặt xúc xắc
export type DiceFace = 'bau' | 'cua' | 'tom' | 'ca' | 'ga' | 'nai';

// Item đặt cược
export interface BetItem {
  face: DiceFace;
  amount: number; // bội số của 100
}

// Kết quả của 1 player sau round
export interface PlayerRoundResult {
  playerId: string;
  name: string;
  bets: BetItem[];
  winAmount: number; // + nếu thắng, - nếu thua, 0 nếu huề
  newScore: number;
}

// Kết quả round
export interface RoundResult {
  roundNumber: number;
  diceResults: [DiceFace, DiceFace, DiceFace];
  playerResults: PlayerRoundResult[];
  timestamp: number;
}

// Mapping face -> image path (dùng ở client)
export const FACE_IMAGES: Record<DiceFace, string> = {
  bau: '/gameBauCua/bau.png',
  cua: '/gameBauCua/cua.png',
  tom: '/gameBauCua/tom.png',
  ca: '/gameBauCua/ca.png',
  ga: '/gameBauCua/ga.png',
  nai: '/gameBauCua/nai.png',
};
