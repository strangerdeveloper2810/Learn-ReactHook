import type { RoundResult, DiceFace } from '@baucua/shared';
import { FACE_IMAGES, DICE_FACE_LABELS } from '@baucua/shared';

interface DiceResultProps {
  result: RoundResult;
  myPlayerId: string;
}

export default function DiceResult({ result, myPlayerId }: DiceResultProps) {
  const myResult = result.playerResults.find((r) => r.playerId === myPlayerId);

  return (
    <div className="text-center py-4">
      {/* Dice images */}
      <div className="flex justify-center gap-4 mb-4">
        {result.diceResults.map((face, i) => (
          <div
            key={i}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg shadow-lg p-1 animate-[bounce_0.5s_ease-out]"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <img
              src={FACE_IMAGES[face]}
              alt={DICE_FACE_LABELS[face]}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Result text */}
      <div className="mb-4">
        <p className="text-white/60 text-sm">Kết quả:</p>
        <p className="text-white text-lg font-bold">
          {result.diceResults.map((f) => DICE_FACE_LABELS[f]).join(' - ')}
        </p>
      </div>

      {/* My result */}
      {myResult && (
        <div
          className={`inline-block px-6 py-3 rounded-xl ${
            myResult.winAmount > 0
              ? 'bg-emerald-500/30 border border-emerald-400'
              : myResult.winAmount < 0
              ? 'bg-red-500/30 border border-red-400'
              : 'bg-amber-500/30 border border-amber-400'
          }`}
        >
          <p className="text-white text-sm">
            {myResult.winAmount > 0
              ? 'Bạn thắng!'
              : myResult.winAmount < 0
              ? 'Bạn thua!'
              : 'Huề!'}
          </p>
          <p
            className={`text-2xl font-bold ${
              myResult.winAmount > 0
                ? 'text-emerald-400'
                : myResult.winAmount < 0
                ? 'text-red-400'
                : 'text-amber-400'
            }`}
          >
            {myResult.winAmount > 0 ? '+' : ''}
            {myResult.winAmount.toLocaleString()}$
          </p>
        </div>
      )}
    </div>
  );
}
