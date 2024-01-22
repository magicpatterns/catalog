import './Disclosurestyle.css'

import * as Ariakit from '@ariakit/react'

import { TComponentData } from '@/types'

export function AriakitDisclosure() {
  const disclosure = Ariakit.useDisclosureStore()
  return (
    <div className="wrapper">
      <Ariakit.Disclosure store={disclosure} className="button">
        What are vegetables?
      </Ariakit.Disclosure>
      <Ariakit.DisclosureContent store={disclosure} className="content">
        <p>
          Vegetables are parts of plants that are consumed by humans or other
          animals as food. The original meaning is still commonly used and is
          applied to plants collectively to refer to all edible plant matter,
          including the flowers, fruits, stems, leaves, roots, and seeds.
        </p>
      </Ariakit.DisclosureContent>
    </div>
  )
}

export const ariakitDisclosureData: TComponentData = {
  name: 'Disclosure',
  library: 'ariakit',
  component: <AriakitDisclosure />,
  tags: ['ariakit', 'disclosure'],
  docsLink: 'https://ariakit.org/components/disclosure',
}
