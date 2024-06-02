import React, { useEffect, useState } from 'react'
import './Circle.css'
const Circle = ({ch, x, y}) => {
    const [color, setColor] = useState({});
    useEffect(() => {
      console.log(ch);
      if (ch === 1) {
          setColor( '#CE4BF2' );
      } else if (ch === 2) {
          setColor('#F2B705' );
      } else {
          setColor('Green');
      }
  }, [ch]);
  return (
    <>
    <div style={{backgroundColor:color}} x={x} y={y} className='circle'>
    </div>
    </>
  )
}

export default Circle