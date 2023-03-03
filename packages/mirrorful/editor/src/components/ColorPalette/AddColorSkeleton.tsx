import {
    Box,
    Button,
    Stack,
    Text,
    useDisclosure,
    Badge,
    Heading,
    Divider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    IconButton,
    Icon,
  } from '@chakra-ui/react'
  import tinycolor from 'tinycolor2'
  import { generateDefaultColorShades, handleInvalidColor } from './utils'
  import { TColorData, TColorVariant } from 'types'

  // Accepts: backgroundColorString, a valid CSS color string, eg '#EEE' or 'steel-blue', which sets the color of row elements.  An invalid color results in random assignment
export function AddColorSkeleton ({ backgroundColorString, numberOfMockVariants }: { backgroundColorString: string, numberOfMockVariants: number } ) {

    // Check to ensure input color is valid, adjust if not.
    backgroundColorString = handleInvalidColor(backgroundColorString)

    const colorScale = generateDefaultColorShades(backgroundColorString)
    
    const mockVariants = []

    for(let i:number = 0; i < numberOfMockVariants; i++)
    {
        mockVariants.push(i)    
    }

    // This is a mockup of the real variant square for visual splendour.
    function MockVariantSquare () {
        return (
            <Box
                css={{
                backgroundColor: backgroundColorString,
                width: 110,
                height: 110,
                padding: '8px',
                color: tinycolor(backgroundColorString).isDark() ? 'white' : 'black',
                borderRadius: 8,
                marginRight: '24px',
                border: '1px solid gray',
                position: 'relative',
                }}
            >
                <Text fontSize={14} fontWeight="black">
                    Variant
                </Text>
                <Text fontSize={18} fontWeight="medium">
                    Not set
                </Text>
            </Box>
        )
    }

    // Returns row with 'Click to add color' message based on standard ColorRow, but without the clutter / functionality
    return (
        <Box css={{ display: 'flex', opacity: '0.4' }}>
            <Box css={{ width: 350, paddingRight: '64px' }}>
                <Heading fontWeight="extrabold" fontSize={28}>
                Click to add color...
                </Heading>
            </Box>
        {backgroundColorString && (
          <Box
            css={{
              backgroundColor: backgroundColorString,
              width: 240,
              height: 240,
              padding: '24px',
              borderRadius: 8,
              color: tinycolor(backgroundColorString).isDark()
                ? 'white'
                : 'black',
              border: '1px solid gray',
              
            }}
          >
            <Text fontSize={18} fontWeight="black">
              BASE
            </Text>
            <Text fontSize={24} fontWeight="medium">
              Not set.
            </Text>
          </Box>
        )}

        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            marginLeft: '24px',
            justifyContent: 'space-between',
          }}
          height={240}
        >
            { mockVariants.map((mockVariant) => (
                <MockVariantSquare key={mockVariant}/>
            ))}
        </Box>
        

    </Box>
    )
}