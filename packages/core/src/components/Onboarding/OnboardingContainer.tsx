import { Box } from '@chakra-ui/react'

export function OnboardingContainer({
  primaryColor,
  children,
}: {
  primaryColor: string
  children: React.ReactNode
}) {
  return (
    <Box
      css={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          // background: `linear-gradient(120deg, ${primaryColor}, transparent), url(http://api.thumbr.it/whitenoise-361x370.png?background=4ea6caff&noise=626262&density=100&opacity=65)`,
          zIndex: -2,
          // background: `linear-gradient(120deg, ${primaryColor}, transparent))`,
          background: primaryColor,
          backgroundImage: `url('/noise.png')`,
        }}
      />
      <Box
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: -1,
          background:
            'linear-gradient(145deg, transparent, lightgray 70%, lightgray)',
        }}
      />

      <Box
        css={{
          backgroundColor: 'var(--background-color-primary)',
          borderRadius: 8,
        }}
        shadow="2xl"
        width={{
          base: '100%',
          md: '80%',
          lg: '75%',
        }}
        height={{
          base: '100%',
          md: '50%',
        }}
        minHeight={'600px'}
        minWidth={{
          md: '700px',
        }}
        maxWidth={'1000px'}
        padding={{
          base: '24px',
          md: '64px 128px',
          //   lg: '64px 128px',
        }}
        maxHeight={{
          md: '700px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
