import { TypographySection } from '@core/components/Typography/TypographySection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TMirrorfulStore, TPrimitivesTypography } from '@core/types'

export function TypographyPage({
  postStoreData,
}: {
  postStoreData: (data: TMirrorfulStore) => Promise<void>
}) {
  const {
    typography,
    colors,
    shadows,
    setTypography,
    fileTypes,
    themes,
    metadata,
  } = useMirrorfulStore((state: MirrorfulState) => state)
  const handleUpdateTypography = async (data: TPrimitivesTypography) => {
    setTypography(data)
    await postStoreData({
      primitives: { colors, typography: data, shadows },
      themes,
      files: fileTypes,
      metadata,
    })
  }
  return (
    <TypographySection
      typography={{
        fontSizes: typography.fontSizes,
        fontWeights: typography.fontWeights,
        lineHeights: typography.lineHeights,
      }}
      onUpdateTypography={handleUpdateTypography}
    />
  )
}
