import { Avatar } from 'antd'

import { TComponentData } from '@/types'

export function AntAvatar() {
  return <Avatar size="large">OP</Avatar>
}

export const antAvatarData: TComponentData = {
  name: 'Avatar',
  library: 'ant',
  component: <AntAvatar />,
  tags: ['ant', 'avatar', 'profile', 'photo', 'picture', 'circle', 'image'],
  docsLink: 'https://ant.design/components/avatar',
}
