import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Checkbox, Heading, Stack, Text } from '@chakra-ui/react'
import { generateDefaultColorShades } from '@core/components/ColorPalette/utils'
import { TPlatform } from '@core/components/Dashboard'
import { posthog } from 'posthog-js'
import { useState } from 'react'
import tinycolor from 'tinycolor2'

import { getNumberOfStepsInOnboardingFlow } from '../constants'

export function Referral({
  onFinish,
  primaryColor,
  platform,
}: {
  onFinish: () => void
  primaryColor: string
  platform: TPlatform
}) {
  const [isRedditChecked, setIsRedditChecked] = useState<boolean>(false)
  const [isTwitterChecked, setIsTwitterChecked] = useState<boolean>(false)
  const [isYouTubeChecked, setIsYouTubeChecked] = useState<boolean>(false)
  const [isBlogChecked, setIsBlogChecked] = useState<boolean>(false)
  const [isTikTokChecked, setIsTikTokChecked] = useState<boolean>(false)
  const [isFriendChecked, setIsFriendChecked] = useState<boolean>(false)
  const [isGithubChecked, setIsGithubChecked] = useState<boolean>(false)
  const [isOtherChecked, setIsOtherChecked] = useState<boolean>(false)
  const [isHackerNewsChecked, setIsHackerNewsChecked] = useState<boolean>(false)

  const shades = generateDefaultColorShades(primaryColor)

  return (
    <Box css={{ display: 'flex', height: '100%' }} as="form">
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
              {platform === 'web' ? '05' : '07'}
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={18}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              {getNumberOfStepsInOnboardingFlow(platform)}
            </Text>
          </Stack>

          <Heading fontWeight="black" css={{ marginTop: '12px' }} fontSize={36}>
            One last thing...
          </Heading>
          <Text
            css={{ marginTop: '32px' }}
            fontSize={20}
            color="gray.500"
            fontWeight="bold"
          >
            {`...before we let you create the greatest design system of all time.`}
          </Text>
        </Box>
        <Box css={{ paddingBottom: '32px' }}>
          <Button
            size="lg"
            onClick={() => {
              onFinish()
            }}
            css={{ marginRight: '16px' }}
          >
            Skip
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
              if (isRedditChecked) {
                posthog.capture('onboarding-referral-reddit')
              }

              if (isTwitterChecked) {
                posthog.capture('onboarding-referral-twitter')
              }

              if (isBlogChecked) {
                posthog.capture('onboarding-referral-blog')
              }

              if (isFriendChecked) {
                posthog.capture('onboarding-referral-friend')
              }

              if (isOtherChecked) {
                posthog.capture('onboarding-referral-other')
              }

              if (isGithubChecked) {
                posthog.capture('onboarding-referral-github')
              }

              if (isTikTokChecked) {
                posthog.capture('onboarding-referral-tiktok')
              }

              if (isYouTubeChecked) {
                posthog.capture('onboarding-referral-youtube')
              }

              if (isHackerNewsChecked) {
                posthog.capture('onboarding-referral-hackernews')
              }

              onFinish()
            }}
            type="submit"
          >
            Finish
          </Button>
        </Box>
      </Box>
      <Box
        css={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '64px 32px',
        }}
      >
        <Text
          css={{ alignSelf: 'flex-start', marginBottom: '4px' }}
          fontWeight="bold"
          fontSize={'1.5rem'}
        >
          How did you hear about Mirrorful?
        </Text>
        <Stack alignItems={'flex-start'} css={{ marginTop: '16px' }}>
          <Checkbox
            isChecked={isRedditChecked}
            onChange={(e) => setIsRedditChecked(e.target.checked)}
          >
            Reddit
          </Checkbox>
          <Checkbox
            isChecked={isTwitterChecked}
            onChange={(e) => setIsTwitterChecked(e.target.checked)}
          >
            Twitter
          </Checkbox>
          <Checkbox
            isChecked={isYouTubeChecked}
            onChange={(e) => setIsYouTubeChecked(e.target.checked)}
          >
            YouTube
          </Checkbox>
          <Checkbox
            isChecked={isBlogChecked}
            onChange={(e) => setIsBlogChecked(e.target.checked)}
          >
            Mirrorful Blog
          </Checkbox>
          <Checkbox
            isChecked={isTikTokChecked}
            onChange={(e) => setIsTikTokChecked(e.target.checked)}
          >
            TikTok
          </Checkbox>
          <Checkbox
            isChecked={isGithubChecked}
            onChange={(e) => setIsGithubChecked(e.target.checked)}
          >
            Github
          </Checkbox>
          <Checkbox
            isChecked={isHackerNewsChecked}
            onChange={(e) => setIsHackerNewsChecked(e.target.checked)}
          >
            HackerNews
          </Checkbox>
          <Checkbox
            isChecked={isFriendChecked}
            onChange={(e) => setIsFriendChecked(e.target.checked)}
          >
            Friend/Referral
          </Checkbox>
          <Checkbox
            isChecked={isOtherChecked}
            onChange={(e) => setIsOtherChecked(e.target.checked)}
          >
            Other
          </Checkbox>
        </Stack>
      </Box>
    </Box>
  )
}
