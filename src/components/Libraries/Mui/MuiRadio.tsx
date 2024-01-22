import Radio from '@mui/material/Radio'
import { useState } from 'react'

import { TComponentData } from '@/types'

export function MuiRadio() {
  const [selectedValue, setSelectedValue] = useState<string>('a')

  return (
    <>
      <Radio
        checked={selectedValue === 'a'}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedValue('a')
          }
        }}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedValue('b')
          }
        }}
        value="b"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'B' }}
      />
    </>
  )
}

export const muiRadioData: TComponentData = {
  name: 'Radio',
  library: 'mui',
  component: <MuiRadio />,
  tags: ['material ui', 'mui', 'radio'],
}
