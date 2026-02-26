import ItemGame from './ItemGame';
import useBauCuaStore from '../../store/useBauCuaStore';

export default function ListItemGame() {
  const arrBet = useBauCuaStore((state) => state.arrBet);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      {arrBet.map((item) => (
        <ItemGame key={item.id} item={item} />
      ))}
    </div>
  );
}
