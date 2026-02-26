import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../store/useAuthStore';
import '../../assets/CSS/ExGame.css';

export default function Login() {
  const [name, setName] = useState('');
  const loginAsGuest = useAuthStore((s) => s.loginAsGuest);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    loginAsGuest(name.trim());
    navigate('/lobby', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" id="exGame">
      {/* Floating dice background */}
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

      {/* Login card */}
      <div className="relative z-10 w-[90vw] max-w-md animate-[card-enter_0.6s_ease-out]">
        {/* Glow effect behind card */}
        <div className="absolute -inset-4 bg-amber-500/20 rounded-[2rem] blur-2xl" />

        <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-amber-400/30 shadow-[0_0_60px_rgba(255,165,0,0.15)] overflow-hidden">
          {/* Top decorative bar */}
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

          <div className="px-6 py-8 sm:px-10 sm:py-12">
            {/* Logo */}
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4"
                style={{
                  background: 'radial-gradient(circle at 40% 35%, #c0392b, #922b21 50%, #641e16)',
                  boxShadow: '0 0 30px rgba(192, 57, 43, 0.4), inset 0 -3px 8px rgba(0,0,0,0.3)',
                }}
              >
                <span className="text-4xl sm:text-5xl">🎲</span>
              </div>
              <h1 className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600 font-bold tracking-wide leading-tight">
                BẦU CUA ONLINE
              </h1>
              <p className="text-white/50 text-sm sm:text-base mt-1 tracking-widest uppercase">
                Multiplayer
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên của bạn..."
                  maxLength={20}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none transition-all focus:border-amber-400/60 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(255,165,0,0.1)] text-sm sm:text-base"
                />
                <div className="absolute inset-0 rounded-xl border border-amber-400/0 group-focus-within:border-amber-400/30 transition-all pointer-events-none" />
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-3.5 rounded-xl font-bold text-base sm:text-lg tracking-wider transition-all cursor-pointer border-2 border-amber-300/50 text-white shadow-[0_4px_20px_rgba(255,165,0,0.3)] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
                }}
              >
                {name.trim() ? `Vào chơi, ${name.trim()}!` : 'Vào chơi với tư cách Khách'}
              </button>
            </form>

            {/* Decorative bottom */}
            <div className="mt-8 flex items-center justify-center gap-3 text-white/20 text-xs sm:text-sm">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="tracking-widest uppercase">🦐 🦀 🐓 🐟 🦌 🍐</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
