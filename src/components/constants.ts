import { TComponentData } from '@/types'

import { ANT_COMPONENT_DATA } from './Libraries/Ant'
import { ARIAKIT_COMPONENT_DATA } from './Libraries/Ariakit'
import { CHAKRA_COMPONENT_DATA } from './Libraries/Chakra'
import { MANTINE_COMPONENT_DATA } from './Libraries/Mantine'
import { MUI_COMPONENT_DATA } from './Libraries/Mui'
import { RADIX_COMPONENT_DATA } from './Libraries/Radix'
import { SHADCN_COMPONENT_DATA } from './Libraries/ShadCn'

const updatedAriaData = ARIAKIT_COMPONENT_DATA.map((componentData) => ({
  ...componentData,
  tags: [...componentData.tags, 'headless', 'css'],
}))

const updatedRadixData = RADIX_COMPONENT_DATA.map((componentData) => ({
  ...componentData,
  tags: [...componentData.tags, 'headless', 'primitive'],
}))

const updatedShadData = SHADCN_COMPONENT_DATA.map((componentData) => ({
  ...componentData,
  tags: [...componentData.tags, 'headless', 'tailwind', 'primitive'],
}))

function pluralize(tag: string): string {
  if (tag.endsWith('s')) {
    return tag
  } else {
    return tag + 's'
  }
}

function addPluralTags(components: TComponentData[]): TComponentData[] {
  return components.map((component) => {
    const pluralTags = component.tags.map((tag) => pluralize(tag))
    return {
      ...component,
      tags: [...component.tags, ...pluralTags],
    }
  })
}

const theComponentData = [
  ...ANT_COMPONENT_DATA,
  ...updatedAriaData,
  ...CHAKRA_COMPONENT_DATA,
  ...MANTINE_COMPONENT_DATA,
  ...MUI_COMPONENT_DATA,
  ...updatedRadixData,
  ...updatedShadData,
]

export const ALL_COMPONENT_DATA = addPluralTags(theComponentData)
