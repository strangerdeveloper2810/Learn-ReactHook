import ItemGame from './ItemGame';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

export default function ListItemGame() {
  const arrBet = useSelector(
    (state: RootState) => state.BauCuaReducer.arrBet
  );

  const renderItemGame = () => {
    return arrBet.map((item, index) => (
      <div className="col-4" key={index}>
        <ItemGame item={item} />
      </div>
    ));
  };

  return <div className="row mt-5">{renderItemGame()}</div>;
}
