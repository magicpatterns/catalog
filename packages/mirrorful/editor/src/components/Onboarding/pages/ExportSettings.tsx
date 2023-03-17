import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  Stack,
  Text,
  Heading,
  Button,
  CheckboxGroup,
  VStack,
  Checkbox,
} from '@chakra-ui/react'
import { generateDefaultColorShades } from 'components/ColorPalette/utils'
import { defaultFiles } from 'store/migrations'
import tinycolor from 'tinycolor2'
import { TExportFileType } from 'types'
import { getExportFileTypeName } from 'utils/getExportFileTypeString'
import { NUMBER_OF_STEPS_IN_NEW_FLOW } from '../constants'

type Props = {
  primaryColor: string
  fileTypes: TExportFileType[]
  onUpdateFileTypes: (next: TExportFileType[]) => void
  onExport: () => void
  onUpdatePage: (page: number) => void
}

export function ExportSettings({
  primaryColor,
  fileTypes,
  onUpdateFileTypes,
  onExport,
  onUpdatePage,
}: Props) {
  const shades = generateDefaultColorShades(primaryColor)

  return (
    <Box css={{ display: 'flex', height: '100%' }}>
      <Box
        width="50%"
        padding="12px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box paddingTop="32px">
          <Stack spacing={1} direction={'row'}>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              05
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={18}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              {NUMBER_OF_STEPS_IN_NEW_FLOW}
            </Text>
          </Stack>
          <Heading fontWeight="black" marginTop="12px" fontSize={36}>
            Choose your export files.
          </Heading>
          <Text
            marginTop="32px"
            fontSize={20}
            color="gray.500"
            fontWeight="bold"
          >
            These are the token files that Mirrorful will export.
          </Text>
        </Box>
        <Box paddingBottom="32px">
          <Button
            bgColor={shades['500']}
            color={tinycolor(primaryColor).isDark() ? 'white' : 'black'}
            _hover={{
              bgColor: shades['700'],
            }}
            _active={{
              bgColor: shades['800'],
            }}
            padding="8px 36px"
            size="lg"
            rightIcon={<ArrowForwardIcon />}
            onClick={() => {
              onExport()
              onUpdatePage(6)
            }}
            isDisabled={!fileTypes.length}
          >
            Next
          </Button>
        </Box>
      </Box>
      <Box
        width="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="64px"
      >
        <CheckboxGroup defaultValue={fileTypes} onChange={onUpdateFileTypes}>
          <VStack alignItems="flex-start">
            {defaultFiles.map((x) => (
              <Checkbox key={x} value={x}>
                {getExportFileTypeName(x)}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
      </Box>
    </Box>
  )
}
