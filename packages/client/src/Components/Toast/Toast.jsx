import { useEffect } from "react";
import useBauCuaStore from "../../store/useBauCuaStore";

const CONFIG = {
  win: { icon: "🎉", label: "Thắng", bg: "bg-emerald-500", border: "border-emerald-300" },
  lose: { icon: "💸", label: "Thua", bg: "bg-red-500", border: "border-red-300" },
  draw: { icon: "🤝", label: "Huề", bg: "bg-amber-500", border: "border-amber-300" },
};

export default function Toast() {
  const roundResult = useBauCuaStore((s) => s.roundResult);
  const clearResult = useBauCuaStore((s) => s.clearResult);

  useEffect(() => {
    if (!roundResult) return;
    const timer = setTimeout(clearResult, 3000);
    return () => clearTimeout(timer);
  }, [roundResult, clearResult]);

  if (!roundResult) return null;

  const { icon, label, bg, border } = CONFIG[roundResult.type];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-[toast-in_0.4s_ease-out]">
      <div
        className={`${bg} ${border} border-2 rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center gap-3`}
      >
        <span className="text-3xl">{icon}</span>
        <div className="text-white">
          <p className="font-bold text-lg leading-tight">{label}</p>
          <p className="text-sm text-white/80">
            {roundResult.type === "draw"
              ? "Không ăn không thua!"
              : `${roundResult.amount.toLocaleString()}$`}
          </p>
        </div>
      </div>
    </div>
  );
}
