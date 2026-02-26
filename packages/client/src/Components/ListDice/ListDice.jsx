import { useCallback, useRef } from "react";
import Dice from "./Dice";
import useBauCuaStore from "../../store/useBauCuaStore";

const SHAKE_DURATION = 3000;

export default function ListDice() {
  const arrDice = useBauCuaStore((state) => state.arrDice);
  const isRevealed = useBauCuaStore((state) => state.isRevealed);
  const isShaking = useBauCuaStore((state) => state.isShaking);
  const shakeDice = useBauCuaStore((state) => state.shakeDice);
  const revealDice = useBauCuaStore((state) => state.revealDice);
  const audioRef = useRef(null);

  const handleShake = useCallback(() => {
    shakeDice();
    setTimeout(() => {
      revealDice();
    }, SHAKE_DURATION);
  }, [shakeDice, revealDice]);

  const handlePlayMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("./media/2.mp3");
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-5">
      {/* Dice bowl */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60">
        {/* Bowl chứa dice */}
        <div className="absolute inset-0 bg-white/90 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center justify-center">
          <div className="absolute top-[12%] left-1/2 -ml-6.25">
            <Dice diceItem={arrDice[0]} />
          </div>
          <div className="absolute bottom-[20%] left-[23%]">
            <Dice diceItem={arrDice[1]} />
          </div>
          <div className="absolute bottom-[20%] right-[23%]">
            <Dice diceItem={arrDice[2]} />
          </div>
        </div>

        {/* Nắp đậy */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-700 ease-in-out flex items-center justify-center z-10 ${
            isRevealed
              ? "opacity-0 scale-50 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
          style={{
            background: "radial-gradient(circle at 40% 35%, #c0392b, #922b21 50%, #641e16)",
            boxShadow: isShaking
              ? "0 0 30px rgba(255, 165, 0, 0.6), inset 0 -4px 12px rgba(0,0,0,0.4)"
              : "0 8px 24px rgba(0,0,0,0.4), inset 0 -4px 12px rgba(0,0,0,0.3)",
            animation: isShaking ? "shake 0.15s infinite alternate" : "none",
          }}
        >
          <div className="text-center">
            <span className="text-4xl sm:text-5xl">🎲</span>
            <p className="text-white/80 text-xs sm:text-sm mt-1 tracking-wider">
              {isShaking ? "Đang xốc..." : "Đặt cược đi!"}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 sm:gap-3">
        <button
          className={`rounded-full text-base sm:text-xl px-5 sm:px-8 py-2 sm:py-3 shadow-lg transition-all font-bold border-2 tracking-wider ${
            isShaking
              ? "bg-gray-400 border-gray-300/50 text-gray-200 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-400 active:scale-95 text-white border-amber-300/50 cursor-pointer"
          }`}
          onClick={handleShake}
          disabled={isShaking}
        >
          XỐC
        </button>

        <button
          className="bg-white/20 hover:bg-white/30 active:scale-95 text-white rounded-full text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-3 cursor-pointer shadow-lg transition-all backdrop-blur-sm border border-white/20"
          onClick={handlePlayMusic}
        >
          Play Music
        </button>
      </div>
    </div>
  );
}
