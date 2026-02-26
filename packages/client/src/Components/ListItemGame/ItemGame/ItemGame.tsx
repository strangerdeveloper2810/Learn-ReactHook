import { useState } from 'react';
import useBauCuaStore from '../../../store/useBauCuaStore';
import { useSpring, animated } from '@react-spring/web';

interface BetItem {
  id: string;
  img: string;
  scoreBet: number;
}

interface ItemGameProps {
  item: BetItem;
}

export default function ItemGame({ item }: ItemGameProps) {
  const [toggle, setToggle] = useState(true);
  const betScore = useBauCuaStore((s) => s.betScore);
  const isShaking = useBauCuaStore((s) => s.isShaking);

  const { x } = useSpring({
    from: { x: 0 },
    x: toggle ? 1 : 0,
    config: { duration: 1000 },
  });

  const handleBet = (number: number) => {
    setToggle(!toggle);
    betScore(item, number);
  };

  const btnStyle = {
    opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
    scale: x.to({
      range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
      output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
    }),
  };

  return (
    <div className="flex flex-col items-center bg-black/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-white/10 hover:border-yellow-400/30 transition-colors">
      <img
        src={item.img}
        alt={item.id}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
      />

      <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 sm:gap-2">
        <animated.button
          className={`text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-colors text-base sm:text-lg font-bold leading-none ${
            isShaking
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-400 cursor-pointer'
          }`}
          style={btnStyle}
          onClick={() => handleBet(1)}
          disabled={isShaking}
        >
          +
        </animated.button>
        <span className="text-yellow-300 text-lg sm:text-xl font-bold min-w-[3ch] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {item.scoreBet}
        </span>
        <animated.button
          className={`text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-colors text-base sm:text-lg font-bold leading-none ${
            isShaking
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-400 cursor-pointer'
          }`}
          style={btnStyle}
          onClick={() => handleBet(-1)}
          disabled={isShaking}
        >
          -
        </animated.button>
      </div>
    </div>
  );
}
