import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Callout } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixCallout() {
  return (
    <RadixWrapper>
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          You will need admin privileges to install and access this application.
        </Callout.Text>
      </Callout.Root>
    </RadixWrapper>
  )
}

export const radixCalloutData: TComponentData = {
  name: 'Callout',
  library: 'radix',
  component: <RadixCallout />,
  tags: ['radix', 'callout'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/callout',
}
