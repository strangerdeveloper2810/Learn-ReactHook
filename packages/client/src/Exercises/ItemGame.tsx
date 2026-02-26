import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { betScoreActions } from '../redux/actions/BauCuaActions';
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
  const dispatch = useDispatch();

  const handleBetScore = (betItem: BetItem, number: number) => {
    dispatch(betScoreActions(betItem, number));
  };

  const { x } = useSpring({
    from: { x: 0 },
    x: toggle ? 1 : 0,
    config: { duration: 1000 },
  });

  return (
    <div className="mt-3 ms-3">
      <img src={item.img} alt={item.id} className="w-75" />

      <div className="bg-success mt-2 pb-2 text-center rounded-3 w-75">
        <animated.button
          className="btn btn-danger me-3"
          style={{
            opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
            scale: x.to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            }),
          }}
          onClick={() => {
            setToggle(!toggle);
            handleBetScore(item, 1);
          }}
        >
          <i className="fa fa-plus"></i>
        </animated.button>
        <span className="mt-2 text-warning fs-3">{item.scoreBet}</span>
        <animated.button
          className="btn btn-danger ms-3"
          style={{
            opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
            scale: x.to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            }),
          }}
          onClick={() => {
            setToggle(!toggle);
            handleBetScore(item, -1);
          }}
        >
          -
        </animated.button>
      </div>
    </div>
  );
}
