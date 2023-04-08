import { Box, Text } from '@chakra-ui/react'
import { TLineHeightVariant } from '@core/types'

export function LineHeightData({
  lineHeightData,
}: {
  lineHeightData: TLineHeightVariant
}) {
  let lineHeight = ''
  switch (lineHeightData.unit) {
    case 'number':
      lineHeight = `${lineHeightData.value}`
      break
    case 'percent':
      lineHeight = `${lineHeightData.value}%`
      break
    case 'length':
      lineHeight = `${lineHeightData.value}${lineHeightData.lengthUnit}`
      break
  }

  return (
    <>
      <Box>
        <Text css={{ fontWeight: 'bold', width: 100 }} fontSize={18}>
          {lineHeight.replace(/(\d)([a-z%])/i, '$1 $2')}
        </Text>
      </Box>
      <Box
        css={{
          fontSize: '2rem',
          fontWeight: 'normal',
          width: '100%',
          lineHeight: lineHeight,
        }}
      >
        Lorem ipsum dolor sit amet.
        <br />
        Illum omnis, sunt corrupti.
      </Box>
    </>
  )
}
