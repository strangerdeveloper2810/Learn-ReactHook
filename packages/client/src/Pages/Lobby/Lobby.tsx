import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSocket } from '../../socket/useSocket';
import { useRoomStore } from '../../store/useRoomStore';
import { useAuthStore } from '../../store/useAuthStore';
import '../../assets/CSS/ExGame.css';

export default function Lobby() {
  const [mode, setMode] = useState<'select' | 'join'>('select');
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const room = useRoomStore((s) => s.room);
  const error = useRoomStore((s) => s.error);
  const setError = useRoomStore((s) => s.setError);

  const { createRoom, joinRoom } = useSocket();

  // Navigate to room when room is set
  useEffect(() => {
    if (room) {
      navigate(`/room/${room.code}`);
    }
  }, [room, navigate]);

  const handleCreateRoom = () => {
    if (!user?.name) return;
    createRoom(user.name);
  };

  const handleJoinRoom = () => {
    if (!user?.name || !roomCode.trim()) {
      setError('Vui lòng nhập mã phòng');
      return;
    }
    joinRoom(roomCode.trim().toUpperCase(), user.name);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" id="exGame">
      {/* Floating background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🎲', '🦐', '🦀', '🐓', '🐟', '🦌', '🍐'].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-4xl sm:text-5xl opacity-15 select-none"
            style={{
              left: `${10 + i * 13}%`,
              animation: `float-up ${6 + i * 1.5}s linear infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Main card */}
      <div className="relative z-10 w-[90vw] max-w-md animate-[card-enter_0.6s_ease-out]">
        <div className="absolute -inset-4 bg-amber-500/20 rounded-[2rem] blur-2xl" />

        <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-amber-400/30 shadow-[0_0_60px_rgba(255,165,0,0.15)] overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-5xl">🎲</span>
              <h1 className="text-2xl sm:text-3xl text-amber-400 font-bold mt-2">
                Xin chào, {user?.name}!
              </h1>
              <p className="text-white/50 text-sm mt-1">Chọn cách chơi</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            {mode === 'select' ? (
              <div className="space-y-3">
                <button
                  onClick={handleCreateRoom}
                  className="w-full py-4 rounded-xl font-bold text-lg tracking-wider transition-all cursor-pointer border-2 border-emerald-400/50 text-white shadow-lg active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                  }}
                >
                  🏠 Tạo phòng (Làm nhà cái)
                </button>

                <button
                  onClick={() => setMode('join')}
                  className="w-full py-4 rounded-xl font-bold text-lg tracking-wider transition-all cursor-pointer border-2 border-blue-400/50 text-white shadow-lg active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  }}
                >
                  🚪 Vào phòng
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setMode('select');
                    setError(null);
                  }}
                  className="text-white/60 hover:text-white text-sm flex items-center gap-1"
                >
                  ← Quay lại
                </button>

                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="Nhập mã phòng (VD: ABC123)"
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none transition-all focus:border-amber-400/60 text-center text-xl tracking-[0.3em] uppercase"
                />

                <button
                  onClick={handleJoinRoom}
                  disabled={!roomCode.trim()}
                  className="w-full py-4 rounded-xl font-bold text-lg tracking-wider transition-all cursor-pointer border-2 border-blue-400/50 text-white shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  }}
                >
                  Vào phòng
                </button>
              </div>
            )}

            {/* Logout */}
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <button
                onClick={handleLogout}
                className="text-white/40 hover:text-white/70 text-sm transition-colors"
              >
                Đổi tên / Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
