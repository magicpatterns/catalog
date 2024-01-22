import { mantineActionIconData } from '@/components/Libraries/Mantine/MantineActionIcon'
import { mantineAutocompleteData } from '@/components/Libraries/Mantine/MantineAutocomplete'
import { mantineBadgeData } from '@/components/Libraries/Mantine/MantineBadge'
import { mantineButtonData } from '@/components/Libraries/Mantine/MantineButton'
import { mantineCheckboxData } from '@/components/Libraries/Mantine/MantineCheckbox'
import { mantineChipData } from '@/components/Libraries/Mantine/MantineChip'
import { mantineColorInputData } from '@/components/Libraries/Mantine/MantineColorInput'
import { mantineColorPickerData } from '@/components/Libraries/Mantine/MantineColorPicker'
import { mantineFileInputData } from '@/components/Libraries/Mantine/MantineFileInput'
import { mantineInputData } from '@/components/Libraries/Mantine/MantineInput'
import { mantineMultiSelectData } from '@/components/Libraries/Mantine/MantineMultiSelect'
import { mantineNativeSelectData } from '@/components/Libraries/Mantine/MantineNativeSelect'
import { mantineNumberInputData } from '@/components/Libraries/Mantine/MantineNumberInput'
import { mantinePasswordInputData } from '@/components/Libraries/Mantine/MantinePasswordInput'
import { mantinePinInput } from '@/components/Libraries/Mantine/MantinePinInput'
import { mantineRadioData } from '@/components/Libraries/Mantine/MantineRadio'
import { mantineRatingData } from '@/components/Libraries/Mantine/MantineRating'
import { mantineSegmentedControlData } from '@/components/Libraries/Mantine/MantineSegmentedControl'
import { mantineSelectData } from '@/components/Libraries/Mantine/MantineSelect'
import { mantineSliderData } from '@/components/Libraries/Mantine/MantineSlider'
import { mantineSwitchData } from '@/components/Libraries/Mantine/MantineSwitch'
import { mantineTextAreaData } from '@/components/Libraries/Mantine/MantineTextarea'
import { TShowcaseData } from '@/types'

export const MANTINE_COMPONENT_DATA = [
  mantineActionIconData,
  mantineAutocompleteData,
  mantineBadgeData,
  mantineButtonData,
  mantineCheckboxData,
  mantineChipData,
  mantineColorInputData,
  mantineColorPickerData,
  mantineFileInputData,
  mantineInputData,
  mantineMultiSelectData,
  mantineNativeSelectData,
  mantineNumberInputData,
  mantinePasswordInputData,
  mantinePinInput,
  mantineRadioData,
  mantineRatingData,
  mantineSegmentedControlData,
  mantineSelectData,
  mantineSliderData,
  mantineSwitchData,
  mantineTextAreaData,
]

export const MANTINE_SHOWCASE_DATA: TShowcaseData[] = [
  {
    name: 'Civitai',
    library: 'mantine',
    previewSrc: '/showcaseMantineCivitai.png',
    siteLink: 'https://civitai.com/',
  },
  {
    name: 'Jenni',
    library: 'mantine',
    previewSrc: '/showcaseMantineJenni.png',
    siteLink: 'https://jenni.ai/',
  },
  {
    name: 'Novu',
    library: 'mantine',
    previewSrc: '/showcaseMantineNovu.png',
    siteLink: 'https://novu.co/',
  },
  {
    name: 'Sizzy',
    library: 'mantine',
    previewSrc: '/showcaseMantineSizzy.png',
    siteLink: 'https://sizzy.co/',
  },
]
