import { TComponentData } from '@/types'

import { Avatar, AvatarFallback, AvatarImage } from './raw/ui/avatar'
import { ShadcnWrapper } from './ShadcnWrapper'

export function ShadcnAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export const shadcnAvatarData: TComponentData = {
  name: 'Avatar',
  library: 'shadcn',
  component: <ShadcnAvatar />,
  tags: ['shadcn', 'avatar', 'image', 'profile', 'picture', 'photo'],
  docsLink: 'https://ui.shadcn.com/docs/components/avatar',
}
