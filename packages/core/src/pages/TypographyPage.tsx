import { TypographySection } from '@core/components/Typography/TypographySection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TConfig, TTypographyData } from '@core/types'

export function TypographyPage({
  postStoreData,
}: {
  postStoreData: (data: TConfig) => Promise<void>
}) {
  const { typography, colors, shadows, setTypography, fileTypes } =
    useMirrorfulStore((state: MirrorfulState) => state)
  const handleUpdateTypography = async (data: TTypographyData) => {
    setTypography(data)
    await postStoreData({
      tokens: { colorData: colors, typography: data, shadows },
      files: fileTypes,
    })
  }
  return (
    <TypographySection
      typography={{
        fontSizes: typography.fontSizes,
        fontWeights: typography.fontWeights,
      }}
      onUpdateTypography={handleUpdateTypography}
    />
  )
}
