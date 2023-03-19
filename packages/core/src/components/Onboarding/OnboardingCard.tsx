import { Box, Text } from '@chakra-ui/react'
import { useLottie } from 'lottie-react'
import UiData from './lottie/mock_ui.json'
import SystemData from './lottie/design_system.json'
import { useState } from 'react'

export function OnboardingCard({
  title,
  onClick,
  variant,
}: {
  title: string
  onClick?: () => void
  variant: 'ui' | 'system'
}) {
  const options = {
    animationData: variant === 'ui' ? UiData : SystemData,
  }
  const { View } = useLottie(options)
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <Box
      css={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        border: '1px solid black',
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'all 200ms ease-in-out',
      }}
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
      onMouseOver={() => {
        setIsHovering(true)
      }}
      onMouseLeave={() => {
        setIsHovering(false)
      }}
      shadow={isHovering ? 'dark-lg' : 'none'}
    >
      <Box
        css={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box css={{ padding: '24px 36px' }}>
          <Text
            css={{ textAlign: 'center', marginBottom: '20px' }}
            fontSize={18}
            fontWeight="bold"
          >
            {title}
          </Text>
        </Box>

        <Box css={{ width: 150, height: 200 }}>{View}</Box>
      </Box>
    </Box>
  )
}
