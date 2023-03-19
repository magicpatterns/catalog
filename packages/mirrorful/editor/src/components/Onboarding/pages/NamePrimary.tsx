import { Box, Button, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { Color, ColorResult, SketchPicker } from '@hello-pangea/color-picker'
import { generateDefaultColorShades } from 'components/ColorPalette/utils'
import { useState } from 'react'
import tinycolor from 'tinycolor2'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { NUMBER_OF_STEPS_IN_NEW_FLOW } from '../constants'

export function NamePrimary({
  initialName,
  onUpdatePage,
  primaryColor,
  onUpdatePrimaryName,
}: {
  initialName: string
  onUpdatePage: (page: number) => void
  primaryColor: string
  onUpdatePrimaryName: (newName: string) => void
}) {
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState<string>(initialName)

  const shades = generateDefaultColorShades(primaryColor)

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
              02
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={18}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              {NUMBER_OF_STEPS_IN_NEW_FLOW}
            </Text>
          </Stack>

          <Heading fontWeight="black" css={{ marginTop: '12px' }} fontSize={36}>
            {`Let's`} give your color <br />a name!
          </Heading>
          <Text
            css={{ marginTop: '32px' }}
            fontSize={20}
            color="gray.500"
            fontWeight="bold"
          >
            The color name is how it will be referenced in code. We recommend
            simple names like {'"Blue"'} or {'"Light Green"'}.
          </Text>
        </Box>
        <Box css={{ paddingBottom: '32px' }}>
          <Button
            size="lg"
            onClick={() => {
              onUpdatePage(1)
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
              if (!name) {
                setError('Please enter a name for your color.')
                return
              }

              onUpdatePrimaryName(name)
              onUpdatePage(3)
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
        <Box
          css={{
            width: '100px',
            height: '100px',
            marginBottom: '16px',
            borderRadius: 8,
          }}
          bgColor={primaryColor}
        />
            <Text
              css={{ alignSelf: 'flex-start', marginBottom: '4px' }}
              fontWeight="bold"
            >
              Color Name:
            </Text>
        <Input
          placeholder="e.g. Blue"
          css={{ width: '100%' }}
          focusBorderColor={primaryColor}
          errorBorderColor="red.400"
          isInvalid={!!error}
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value)
          }}
        />
        {error && (
          <Text
            css={{ alignSelf: 'flex-start', marginTop: '8px' }}
            color="red.400"
            fontWeight="medium"
          >
            {error}
          </Text>
        )}

        <Text css={{ marginTop: '32px' }} color="gray.400" fontWeight="medium">
          {`Tip: While "Bob" is a great name for a human, it is not for a color.`}
        </Text>
      </Box>
    </Box>
  )
}
