import { useNavigate } from "react-router";
import useBauCuaStore from "../../store/useBauCuaStore";
import useAuthStore from "../../store/useAuthStore";
import { useSpring, animated } from "@react-spring/web";

export default function GameScore() {
  const totalScore = useBauCuaStore((state) => state.totalScore);
  const playAgain = useBauCuaStore((state) => state.playAgain);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const styles = useSpring({
    loop: true,
    to: [
      { opacity: 1, color: "#5771D7" },
      { opacity: 0, color: "rgb(22,201,208)" },
    ],
    from: { opacity: 0, color: "red" },
  });

  return (
    <div className="text-center py-2 sm:py-3">
      <animated.h3
        className="text-2xl sm:text-3xl md:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        style={styles}
      >
        GAME BẦU CUA CYBERLEARN
      </animated.h3>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3">
        <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-white bg-black/50 backdrop-blur-sm text-sm sm:text-base rounded-full border border-white/20 shadow-lg">
          {user?.name}:
          <span className="text-yellow-300 font-bold text-base sm:text-xl tracking-wide">
            {totalScore.toLocaleString()}$
          </span>
        </span>

        <button
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white text-sm sm:text-base rounded-full cursor-pointer transition-all shadow-lg border border-emerald-400/30"
          onClick={playAgain}
        >
          Chơi lại
        </button>

        <button
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white/70 hover:text-white text-sm sm:text-base rounded-full cursor-pointer transition-all shadow-lg border border-white/10"
          onClick={() => { logout(); navigate("/login", { replace: true }); }}
        >
          Thoát
        </button>
      </div>
    </div>
  );
}
