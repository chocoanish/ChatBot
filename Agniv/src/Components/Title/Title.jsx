import React from 'react'
import Dots from "../../assets/Dots.svg"
import './Title.css'

const Title = () => {
  return (
    <>
    <div className="Chat" style={{width: 310, height: 58, left: 30, top: 208, position: 'absolute'}}>
    <div className="Rectangle3" style={{width: 310, height: 58, left: 0, top: 0, position: 'absolute', background: 'rgba(47, 254, 203, 0.10)', borderRadius: 50}} />
    <div className="Chat1Title" style={{width: 209, height: 28, left: 22, top: 15, position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Lato', fontWeight: '400', wordWrap: 'break-word'}}>Chat 1 (Title)</div>
    <div className="Dots1">
        <img src={Dots}></img>
    </div>
  </div>
    </>
  )
}

export default Title