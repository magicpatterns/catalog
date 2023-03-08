import { AddIcon } from '@chakra-ui/icons'
import { Box, Text, Heading, Button } from '@chakra-ui/react'

// Accepts: numberOfMockVariants - how many variant squares you want to see after the base color...
export function AddColorSkeleton({
  numberOfMockVariants,
}: {
  numberOfMockVariants: number
}) {
  // Check to ensure input color is valid, adjust if not.
  // Not sure how to set this Chakra grey.500, but did color pick, and this is the value:
  const backgroundColorString: string = '#edf2f7'
  const mockVariants = []

  for (let i: number = 0; i < numberOfMockVariants; i++) {
    mockVariants.push(i)
  }

  // This is a mockup of the real variant square for visual splendour.
  function MockVariantSquare() {
    return (
      <Box
        css={{
          backgroundColor: backgroundColorString,
          width: 110,
          height: 110,
          padding: '8px',
          color: 'black',
          borderRadius: 8,
          marginRight: '24px',
          border: '1px solid gray',
          position: 'relative',
        }}
      >
        <AddIcon boxSize={2} />
        {/* <Text fontSize={14} fontWeight="black">
          Variant
        </Text> */}
        {/* <Text fontSize={18} fontWeight="medium">
          Not set
        </Text> */}
      </Box>
    )
  }

  return (
    <Box css={{ display: 'flex', cursor: 'pointer' }} marginTop={16}>
      <Box css={{ width: 350 }}>
        <Button>Add a new color</Button>
      </Box>
      {backgroundColorString && (
        <Box
          css={{
            opacity: '0.4',
            backgroundColor: backgroundColorString,
            width: 240,
            height: 240,
            padding: '24px',
            borderRadius: 8,
            color: 'black',
            border: '1px solid gray',
          }}
        >
          <AddIcon boxSize={6} />
        </Box>
      )}

      <Box
        css={{
          opacity: '0.4',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          marginLeft: '24px',
          justifyContent: 'space-between',
        }}
        height={240}
      >
        {mockVariants.map((mockVariant) => (
          <MockVariantSquare key={mockVariant} />
        ))}
      </Box>
    </Box>
  )
}
