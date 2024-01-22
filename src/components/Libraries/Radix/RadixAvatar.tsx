import * as Avatar from '@radix-ui/react-avatar'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixAvatar() {
  return (
    <RadixWrapper>
      <div style={{ display: 'flex', gap: 20 }}>
        <Avatar.Root className="AvatarRoot">
          <Avatar.Image
            className="AvatarImage"
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            alt="Colm Tuite"
          />
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            CT
          </Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root className="AvatarRoot">
          <Avatar.Image
            className="AvatarImage"
            src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
            alt="Pedro Duarte"
          />
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            JD
          </Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root className="AvatarRoot">
          <Avatar.Fallback className="AvatarFallback">PD</Avatar.Fallback>
        </Avatar.Root>
      </div>
    </RadixWrapper>
  )
}

export const radixAvatarData: TComponentData = {
  name: 'Avatar',
  library: 'radix',
  component: <RadixAvatar />,
  tags: ['radix', 'avatar'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/avatar',
}
