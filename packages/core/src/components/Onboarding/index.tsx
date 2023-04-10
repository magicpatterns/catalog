import { generateDefaultColorShades } from '@core/components/ColorPalette/utils'
import {
  defaultFiles,
  defaultShadows,
  defaultTypography,
  TColorData,
  TConfig,
  TExportFileType,
} from '@core/types'
import { useState } from 'react'

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

const namer = require('color-namer')

export function Onboarding({
  postStoreData,
  onFinishOnboarding,
  platform,
}: {
  postStoreData: (data: TConfig) => Promise<void>
  onFinishOnboarding: () => void
  platform: TPlatform
}) {
  const [primaryColor, setPrimaryColor] = useState<string>('#9F7AEA')
  const [primaryName, setPrimaryName] = useState<string>('')
  const [palette, setPalette] = useState<TColorData[]>([])
  const [fileTypes, setFileTypes] = useState<TExportFileType[]>(defaultFiles)

  const [page, setPage] = useState<number>(platform === 'web' ? 1 : 0)

  const updatePrimaryColor = (newColor: string) => {
    setPrimaryColor(newColor)
    const names = namer(newColor)
    setPrimaryName(names?.html[0]?.name)
  }

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

    await postStoreData({
      tokens: {
        colorData: colors,
        typography: defaultTypography,
        shadows: defaultShadows,
      },
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
        onUpdatePrimaryColor={(newColor: string) =>
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
        onUpdatePrimaryColor={(newColor: string) =>
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
        onUpdatePalette={(newPalette: TColorData[]) => {
          newPalette.map((color) => {
            if (color.baseColor) {
              color.variants = generateDefaultColorShades(color.baseColor)
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
