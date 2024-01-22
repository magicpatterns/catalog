import './Headingstyle.css'

import { Heading, HeadingLevel } from '@ariakit/react'

import { TComponentData } from '@/types'

export function AriakitHeading() {
  return (
    <div className="wrapper">
      <HeadingLevel>
        <Heading className="heading">Heading 1</Heading>
        <p>Torquent penatibus ipsum nascetur cursus primis lobortis</p>
        <HeadingLevel>
          <Heading className="heading">Heading 2</Heading>
          <p>Volutpat metus id purus dignissim fusce Tellus egestas.</p>
        </HeadingLevel>
        <HeadingLevel>
          <Heading className="heading">Heading 2</Heading>
          <p>Platea justo lectus. Praesent. Et sodales pellentesque</p>
        </HeadingLevel>
      </HeadingLevel>
    </div>
  )
}

export const ariakitHeadingData: TComponentData = {
  name: 'Heading',
  library: 'ariakit',
  component: <AriakitHeading />,
  tags: ['ariakit', 'heading', 'typography'],
  docsLink: 'https://ariakit.org/components/heading',
}
