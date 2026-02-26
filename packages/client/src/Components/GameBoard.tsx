import type { DiceFace } from '@baucua/shared';
import { FACE_IMAGES, DICE_FACE_LABELS } from '@baucua/shared';

interface BetState {
  face: DiceFace;
  amount: number;
}

interface GameBoardProps {
  bets: BetState[];
  onIncrease: (face: DiceFace) => void;
  onDecrease: (face: DiceFace) => void;
  disabled?: boolean;
}

export default function GameBoard({
  bets,
  onIncrease,
  onDecrease,
  disabled = false,
}: GameBoardProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      {bets.map((bet) => (
        <div
          key={bet.face}
          className="flex flex-col items-center bg-black/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-white/10 hover:border-yellow-400/30 transition-colors"
        >
          <img
            src={FACE_IMAGES[bet.face]}
            alt={DICE_FACE_LABELS[bet.face]}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
          />

          <p className="text-white/60 text-xs mt-1">
            {DICE_FACE_LABELS[bet.face]}
          </p>

          <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 sm:gap-2">
            <button
              className={`text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-colors text-base sm:text-lg font-bold leading-none ${
                disabled
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-400 cursor-pointer'
              }`}
              onClick={() => onIncrease(bet.face)}
              disabled={disabled}
            >
              +
            </button>
            <span className="text-yellow-300 text-lg sm:text-xl font-bold min-w-[3ch] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {bet.amount}
            </span>
            <button
              className={`text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-colors text-base sm:text-lg font-bold leading-none ${
                disabled
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-400 cursor-pointer'
              }`}
              onClick={() => onDecrease(bet.face)}
              disabled={disabled}
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
