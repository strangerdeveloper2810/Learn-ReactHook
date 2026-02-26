import type { DiceFace, BetItem } from '@baucua/shared';
import { FACE_IMAGES, DICE_FACE_LABELS, DICE_FACES } from '@baucua/shared';

interface PlayerBet {
  id: string;
  name: string;
  bets: BetItem[];
  totalBet: number;
}

interface HostGameBoardProps {
  bettedPlayers: PlayerBet[];
}

export default function HostGameBoard({ bettedPlayers }: HostGameBoardProps) {
  // Group bets by face
  const betsByFace: Record<DiceFace, { playerName: string; amount: number }[]> = {
    bau: [],
    cua: [],
    tom: [],
    ca: [],
    ga: [],
    nai: [],
  };

  // Populate bets by face
  for (const player of bettedPlayers) {
    for (const bet of player.bets) {
      betsByFace[bet.face].push({
        playerName: player.name,
        amount: bet.amount,
      });
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      {DICE_FACES.map((face) => {
        const faceBets = betsByFace[face as DiceFace];
        const totalOnFace = faceBets.reduce((sum, b) => sum + b.amount, 0);

        return (
          <div
            key={face}
            className={`flex flex-col bg-black/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 border transition-colors ${
              faceBets.length > 0
                ? 'border-amber-400/50 bg-amber-900/20'
                : 'border-white/10'
            }`}
          >
            {/* Face image and label */}
            <div className="flex items-center gap-2 mb-2">
              <img
                src={FACE_IMAGES[face as DiceFace]}
                alt={DICE_FACE_LABELS[face as DiceFace]}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
              />
              <div>
                <p className="text-white font-medium text-sm">
                  {DICE_FACE_LABELS[face as DiceFace]}
                </p>
                {totalOnFace > 0 && (
                  <p className="text-yellow-300 font-bold text-lg">
                    {totalOnFace.toLocaleString()}$
                  </p>
                )}
              </div>
            </div>

            {/* Player bets on this face */}
            {faceBets.length > 0 ? (
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {faceBets.map((bet, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-xs bg-white/10 rounded px-2 py-1"
                  >
                    <span className="text-white/80 truncate max-w-[60%]">
                      {bet.playerName}
                    </span>
                    <span className="text-yellow-300 font-medium">
                      {bet.amount}$
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/30 text-xs text-center py-2">
                Chưa có ai đặt
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
