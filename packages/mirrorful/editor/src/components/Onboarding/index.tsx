import { Box, Heading, Text } from '@chakra-ui/react'
import { generateDefaultColorShades } from 'components/ColorPalette/utils'
import { useState } from 'react'
import { defaultTypography } from 'store/migrations'
import { TColorData } from 'types'
import { OnboardingCard } from './OnboardingCard'
import { OnboardingContainer } from './OnboardingContainer'
import { ImportInstructions } from './pages/ImportInstructions'
import { NamePrimary } from './pages/NamePrimary'
import { OtherColors } from './pages/OtherColors'
import { PickPrimary } from './pages/PickPrimary'
import { ReviewPrimary } from './pages/ReviewPrimary'
import { Welcome } from './pages/Welcome'

export function Onboarding({
  onFinishOnboarding,
}: {
  onFinishOnboarding: () => void
}) {
  const [primaryColor, setPrimaryColor] = useState<string>('#9F7AEA')
  const [primaryName, setPrimaryName] = useState<string>('')
  const [palette, setPalette] = useState<TColorData[]>([])

  const [page, setPage] = useState<number>(0)

  const handleExport = async (
    primaryColorHex: string,
    primaryColorName: string,
    latestPalette: TColorData[]
  ) => {
    const colors: TColorData[] = [
      {
        name: primaryColorName,
        baseColor: primaryColorHex,
        variants: generateDefaultColorShades(primaryColorHex),
      },
      ...latestPalette,
    ]

    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        tokens: { colorData: colors, typography: defaultTypography },
      }),
    })
  }

  let content = (
    <Welcome onFinishOnboarding={onFinishOnboarding} onUpdatePage={setPage} />
  )

  if (page === 1) {
    content = (
      <PickPrimary
        initialPrimary={primaryColor}
        onUpdatePage={setPage}
        onUpdatePrimaryColor={(newColor: string) => setPrimaryColor(newColor)}
      />
    )
  } else if (page === 2) {
    content = (
      <NamePrimary
        initialName={primaryName}
        onUpdatePage={setPage}
        primaryColor={primaryColor}
        onUpdatePrimaryName={(newName: string) => setPrimaryName(newName)}
      />
    )
  } else if (page === 3) {
    content = (
      <ReviewPrimary primaryColor={primaryColor} onUpdatePage={setPage} />
    )
  } else if (page === 4) {
    content = (
      <OtherColors
        initialPalette={palette}
        onUpdatePalette={(newPalette: TColorData[]) => {
          newPalette.map((color) => {
            if (color.baseColor) {
              color.variants = generateDefaultColorShades(color.baseColor)
            }
          })
          handleExport(primaryColor, primaryName, newPalette)
          setPalette(newPalette)
        }}
        primaryColor={primaryColor}
        primaryName={primaryName}
        onUpdatePage={setPage}
      />
    )
  } else if (page === 5) {
    content = (
      <ImportInstructions
        primaryColor={primaryColor}
        primaryName={primaryName}
        onUpdatePage={setPage}
        onFinish={onFinishOnboarding}
      />
    )
  }

  return <OnboardingContainer>{content}</OnboardingContainer>
}
