import { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import useBauCuaStore from "../../../store/useBauCuaStore";

export default function Dice({ diceItem }) {
  const diceRound = useBauCuaStore((state) => state.diceRound);

  const [propsDice, api] = useSpring(() => ({
    from: { xyz: [0, 0, 0] },
    to: { xyz: [1800, 1800, 1800] },
    config: { duration: 3000 },
  }));

  useEffect(() => {
    api.start({
      from: { xyz: [0, 0, 0] },
      to: { xyz: [1800, 1800, 1800] },
      reset: true,
    });
  }, [diceRound, api]);

  return (
    <div className="scene">
      <animated.div
        className="cube"
        style={{
          transform: propsDice.xyz.to(
            (x, y, z) =>
              `translateZ(-25px) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`
          ),
        }}
      >
        <div className="cube__face front">
          <img src={diceItem.img} className="w-full" alt={diceItem.id} />
        </div>
        <div className="cube__face back">
          <img src="./gameBauCua/cua.png" className="w-full" alt="dice" />
        </div>
        <div className="cube__face right">
          <img src="./gameBauCua/tom.png" className="w-full" alt="dice" />
        </div>
        <div className="cube__face left">
          <img src="./gameBauCua/ca.png" className="w-full" alt="dice" />
        </div>
        <div className="cube__face top">
          <img src="./gameBauCua/ga.png" className="w-full" alt="dice" />
        </div>
        <div className="cube__face bottom">
          <img src="./gameBauCua/nai.png" className="w-full" alt="dice" />
        </div>
      </animated.div>
    </div>
  );
}
