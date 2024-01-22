import { TShowcaseData } from '@/types'

import { bootstrapAccordionData } from './BootstrapAccordion'
import { bootstrapAlertData } from './BootstrapAlert'
import { bootstrapBadgeData } from './BootstrapBadge'
import { bootstrapBreadcrumbsData } from './BootstrapBreadcrumbs'
import { bootstrapButtonData } from './BootstrapButton'
import { bootstrapButtonGroupData } from './BootstrapButtonGroup'
import { bootstrapCarouselData } from './BootstrapCarousel'
import { bootstrapCheckboxData } from './BootstrapCheckbox'
import { bootstrapDropdownData } from './BootstrapDropdown'
import { bootstrapModalData } from './BootstrapModal'
import { bootstrapPaginationData } from './BootstrapPagination'
import { bootstrapPlaceholderData } from './BootstrapPlaceholder'
import { bootstrapProgressBarData } from './BootstrapProgressBar'
import { bootstrapRadioData } from './BootstrapRadio'
import { bootstrapRangeData } from './BootstrapRange'
import { bootstrapSelectData } from './BootstrapSelect'
import { bootstrapSpinnerData } from './BootstrapSpinner'
import { bootstrapTabsData } from './BootstrapTabs'
import { bootstrapTextInputData } from './BootstrapTextInput'

export const BOOTSTRAP_COMPONENT_DATA = [
  bootstrapAccordionData,
  bootstrapAlertData,
  bootstrapBadgeData,
  bootstrapBreadcrumbsData,
  bootstrapButtonData,
  bootstrapButtonGroupData,
  bootstrapCarouselData,
  bootstrapCheckboxData,
  bootstrapDropdownData,
  bootstrapModalData,
  bootstrapPaginationData,
  bootstrapPlaceholderData,
  bootstrapProgressBarData,
  bootstrapRadioData,
  bootstrapRangeData,
  bootstrapSelectData,
  bootstrapSpinnerData,
  bootstrapTabsData,
  bootstrapTextInputData,
]

export const BOOTSTRAP_SHOWCASE_DATA: TShowcaseData[] = [
  {
    name: 'Envato',
    library: 'bootstrap',
    previewSrc: '/showcaseBootstrapEnvato.png',
    siteLink: 'https://www.envato.com/',
  },
  {
    name: 'LogRocket',
    library: 'bootstrap',
    previewSrc: '/showcaseBootstrapLogRocket.png',
    siteLink: 'https://logrocket.com/',
  },
  {
    name: 'Trello',
    library: 'bootstrap',
    previewSrc: '/showcaseBootstrapTrello.png',
    siteLink: 'https://trello.com/',
  },
  {
    name: 'JetBrains',
    library: 'bootstrap',
    previewSrc: '/showcaseBootstrapJetbrains.png',
    siteLink: 'https://www.jetbrains.com/',
  },
  {
    name: 'Super Mario Odyssey',
    library: 'bootstrap',
    previewSrc: '/showcaseBootstrapSMO.png',
    siteLink:
      'https://www.nintendo.co.uk/Games/Nintendo-Switch-games/Super-Mario-Odyssey-1173332.html',
  },
  {
    name: 'Colormind',
    library: 'bootstrap',
    previewSrc: '/showcaseBootstrapColormind.png',
    siteLink: 'http://colormind.io/',
  },
]
