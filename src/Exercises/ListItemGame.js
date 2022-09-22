import React from 'react'
import ItemGame from './ItemGame'

export default function ListItemGame(props) {
  return (
    <div className='row mt-5'>
      <div className="col-4">
        <ItemGame/>
      </div>

      <div className="col-4">
        <ItemGame/>
      </div>


      <div className="col-4">
        <ItemGame/>
      </div>

      <div className="col-4">
        <ItemGame/>
      </div>


      <div className="col-4">
        <ItemGame/>
      </div>

      <div className="col-4">
        <ItemGame/>
      </div>
    </div>
  )
}
