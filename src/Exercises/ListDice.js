import React from 'react'

export default function ListDice(props) {
  return (
    <div className='mt-5 ms-5'>
      <div  className='bg-white' style={{width:300, height:300, borderRadius:150}}>
        <div className="row">
          <div className="col-12 text-center" style={{marginTop:"75px"}}>
            <img src="./GameBauCua/Bau.png" alt="dice" style={{width:50}} />
          </div>

          <div className="col-6 text-end mt-5">
          <img src="./GameBauCua/Bau.png" alt="dice" className='me-3' style={{width:50}} />
          </div>

          <div className="col-6 mt-5">
          <img src="./GameBauCua/Bau.png" alt="dice" className='ms-3' style={{width:50}} />
          </div>
        </div>
      </div>
    </div>
  )
}
