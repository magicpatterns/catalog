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


  // Accepts: backgroundColorString, a valid CSS color string, eg '#EEE' or 'steel-blue', which sets the color of row elements.  An invalid color results in random assignment
export function AddColorRow ({ backgroundColorString }: {backgroundColorString: string} ) {

    // Check to ensure input color is valid, adjust if not.
    backgroundColorString = handleInvalidColor(backgroundColorString)

    const colorScale = generateDefaultColorShades(backgroundColorString)

    // Returns row with 'Click to add color' message based on standard ColorRow, but without the clutter / functionality
    return (
          <Box css={{ display: 'flex' }}>
            <Box css={{ width: 350, display: 'flex', alignItems: 'center' }}>
              <Box>
                <Heading fontWeight='extrabold' fontSize={28} color='#777'>
                  Click to add color...
                </Heading>
              </Box>
            </Box>
            <Box css={{ 
                display: 'flex', 
                opacity: '0.4'
                }}>
              <Box
                css={{
                  backgroundColor: backgroundColorString,
                  width: 200,
                  height: 200,
                  padding: '16px',
                  borderRadius: '12px 0 0 12px',
                  color: tinycolor(backgroundColorString).isDark() ? 'white' : 'black',
                  border: tinycolor(backgroundColorString).isDark() ? 'none' : '1px dashed black'
                }}
              >
                <Text fontSize={14} fontWeight="black">
                  BASE
                </Text>
                <Text fontSize={22} fontWeight="medium">
                  Not Set.
                </Text>
              </Box>
              <Box css={{ display: 'flex', flexDirection: 'column' }}>
                <Box
                  css={{
                    backgroundColor: backgroundColorString,
                    width: 200,
                    height: 100,
                    padding: '16px',
                    color: tinycolor(backgroundColorString).isDark()
                      ? 'white'
                      : 'black',
                    borderRadius: '0 12px 0 0',
                    border: '1px dashed black',
                  }}
                >
                  <Text fontSize={14} fontWeight="black">
                    HOVER
                  </Text>
                  <Text fontSize={16} fontWeight="medium">
                    Not Set.
                  </Text>
                </Box>
                <Box
                  css={{
                    backgroundColor: backgroundColorString,
                    width: 200,
                    height: 100,
                    padding: '16px',
                    color: tinycolor(backgroundColorString).isDark()
                      ? 'white'
                      : 'black',
                    borderRadius: '0 0 12px 0',
                    border: '1px dashed black',
                  }}
                >
                  <Text fontSize={14} fontWeight="black">
                    ACTIVE
                  </Text>
                  <Text fontSize={16} fontWeight="medium">
                    Not set.
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box
              css={{ display: 'flex', alignItems: 'center', marginLeft: '64px', opacity: '0.4' }}
            >
              <Box
                css={{
                  display: 'flex',
                  width: 250,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                {Object.keys(colorScale).map((weight) => (
                  <Box
                    key={weight}
                    style={{
                      width: 50,
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '14px',
                      // @ts-ignore
                      color: tinycolor(colorScale[weight]).isDark()
                        ? 'white'
                        : 'black',
                      // @ts-ignore
                      backgroundColor: colorScale[weight],
                    }}
                  >
                    {weight}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
    )
}