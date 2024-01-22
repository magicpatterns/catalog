import Fab from '@mui/material/Fab'
import { PlusIcon } from '@radix-ui/react-icons'

import { TComponentData } from '@/types'

export function MuiFab() {
  return (
    <Fab aria-label="add">
      <PlusIcon />
    </Fab>
  )
}

export const muiFabData: TComponentData = {
  name: 'Floating Action Button',
  library: 'mui',
  component: <MuiFab />,
  tags: [
    'material ui',
    'mui',
    'floating action button',
    'fab',
    'floating',
    'button',
  ],
}
