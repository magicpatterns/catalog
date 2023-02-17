import { Text } from 'components/core/Text'
import { useState } from 'react'
import tinycolor from 'tinycolor2'
import { generateDefaultColorScale } from './utils'

export function ColorRow() {
  const [colorHex, setColorHex] = useState<string>('#805AD5')

  const colorScale = generateDefaultColorScale(colorHex)

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 8,
          backgroundColor: colorHex,
        }}
      />
      <Text>
        <input value={colorHex} />
      </Text>
      <div style={{ display: 'flex' }}>
        {Object.keys(colorScale).map((weight) => (
          <div
            key={weight}
            style={{
              width: '48px',
              height: '48px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // @ts-ignore
              color: tinycolor(colorScale[weight]).isDark() ? 'white' : 'black',
              // @ts-ignore
              backgroundColor: colorScale[weight],
            }}
          >
            {weight}
          </div>
        ))}
      </div>
    </div>
  )
}
