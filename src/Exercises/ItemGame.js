import React from 'react'

export default function ItemGame(prpos) {
  return (
    <div className='mt-3 ms-3'>
      <img src="./gameBauCua/Bau.png" alt="bau" className='w-75' />

      <div className="bg-success mt-2 pb-2 text-center rounded-3 w-75">
        <button className="btn btn-danger me-3">
          <i className="fa fa-plus"></i>
        </button>
        <span className="mt-2 text-warning fs-3">100</span>
        <button className="btn btn-danger ms-3">-</button>
      </div>
    </div>
  )
}
