import { useEffect, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';
import type { DiceFace } from '@baucua/shared';
import { FACE_IMAGES } from '@baucua/shared';

interface DiceProps {
  face: DiceFace;
  delay?: number;
  isShaking: boolean;
}

function Dice({ face, delay = 0, isShaking }: DiceProps) {
  const prevShaking = useRef(false);

  const [propsDice, api] = useSpring(() => ({
    xyz: [0, 0, 0],
    config: { duration: 2500 },
  }));

  useEffect(() => {
    // Start animation when isShaking becomes true
    if (isShaking && !prevShaking.current) {
      api.start({
        from: { xyz: [0, 0, 0] },
        to: { xyz: [1800 + Math.random() * 360, 1800 + Math.random() * 360, 1800 + Math.random() * 360] },
        delay,
      });
    }
    prevShaking.current = isShaking;
  }, [isShaking, api, delay]);

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
          <img src={FACE_IMAGES[face]} className="w-full" alt={face} />
        </div>
        <div className="cube__face back">
          <img src="/gameBauCua/cua.png" className="w-full" alt="dice" />
        </div>
        <div className="cube__face right">
          <img src="/gameBauCua/tom.png" className="w-full" alt="dice" />
        </div>
        <div className="cube__face left">
          <img src="/gameBauCua/ca.png" className="w-full" alt="dice" />
        </div>
        <div className="cube__face top">
          <img src="/gameBauCua/ga.png" className="w-full" alt="dice" />
        </div>
        <div className="cube__face bottom">
          <img src="/gameBauCua/nai.png" className="w-full" alt="dice" />
        </div>
      </animated.div>
    </div>
  );
}

interface DiceShakerProps {
  results?: [DiceFace, DiceFace, DiceFace];
  isShaking: boolean;
}

export default function DiceShaker({ results, isShaking }: DiceShakerProps) {
  // Default faces when shaking (will spin anyway)
  const faces: [DiceFace, DiceFace, DiceFace] = results || ['bau', 'cua', 'tom'];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Dice bowl */}
      <div className="relative w-52 h-52 sm:w-60 sm:h-60">
        {/* Bowl chứa dice */}
        <div className="absolute inset-0 bg-white/90 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center justify-center">
          <div className="absolute top-[12%] left-1/2 -translate-x-1/2">
            <Dice face={faces[0]} delay={0} isShaking={isShaking} />
          </div>
          <div className="absolute bottom-[20%] left-[23%]">
            <Dice face={faces[1]} delay={100} isShaking={isShaking} />
          </div>
          <div className="absolute bottom-[20%] right-[23%]">
            <Dice face={faces[2]} delay={200} isShaking={isShaking} />
          </div>
        </div>

        {/* Nắp đậy */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-700 ease-in-out flex items-center justify-center z-10 ${
            !isShaking
              ? 'opacity-0 scale-50 pointer-events-none'
              : 'opacity-100 scale-100'
          }`}
          style={{
            background: 'radial-gradient(circle at 40% 35%, #c0392b, #922b21 50%, #641e16)',
            boxShadow: isShaking
              ? '0 0 30px rgba(255, 165, 0, 0.6), inset 0 -4px 12px rgba(0,0,0,0.4)'
              : '0 8px 24px rgba(0,0,0,0.4), inset 0 -4px 12px rgba(0,0,0,0.3)',
            animation: isShaking ? 'shake 0.15s infinite alternate' : 'none',
          }}
        >
          <div className="text-center">
            <span className="text-4xl sm:text-5xl">🎲</span>
            <p className="text-white/80 text-xs sm:text-sm mt-1 tracking-wider">
              Đang xốc...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
