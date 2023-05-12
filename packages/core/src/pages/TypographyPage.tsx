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
  const setTypography = useMirrorfulStore(
    (state: MirrorfulState) => state.setTypography
  )
  const colors = useMirrorfulStore((state: MirrorfulState) => state.colors)
  const typography = useMirrorfulStore(
    (state: MirrorfulState) => state.typography
  )
  const shadows = useMirrorfulStore((state: MirrorfulState) => state.shadows)
  const fileTypes = useMirrorfulStore(
    (state: MirrorfulState) => state.fileTypes
  )
  const themes = useMirrorfulStore((state: MirrorfulState) => state.themes)

  const handleUpdateTypography = async (data: TPrimitivesTypography) => {
    setTypography(data)
    await postStoreData({
      primitives: { colors, typography: data, shadows },
      themes,
      files: fileTypes,
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
