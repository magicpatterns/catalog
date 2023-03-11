import {
  Badge,
  Box,
  Button,
  Code,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { generateDefaultColorShades } from 'components/ColorPalette/utils'
import { useState, useEffect, useCallback } from 'react'
import tinycolor from 'tinycolor2'
import { ArrowBackIcon, ArrowForwardIcon, RepeatIcon } from '@chakra-ui/icons'
import { NUMBER_OF_STEPS_IN_NEW_FLOW } from '../constants'
import { TColorData } from 'types'
import { generatePalette } from '../utils'

export function OtherColors({
  initialPalette,
  onUpdatePalette,
  onUpdatePage,
  primaryColor,
  primaryName,
}: {
  initialPalette: TColorData[]
  onUpdatePalette: (newPalette: TColorData[]) => void
  onUpdatePage: (page: number) => void
  primaryColor: string
  primaryName: string
}) {
  const [palette, setPalette] = useState<TColorData[]>(initialPalette)

  const shades = generateDefaultColorShades(primaryColor)

  const handleGeneratePalette = useCallback(() => {
    const alternativeColors = generatePalette(primaryColor, primaryName)

    setPalette(alternativeColors)
  }, [primaryColor, primaryName])

  useEffect(() => {
    if (palette.length === 0) {
      handleGeneratePalette()
    }
  }, [palette, handleGeneratePalette])

  return (
    <Box css={{ display: 'flex', height: '100%' }}>
      <Box
        css={{
          width: '50%',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box css={{ paddingTop: '32px' }}>
          <Stack spacing={1} direction={'row'}>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              04
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={18}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              {NUMBER_OF_STEPS_IN_NEW_FLOW}
            </Text>
          </Stack>

          <Heading fontWeight="black" css={{ marginTop: '12px' }} fontSize={36}>
            {`Let's pick out the rest of your theme.`}
          </Heading>
          <Text
            css={{ marginTop: '32px' }}
            fontSize={20}
            color="gray.500"
            fontWeight="bold"
          >
            {`You can always fine-tune these later!`}
          </Text>
        </Box>
        <Box css={{ paddingBottom: '32px' }}>
          <Button
            size="lg"
            onClick={() => {
              onUpdatePage(3)
            }}
            css={{ marginRight: '16px' }}
          >
            <ArrowBackIcon />
          </Button>
          <Button
            bgColor={shades['500']}
            color={tinycolor(primaryColor).isDark() ? 'white' : 'black'}
            _hover={{
              bgColor: shades['700'],
            }}
            _active={{
              bgColor: shades['800'],
            }}
            padding={'8px 36px'}
            size="lg"
            rightIcon={<ArrowForwardIcon />}
            onClick={() => {
              onUpdatePalette(palette)
              onUpdatePage(5)
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
      <Box
        css={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '64px 32px',
        }}
      >
        <Stack spacing={4}>
          <Box css={{ display: 'flex', alignItems: 'center' }}>
            <Box
              css={{ display: 'flex', flexDirection: 'column', width: '150px' }}
            >
              <Text fontSize={24} fontWeight="black">
                {primaryName}
              </Text>
              <Badge color={primaryColor} css={{ alignSelf: 'flex-start' }}>
                PRIMARY
              </Badge>
            </Box>
            <Box
              css={{
                height: '40px',
                width: '120px',
                backgroundColor: primaryColor,
                marginLeft: '16px',
                borderRadius: 8,
              }}
            />
          </Box>
          <hr />
          <Stack spacing={8}>
            {palette.map((color) => (
              <Box
                css={{ display: 'flex', alignItems: 'center' }}
                key={color.name}
              >
                <Box
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '150px',
                  }}
                >
                  <Text fontSize={24} fontWeight="black">
                    {color.name}
                  </Text>
                </Box>
                <Box
                  css={{
                    height: '40px',
                    width: '120px',
                    backgroundColor: color.baseColor,
                    marginLeft: '16px',
                    borderRadius: 8,
                  }}
                />
              </Box>
            ))}
            <Button onClick={handleGeneratePalette} leftIcon={<RepeatIcon />}>
              Regenerate
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
