import React, { useState } from 'react'

export const BoxDemo = ({ color }) => {
  const [inset, setInsert] = useState(false)
  const [hOffset, sethOffset] = useState('5')
  const [vOffset, setVOfset] = useState('5')
  const [blur, setBlur] = useState('10')
  const [spread, setSpread] = useState('0')

  const codeResult = `${
    inset ? 'inset' : ''
  } ${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`

  return (
    <div
      style={{
        boxShadow: codeResult,
        width: '200px',
        height: '100px',
        backgroundColor: '#F3F3F3',
        borderRadius: '20px',
      }}
    ></div>
  )
}
