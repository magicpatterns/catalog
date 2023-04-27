// import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, useColorModeValue } from '@chakra-ui/react'

import { darkTheme, lightTheme } from '../theme'

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

  const buttonBackgroundColor = useColorModeValue(
    lightTheme.buttons.backgroundColors.default,
    darkTheme.buttons.large.backgroundColors.default
  )
  const buttonBackgroundColorOnHover = useColorModeValue(
    lightTheme.buttons.backgroundColors.hover,
    darkTheme.buttons.large.backgroundColors.hover
  )
  const buttonBorder = useColorModeValue('none', '3px solid transparent')
  const borderRadius = useColorModeValue(8, 30)
  const buttonBorderOnHover = useColorModeValue(
    'none',
    '3.5px solid transparent'
  )
  const buttonTextColor = useColorModeValue(
    lightTheme.buttons.textColors.primary,
    darkTheme.buttons.large.textColors
  )

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
          color="black"
          height="3rem"
          css={{
            background: buttonBackgroundColor,
            borderRadius: borderRadius,
            border: buttonBorder,
            color: buttonTextColor,
            transition: '.2s',
          }}
          _hover={{
            background: buttonBackgroundColorOnHover,
            border: buttonBorderOnHover,
          }}
        >
          Add New Color
        </Button>
      </Box>
    </Box>
  )
}
