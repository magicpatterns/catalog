import {
  defaultColorShadesToTokens,
  generateDefaultColorShades,
} from '@core/components/ColorPalette/utils'
import {
  assertToken,
  defaultFiles,
  defaultShadowsV2,
  defaultTypographyV2,
  TExportFileType,
  TMirrorfulStore,
  TTokenGroup,
} from '@core/types'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { TPlatform } from '../Layout'
import { OnboardingContainer } from './OnboardingContainer'
import { ExportSettings } from './pages/ExportSettings'
import { ImportInstructions } from './pages/ImportInstructions'
import { NamePrimary } from './pages/NamePrimary'
import { OtherColors } from './pages/OtherColors'
import { PickPrimary } from './pages/PickPrimary'
import { Referral } from './pages/Referral'
import { ReviewPrimary } from './pages/ReviewPrimary'
import { Welcome } from './pages/Welcome'

export function Onboarding({
  postStoreData,
  onFinishOnboarding,
  platform,
}: {
  postStoreData: (data: TMirrorfulStore) => Promise<void>
  onFinishOnboarding: () => void
  platform: TPlatform
}) {
  const [primaryColor, setPrimaryColor] = useState<string>('#9F7AEA')
  const [primaryName, setPrimaryName] = useState<string>('')
  const [palette, setPalette] = useState<TTokenGroup>({})
  const [fileTypes, setFileTypes] = useState<TExportFileType[]>(defaultFiles)

  const [page, setPage] = useState<number>(platform === 'web' ? 1 : 0)

  const handleExport = async (
    primaryColorHex: string,
    primaryColorName: string,
    paletteGroupTokens: TTokenGroup
  ) => {
    const primaryColorTokenGroup: TTokenGroup = {
      DEFAULT: {
        id: uuidv4(),
        value: primaryColorHex,
        type: 'color',
      },
      ...defaultColorShadesToTokens(
        generateDefaultColorShades(primaryColorHex)
      ),
    }

    const colors: TTokenGroup = {
      [primaryColorName]: primaryColorTokenGroup,
      ...paletteGroupTokens,
    }

    await postStoreData({
      primitives: {
        colors,
        typography: defaultTypographyV2,
        shadows: defaultShadowsV2,
      },
      themes: [],
      files: fileTypes,
    })
  }

  let content
  if (platform === 'package') {
    content = (
      <Welcome
        onFinishOnboarding={onFinishOnboarding}
        onUpdatePage={setPage}
        platform={platform}
      />
    )
  } else {
    content = (
      <PickPrimary
        primaryColor={primaryColor}
        onUpdatePage={setPage}
        onUpdatePrimaryColor={(newColor: string) => setPrimaryColor(newColor)}
        platform={platform}
      />
    )
  }

  if (page === 1) {
    content = (
      <PickPrimary
        primaryColor={primaryColor}
        onUpdatePage={setPage}
        onUpdatePrimaryColor={(newColor: string) => setPrimaryColor(newColor)}
        platform={platform}
      />
    )
  } else if (page === 2) {
    content = (
      <NamePrimary
        initialName={primaryName}
        onUpdatePage={setPage}
        primaryColor={primaryColor}
        onUpdatePrimaryName={(newName: string) => setPrimaryName(newName)}
        platform={platform}
      />
    )
  } else if (page === 3) {
    content = (
      <ReviewPrimary
        primaryColor={primaryColor}
        onUpdatePage={setPage}
        platform={platform}
      />
    )
  } else if (page === 4) {
    content = (
      <OtherColors
        initialPalette={palette}
        onUpdatePalette={(newPalette: TTokenGroup) => {
          Object.keys(newPalette).map((colorName) => {
            const color = newPalette[colorName]
            if (assertToken(color)) {
              newPalette[colorName] = {
                DEFAULT: {
                  ...newPalette[colorName],
                },
                ...defaultColorShadesToTokens(
                  generateDefaultColorShades(`${color.value}`)
                ),
              }
            }
          })
          setPalette(newPalette)

          if (platform === 'web') {
            handleExport(primaryColor, primaryName, newPalette)
          }
        }}
        primaryColor={primaryColor}
        primaryName={primaryName}
        onUpdatePage={setPage}
        platform={platform}
      />
    )
  } else if (page === 5) {
    content = (
      <ExportSettings
        primaryColor={primaryColor}
        fileTypes={fileTypes}
        onUpdateFileTypes={setFileTypes}
        onExport={() => {
          handleExport(primaryColor, primaryName, palette)
        }}
        onUpdatePage={setPage}
        platform={platform}
      />
    )
  } else if (page === 6) {
    content = (
      <ImportInstructions
        primaryColor={primaryColor}
        primaryName={primaryName}
        onUpdatePage={setPage}
        platform={platform}
      />
    )
  } else if (page === 7) {
    content = (
      <Referral
        primaryColor={primaryColor}
        onFinish={() => {
          onFinishOnboarding()
        }}
        platform={platform}
      />
    )
  }

  return (
    <OnboardingContainer primaryColor={primaryColor}>
      {content}
    </OnboardingContainer>
  )
}
