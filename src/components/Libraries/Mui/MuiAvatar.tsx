import Avatar from '@mui/material/Avatar'

import { TComponentData } from '@/types'

export function MuiAvatar() {
  return <Avatar>OP</Avatar>
}

export const muiAvatarData: TComponentData = {
  name: 'Avatar',
  library: 'mui',
  component: <MuiAvatar />,
  tags: [
    'material ui',
    'mui',
    'avatar',
    'photo',
    'profile',
    'picture',
    'circle',
    'image',
  ],
  docsLink: 'https://mui.com/material-ui/react-avatar/',
}
