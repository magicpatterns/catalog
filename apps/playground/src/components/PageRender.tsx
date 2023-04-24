import { Box, Select, Text, Icon } from '@chakra-ui/react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { FiX } from 'react-icons/fi'

type TScreenSizeOptions = 'mobile' | 'tablet' | 'desktop'

export function PageRender({
  transpiledCode,
  isResponsiveMode,
  onCloseResponsiveMode,
}: {
  transpiledCode: string
  isResponsiveMode: boolean
  onCloseResponsiveMode: () => void
}) {
  const frameContainer = useRef<HTMLDivElement>(null)
  const [screenSizeOption, setScreenSizeOption] =
    useState<TScreenSizeOptions>('mobile')
  const [screenSize, setScreenSize] = useState<{
    width: number
    height: number
  }>({ width: 414, height: 896 })

  const calculateScale = useCallback(() => {
    if (frameContainer.current) {
      const { width, height } = frameContainer.current.getBoundingClientRect()

      const limitingWidthScale = (0.8 * width) / screenSize.width
      const limitingHeightScale = (0.8 * height) / screenSize.height

      const scale = Math.min(limitingWidthScale, limitingHeightScale)

      return scale
    }

    return 0.5
  }, [screenSize, frameContainer.current, isResponsiveMode])

  const scale = calculateScale()

  let content = (
    <iframe srcDoc={transpiledCode} style={{ flexGrow: 1, height: '100%' }} />
  )

  if (isResponsiveMode) {
    content = (
      <>
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
              justifyContent: 'space-between',
              width: '100%',
            }}
            paddingX={'14px'}
          >
            <Box css={{ display: 'flex', alignItems: 'center' }}>
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
                <option value="responsive" disabled>
                  Responsive (COMING SOON)
                </option>
              </Select>
              <Text
                css={{ marginLeft: '16px', whiteSpace: 'nowrap' }}
                color={'playgroundText'}
              >
                ({screenSize.width} x {screenSize.height})
              </Text>
            </Box>
            <Box>
              <Icon
                as={FiX}
                color="playgroundText"
                css={{
                  cursor: 'pointer',
                }}
                _hover={{ color: 'playgroundTextHover' }}
                onClick={onCloseResponsiveMode}
              />
            </Box>
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
            <iframe
              srcDoc={transpiledCode}
              style={{ flexGrow: 1, zIndex: 1 }}
            />
          </Box>
        </Box>
      </>
    )
  }

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
        padding: '24px',
      }}
      backgroundColor={isResponsiveMode ? 'space.500' : 'bg'}
      ref={frameContainer}
    >
      {content}
    </Box>
  )
}
