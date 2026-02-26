import type { Player, RoundResult } from '@baucua/shared';

interface PlayerListProps {
  players: Player[];
  myId: string;
  roundResult?: RoundResult | null;
}

export default function PlayerList({
  players,
  myId,
  roundResult,
}: PlayerListProps) {
  return (
    <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10">
        <h3 className="text-white font-bold flex items-center gap-2">
          <span>👥</span>
          Người chơi
        </h3>
      </div>

      <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
        {players.map((player) => {
          const result = roundResult?.playerResults.find(
            (r) => r.playerId === player.id
          );

          return (
            <div
              key={player.id}
              className={`flex items-center justify-between p-2 rounded-lg ${
                player.isHost
                  ? 'bg-amber-500/20'
                  : result
                  ? result.winAmount > 0
                    ? 'bg-emerald-500/20'
                    : result.winAmount < 0
                    ? 'bg-red-500/20'
                    : 'bg-white/5'
                  : 'bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {player.isHost ? '👑' : '🎮'}
                </span>
                <div>
                  <p className="text-white text-sm font-medium">
                    {player.name}
                    {player.id === myId && (
                      <span className="text-amber-400 text-xs ml-1">(bạn)</span>
                    )}
                  </p>
                  {result && result.winAmount !== 0 && (
                    <p
                      className={`text-xs ${
                        result.winAmount > 0
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    >
                      {result.winAmount > 0 ? '+' : ''}
                      {result.winAmount.toLocaleString()}$
                    </p>
                  )}
                </div>
              </div>
              <span className="text-yellow-400 font-bold text-sm">
                {player.score.toLocaleString()}$
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
