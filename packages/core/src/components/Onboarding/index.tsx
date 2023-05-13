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
import { useAuthInfo } from '@propelauth/react'
import type { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { useState } from 'react'
import { AnyColor } from 'react-colorful/dist/types'
import tinycolor from 'tinycolor2'
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
import { nameThatColor } from './utils'

export function Onboarding({
  postStore,
  onFinishOnboarding,
  platform,
}: {
  postStore: (
    data: TMirrorfulStore,
    authInfo: UseAuthInfoProps
  ) => Promise<void>
  onFinishOnboarding: () => void
  platform: TPlatform
}) {
  const authInfo = useAuthInfo()
  const [primaryColor, setPrimaryColor] = useState<AnyColor>('#9F7AEA')
  const [primaryName, setPrimaryName] = useState<string>('')
  const [palette, setPalette] = useState<TTokenGroup>({})
  const [fileTypes, setFileTypes] = useState<TExportFileType[]>(defaultFiles)

  const [page, setPage] = useState<number>(platform === 'web' ? 1 : 0)

  const colorParsed = tinycolor(primaryColor)
  const colorStringified = colorParsed.toString()

  const updatePrimaryColor = (newColor: AnyColor) => {
    // set the color in state
    setPrimaryColor(newColor)

    const hslColor = tinycolor(newColor).toHsl()
    const name = nameThatColor(hslColor)
    setPrimaryName(name)
  }

  const handleExport = async (
    primaryColorStringified: string,
    primaryColorName: string,
    paletteGroupTokens: TTokenGroup
  ) => {
    const primaryColorTokenGroup: TTokenGroup = {
      DEFAULT: {
        id: uuidv4(),
        value: primaryColorStringified,
        type: 'color',
      },
      ...defaultColorShadesToTokens(
        generateDefaultColorShades({ primary: primaryColorStringified })
      ),
    }

    const colors: TTokenGroup = {
      [primaryColorName]: primaryColorTokenGroup,
      ...paletteGroupTokens,
    }

    await postStore(
      {
        primitives: {
          colors,
          typography: defaultTypographyV2,
          shadows: defaultShadowsV2,
        },
        themes: [],
        files: fileTypes,
      },
      authInfo
    )
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
        onUpdatePrimaryColor={(newColor: AnyColor) =>
          updatePrimaryColor(newColor)
        }
        platform={platform}
      />
    )
  }

  if (page === 1) {
    content = (
      <PickPrimary
        primaryColor={primaryColor}
        onUpdatePage={setPage}
        onUpdatePrimaryColor={(newColor: AnyColor) =>
          updatePrimaryColor(newColor)
        }
        platform={platform}
      />
    )
  } else if (page === 2) {
    content = (
      <NamePrimary
        initialName={primaryName}
        onUpdatePage={setPage}
        primaryColor={colorStringified}
        onUpdatePrimaryName={(newName: string) => setPrimaryName(newName)}
        platform={platform}
      />
    )
  } else if (page === 3) {
    content = (
      <ReviewPrimary
        primaryColor={colorStringified}
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
                  generateDefaultColorShades({ primary: `${color.value}` })
                ),
              }
            }
          })
          setPalette(newPalette)

          if (platform === 'web') {
            handleExport(colorStringified, primaryName, newPalette)
          }
        }}
        primaryColor={colorStringified}
        primaryName={primaryName}
        onUpdatePage={setPage}
        platform={platform}
      />
    )
  } else if (page === 5) {
    content = (
      <ExportSettings
        primaryColor={colorStringified}
        fileTypes={fileTypes}
        onUpdateFileTypes={setFileTypes}
        onExport={() => {
          handleExport(colorStringified, primaryName, palette)
        }}
        onUpdatePage={setPage}
        platform={platform}
      />
    )
  } else if (page === 6) {
    content = (
      <ImportInstructions
        primaryColor={colorStringified}
        primaryName={primaryName}
        onUpdatePage={setPage}
        platform={platform}
      />
    )
  } else if (page === 7) {
    content = (
      <Referral
        primaryColor={colorStringified}
        onFinish={() => {
          onFinishOnboarding()
        }}
        platform={platform}
      />
    )
  }

  return (
    <OnboardingContainer primaryColor={colorStringified}>
      {content}
    </OnboardingContainer>
  )
}
