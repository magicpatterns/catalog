'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  Separator,
  Text,
} from '@radix-ui/themes'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { ComponentCard } from '@/components/ComponentCard'
import { ALL_COMPONENT_DATA } from '@/components/constants'
import { DefaultContainer } from '@/components/DefaultContainer'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { fuzzyMatchComponentType } from '@/components/utils/matchComponentType'

export default function SwitchPage() {
  return (
    <div>
      <Navbar />
      <DefaultContainer py="6">
        <Flex align="center">
          <Heading size="9">Switches</Heading>
        </Flex>
        <Separator style={{ width: '100%' }} my="5" />
        <ResponsiveMasonry>
          <Masonry gutter="18px">
            {ALL_COMPONENT_DATA.filter((c) =>
              fuzzyMatchComponentType('switch', c.tags)
            ).map((data) => {
              return (
                <ComponentCard
                  key={`${data.library}-${data.name}`}
                  name={data.name}
                  library={data.library}
                  docsLink={data.docsLink}
                >
                  {data.component}
                </ComponentCard>
              )
            })}
          </Masonry>
        </ResponsiveMasonry>
      </DefaultContainer>
      <Footer />
    </div>
  )
}
