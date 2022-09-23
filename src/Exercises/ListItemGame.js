import React from 'react'
import ItemGame from './ItemGame';
import {useSelector} from "react-redux"

export default function ListItemGame(props) {
  let arrBet = useSelector(state => state.BauCuaReducer.arrBet);

  const renderItemGame = () => {
    return arrBet.map((item, index)=>(
      <div className="col-4" key={index}>
        <ItemGame item={item}/>
      </div>
    ));
  }
  return (
    <div className='row mt-5'>
      {renderItemGame()}
    </div>
  )
}
