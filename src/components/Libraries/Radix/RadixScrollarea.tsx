import { Box, Flex, Heading, ScrollArea, Text } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixScrollarea() {
  return (
    <RadixWrapper>
      <ScrollArea type="always" scrollbars="vertical" style={{ height: 180 }}>
        <Box p="2" pr="8">
          <Heading size="4" mb="2" trim="start">
            Principles of the typographic craft
          </Heading>
          <Flex direction="column" gap="4">
            <Text as="p">
              Three fundamental aspects of typography are legibility,
              readability, and aesthetics. Although in a non-technical sense
              “legible” and “readable” are often used synonymously,
              typographically they are separate but related concepts.
            </Text>

            <Text as="p">
              Legibility describes how easily individual characters can be
              distinguished from one another. It is described by Walter Tracy as
              “the quality of being decipherable and recognisable”. For
              instance, if a “b” and an “h”, or a “3” and an “8”, are difficult
              to distinguish at small sizes, this is a problem of legibility.
            </Text>

            <Text as="p">
              Typographers are concerned with legibility insofar as it is their
              job to select the correct font to use. Brush Script is an example
              of a font containing many characters that might be difficult to
              distinguish. The selection of cases influences the legibility of
              typography because using only uppercase letters (all-caps) reduces
              legibility.
            </Text>
          </Flex>
        </Box>
      </ScrollArea>
    </RadixWrapper>
  )
}

export const radixScrollareaData: TComponentData = {
  name: 'Scrollarea',
  library: 'radix',
  component: <RadixScrollarea />,
  tags: ['radix', 'scroll area', 'scroll'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/scroll-area',
}
