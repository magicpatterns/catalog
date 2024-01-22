import { AspectRatio } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixAspectRatio() {
  return (
    <RadixWrapper>
      <AspectRatio ratio={16 / 8}>
        <img
          src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
          alt="A house in a forest"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            borderRadius: 'var(--radius-2)',
          }}
        />
      </AspectRatio>
    </RadixWrapper>
  )
}

export const radixAspectratioData: TComponentData = {
  name: 'Aspectratio',
  library: 'radix',
  component: <RadixAspectRatio />,
  tags: ['radix', 'aspect ratio', 'aspectratio', 'ratio', 'image', 'photo'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/aspect-ratio',
}
