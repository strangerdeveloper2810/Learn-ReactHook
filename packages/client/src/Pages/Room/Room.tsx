import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSocket } from '../../socket/useSocket';
import { useRoomStore } from '../../store/useRoomStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useGameStore } from '../../store/useGameStore';
import { getSocket } from '../../socket/client';
import '../../assets/CSS/ExGame.css';

export default function Room() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const room = useRoomStore((s) => s.room);
  const error = useRoomStore((s) => s.error);
  const gameState = useGameStore((s) => s.gameState);

  const { leaveRoom, startRound } = useSocket();
  const socket = getSocket();

  const isHost = room?.hostId === socket.id;

  // Redirect to game when round starts
  useEffect(() => {
    if (gameState === 'betting' || gameState === 'shaking' || gameState === 'result') {
      navigate(`/game/${code}`);
    }
  }, [gameState, code, navigate]);

  // If no room, redirect to lobby
  useEffect(() => {
    if (!room && !error) {
      navigate('/lobby');
    }
  }, [room, error, navigate]);

  const handleLeave = () => {
    leaveRoom();
    navigate('/lobby');
  };

  const handleCopyCode = () => {
    if (room?.code) {
      navigator.clipboard.writeText(room.code);
    }
  };

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center" id="exGame">
        <div className="text-white text-center">
          {error ? (
            <>
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={() => navigate('/lobby')}
                className="px-4 py-2 bg-amber-500 rounded-lg"
              >
                Quay lại Lobby
              </button>
            </>
          ) : (
            <p>Đang tải...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" id="exGame">
      <div className="w-full max-w-lg">
        {/* Room code card */}
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-amber-400/50 overflow-hidden mb-4 shadow-2xl">
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

          <div className="p-6 text-center">
            <p className="text-gray-300 text-sm mb-2 font-medium drop-shadow-lg">Mã phòng</p>
            <button
              onClick={handleCopyCode}
              className="text-4xl sm:text-5xl font-bold text-amber-400 tracking-[0.3em] hover:text-amber-300 transition-colors cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              title="Click để copy"
            >
              {room.code}
            </button>
            <p className="text-gray-400 text-xs mt-2 drop-shadow-lg">Click để copy</p>
          </div>
        </div>

        {/* Players list */}
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden mb-4 shadow-2xl">
          <div className="px-6 py-4 border-b border-white/20 bg-black/40">
            <h2 className="text-white font-bold flex items-center gap-2 drop-shadow-lg">
              <span>👥</span>
              Người chơi ({room.players.length})
            </h2>
          </div>

          <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
            {room.players.map((player) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  player.isHost
                    ? 'bg-amber-600/40 border border-amber-400/50'
                    : 'bg-white/10 border border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl drop-shadow-lg">
                    {player.isHost ? '👑' : '🎮'}
                  </span>
                  <div>
                    <p className="text-white font-bold drop-shadow-lg">
                      {player.name}
                      {player.id === socket.id && (
                        <span className="text-amber-300 text-xs ml-2 font-medium">(bạn)</span>
                      )}
                    </p>
                    <p className="text-gray-300 text-xs font-medium">
                      {player.isHost ? 'Nhà cái' : 'Người chơi'}
                    </p>
                  </div>
                </div>
                <span className="text-yellow-300 font-bold text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {player.score.toLocaleString()}$
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {isHost ? (
            <>
              <button
                onClick={startRound}
                disabled={room.players.length < 2}
                className="w-full py-4 rounded-xl font-bold text-lg transition-all cursor-pointer border-2 border-amber-300 text-white shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed drop-shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                }}
              >
                🎲 Bắt đầu chơi
                {room.players.length < 2 && (
                  <span className="block text-sm font-normal opacity-80">
                    (Cần ít nhất 2 người)
                  </span>
                )}
              </button>
              <p className="text-gray-300 text-xs text-center bg-black/60 py-2 px-4 rounded-lg drop-shadow-lg">
                Bạn là nhà cái. Khi bắt đầu, người chơi sẽ có 15 giây để đặt cược.
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/70 rounded-full border border-white/20">
                <span className="animate-pulse">⏳</span>
                <span className="text-white font-medium">
                  Đang chờ nhà cái bắt đầu...
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleLeave}
            className="w-full py-3 rounded-xl text-gray-300 hover:text-white bg-black/50 hover:bg-black/70 transition-all border border-white/10"
          >
            Rời phòng
          </button>
        </div>
      </div>
    </div>
  );
}
