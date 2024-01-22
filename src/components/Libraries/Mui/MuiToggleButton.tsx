import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from '@radix-ui/react-icons'
import { useState } from 'react'

import { TComponentData } from '@/types'

export function MuiToggleButton() {
  const [alignment, setAlignment] = useState<string | null>('left')

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment)
  }

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned">
        <TextAlignLeftIcon />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <TextAlignCenterIcon />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <TextAlignRightIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export const muiToggleButtonData: TComponentData = {
  name: 'Toggle Button',
  library: 'mui',
  component: <MuiToggleButton />,
  tags: ['material ui', 'mui', 'toggle button', 'toggle'],
}
