import { Box, Heading, Text } from '@chakra-ui/react'
import { OnboardingCard } from '../OnboardingCard'
import posthog from 'posthog-js'

export function Welcome({
  onUpdatePage,
  onFinishOnboarding,
}: {
  onUpdatePage: (page: number) => void
  onFinishOnboarding: () => void
}) {
  return (
    <Box>
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '48px',
        }}
      >
        <Heading fontWeight="black" fontSize={36}>
          Welcome to Mirrorful
        </Heading>
        <Text
          fontSize={20}
          color="gray.500"
          fontWeight="bold"
          marginTop={'18px'}
        >
          {`Let's get started by either creating a new theme or importing an existing one.`}
        </Text>
      </Box>
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          css={{
            width: '45%',
          }}
        >
          <OnboardingCard
            title="I don't have a theme yet."
            onClick={() => {
              posthog.capture('NO_THEME_YET')
              onUpdatePage(1)
            }}
            variant="ui"
          />
        </Box>
        {/* <Box css={{ width: '1px', backgroundColor: 'black' }} /> */}
        <Box
          css={{
            width: '45%',
          }}
        >
          <OnboardingCard
            title="I already have my own theme."
            onClick={() => {
              posthog.capture('ALREADY_HAS_THEME')
              onFinishOnboarding()
            }}
            variant="system"
          />
        </Box>
      </Box>
    </Box>
  )
}
