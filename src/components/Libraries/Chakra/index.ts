import { chakraBadgeData } from '@/components/Libraries/Chakra/ChakraBadge'
import { chakraButtonData } from '@/components/Libraries/Chakra/ChakraButton'
import { chakraCheckboxData } from '@/components/Libraries/Chakra/ChakraCheckbox'
import { chakraCodeData } from '@/components/Libraries/Chakra/ChakraCode'
import { chakraEditableData } from '@/components/Libraries/Chakra/ChakraEditable'
import { chakraIconButtonData } from '@/components/Libraries/Chakra/ChakraIconButton'
import { chakraInputData } from '@/components/Libraries/Chakra/ChakraInput'
import { chakraNumberInputData } from '@/components/Libraries/Chakra/ChakraNumberInput'
import { chakraPinInputData } from '@/components/Libraries/Chakra/ChakraPinInput'
import { chakraRadioData } from '@/components/Libraries/Chakra/ChakraRadio'
import { chakraRangeSliderData } from '@/components/Libraries/Chakra/ChakraRangeSlider'
import { chakraSelectData } from '@/components/Libraries/Chakra/ChakraSelect'
import { chakraSliderData } from '@/components/Libraries/Chakra/ChakraSlider'
import { chakraSwitchData } from '@/components/Libraries/Chakra/ChakraSwitch'
import { chakraTextareaData } from '@/components/Libraries/Chakra/ChakraTextarea'
import { TShowcaseData } from '@/types'

import { chakraAlertData } from './ChakraAlert'
import { chakraAlertDialogData } from './ChakraAlertDialog'
import { chakraCircularProgressData } from './ChakraCircularProgress'
import { chakraDrawerData } from './ChakraDrawer'
import { chakraHighlightData } from './ChakraHighlight'
import { chakraMenuData } from './ChakraMenu'
import { chakraModalData } from './ChakraModal'
import { chakraProgressData } from './ChakraProgress'
import { chakraSkeletonData } from './ChakraSkeleton'
import { chakraSpinnerData } from './ChakraSpinner'
import { chakraToastData } from './ChakraToast'
import { chakraTooltipData } from './ChakraTooltip'

export const CHAKRA_COMPONENT_DATA = [
  chakraAlertData,
  chakraAlertDialogData,
  chakraBadgeData,
  chakraButtonData,
  chakraCheckboxData,
  chakraCircularProgressData,
  chakraCodeData,
  chakraDrawerData,
  chakraEditableData,
  chakraHighlightData,
  chakraIconButtonData,
  chakraInputData,
  chakraMenuData,
  chakraModalData,
  chakraNumberInputData,
  chakraPinInputData,
  chakraProgressData,
  chakraRadioData,
  chakraRangeSliderData,
  chakraSelectData,
  chakraSkeletonData,
  chakraSliderData,
  chakraSpinnerData,
  chakraSwitchData,
  chakraTextareaData,
  chakraToastData,
  chakraTooltipData,
]

export const CHAKRA_SHOWCASE_DATA: TShowcaseData[] = [
  {
    name: 'Figma Config',
    library: 'chakra',
    previewSrc: '/showcaseChakraConfig.png',
    siteLink: 'https://config.figma.com/',
  },
  {
    name: 'Ethereum',
    library: 'chakra',
    previewSrc: '/showcaseChakraEth.png',
    siteLink: 'https://ethereum.org/en/',
  },
  {
    name: 'Typebot',
    library: 'chakra',
    previewSrc: '/showcaseChakraTypebot.png',
    siteLink: 'https://typebot.io/',
  },
  {
    name: 'Snappify',
    library: 'chakra',
    previewSrc: '/showcaseChakraSnappify.png',
    siteLink: 'https://snappify.com/',
  },
]
