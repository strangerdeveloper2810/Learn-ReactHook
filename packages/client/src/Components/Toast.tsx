import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';

const CONFIG = {
  win: { icon: '🎉', label: 'Thắng', bg: 'bg-emerald-500', border: 'border-emerald-300' },
  lose: { icon: '💸', label: 'Thua', bg: 'bg-red-500', border: 'border-red-300' },
  draw: { icon: '🤝', label: 'Huề', bg: 'bg-amber-500', border: 'border-amber-300' },
};

export default function Toast() {
  const roundResult = useGameStore((s) => s.roundResult);
  const gameState = useGameStore((s) => s.gameState);

  // Only show toast in result state
  if (gameState !== 'result' || !roundResult) return null;

  // Calculate total result
  const totalWin = roundResult.playerResults.reduce(
    (sum, r) => sum + r.winAmount,
    0
  );

  const resultType =
    totalWin > 0 ? 'win' : totalWin < 0 ? 'lose' : 'draw';
  const { icon, label, bg, border } = CONFIG[resultType];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-[toast-in_0.4s_ease-out]">
      <div
        className={`${bg} ${border} border-2 rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center gap-3`}
      >
        <span className="text-3xl">{icon}</span>
        <div className="text-white">
          <p className="font-bold text-lg leading-tight">Round kết thúc</p>
          <p className="text-sm text-white/80">
            Xem kết quả bên dưới
          </p>
        </div>
      </div>
    </div>
  );
}
