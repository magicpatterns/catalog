import { Box, Select, Text } from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react'

type TScreenSizeOptions = 'mobile' | 'tablet' | 'desktop'

export function PageRender({
  transpiledCode,
  isResponsiveMode,
}: {
  transpiledCode: string
  isResponsiveMode: boolean
}) {
  const frameContainer = useRef<HTMLDivElement>(null)
  const [screenSizeOption, setScreenSizeOption] =
    useState<TScreenSizeOptions>('mobile')
  const [screenSize, setScreenSize] = useState<{
    width: number
    height: number
  }>({ width: 414, height: 896 })

  const calculateScale = () => {
    if (frameContainer.current) {
      const { width, height } = frameContainer.current.getBoundingClientRect()

      const limitingWidthScale = (0.7 * width) / screenSize.width
      const limitingHeightScale = (0.7 * height) / screenSize.height

      const scale = Math.min(limitingWidthScale, limitingHeightScale)

      return scale
    }

    return 0.5
  }

  const scale = calculateScale()

  if (isResponsiveMode) {
    return (
      <Box
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          position: 'relative',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        }}
        ref={frameContainer}
        backgroundColor="space.500"
      >
        <Box
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            width: '100%',
            height: '42px',
            alignItems: 'center',
            zIndex: 2,
          }}
          backgroundColor="bg"
        >
          <Box
            css={{
              display: 'flex',
              alignItems: 'center',
            }}
            paddingX={'14px'}
          >
            <Select
              color="playgroundText"
              value={screenSizeOption}
              onChange={(e) => {
                const newOption = e.target.value as TScreenSizeOptions
                setScreenSizeOption(newOption)
                if (newOption === 'mobile') {
                  setScreenSize({ width: 414, height: 896 })
                } else if (newOption === 'tablet') {
                  setScreenSize({ width: 601, height: 962 })
                } else if (newOption === 'desktop') {
                  setScreenSize({ width: 1280, height: 720 })
                }
              }}
              css={{ border: 'none' }}
            >
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
              <option value="desktop">Desktop</option>
            </Select>
            <Text
              css={{ marginLeft: '16px', whiteSpace: 'nowrap' }}
              color={'playgroundText'}
            >
              ({screenSize.width} x {screenSize.height})
            </Text>
          </Box>
        </Box>
        <Box css={{ position: 'absolute' }}>
          <Box
            style={{
              width: screenSize.width,
              height: screenSize.height,
              transform: `scale(${scale})`,
            }}
            backgroundColor="bg"
          >
            <iframe srcDoc={transpiledCode} style={{ flexGrow: 1 }} />
          </Box>
        </Box>
      </Box>
    )
  }

  return <iframe srcDoc={transpiledCode} style={{ flexGrow: 1 }} />
}
