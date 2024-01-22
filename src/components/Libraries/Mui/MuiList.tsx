import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { CalendarIcon, DashboardIcon } from '@radix-ui/react-icons'

import { TComponentData } from '@/types'

export function MuiList() {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <CalendarIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItemButton>
      </ListItem>
    </List>
  )
}

export const muiListData: TComponentData = {
  name: 'List',
  library: 'mui',
  component: <MuiList />,
  tags: ['material ui', 'mui', 'list'],
  docsLink: 'https://mui.com/material-ui/react-list/',
}
