// import { AddIcon } from '@chakra-ui/icons'
import { Box, Button } from '@chakra-ui/react'

// Accepts: numberOfMockVariants - how many variant squares you want to see after the base color...
export function AddColorSkeleton({
  numberOfMockVariants,
}: {
  numberOfMockVariants: number
}) {
  // Check to ensure input color is valid, adjust if not.
  // Not sure how to set this Chakra grey.500, but did color pick, and this is the value:
  // const backgroundColorString = '#edf2f7'
  const mockVariants = []

  for (let i = 0; i < numberOfMockVariants; i++) {
    mockVariants.push(i)
  }

  // This is a mockup of the real variant square for visual splendour.
  // function MockVariantSquare() {
  //   return (
  //     <Box
  //       css={{
  //         backgroundColor: backgroundColorString,
  //         width: 110,
  //         height: 110,
  //         padding: '8px',
  //         color: 'black',
  //         borderRadius: 8,
  //         marginRight: '24px',
  //         border: '1px solid gray',
  //         position: 'relative',
  //       }}
  //     >
  //       <AddIcon boxSize={2} />
  //     </Box>
  //   )
  // }

  return (
    <Box
      css={{
        display: 'flex',
        borderRadius: 8,
      }}
    >
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Button
          fontSize="1rem"
          fontWeight={600}
          color="var(--text-color-primary)"
          height="3rem"
        >
          Add New Color
        </Button>
      </Box>
    </Box>
  )
}
