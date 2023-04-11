import { Button } from '@chakra-ui/react'
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
  const {
    typography,
    colors,
    shadows,
    setTypography,
    fileTypes,
    setShadows,
    setColors,
  } = useMirrorfulStore((state: MirrorfulState) => state)
  const handleUpdateTypography = async (data: TTypographyData) => {
    setTypography(data)
    await postStoreData({
      tokens: { colorData: colors, typography: data, shadows },
      files: fileTypes,
    })
  }
  const deleteData = async () => {
    setColors([])
    setShadows([])
    setTypography({ fontSizes: [], fontWeights: [], lineHeights: [] })
    await postStoreData({
      tokens: {
        colorData: [],
        typography: { fontSizes: [], fontWeights: [], lineHeights: [] },
        shadows: [],
      },
      files: fileTypes,
    })
  }
  return (
    <>
      <Button onClick={deleteData} colorScheme="red">
        Delete Variant
      </Button>
      <TypographySection
        typography={{
          fontSizes: typography.fontSizes,
          fontWeights: typography.fontWeights,
          lineHeights: typography.lineHeights,
        }}
        onUpdateTypography={handleUpdateTypography}
      />
    </>
  )
}
