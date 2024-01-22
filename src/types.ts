export type TLibrary =
  | 'chakra'
  | 'mui'
  | 'radix'
  | 'radix themes'
  | 'radix primitives'
  | 'shadcn'
  | 'mantine'
  | 'daisy'
  | 'ant'
  | 'ariakit'
  | 'bootstrap'

export const STYLING_LOGOS = {
  Tailwind: '/tailwind.png',
  Inline: '/inline.png',
  'Custom Theming': '/bookmark_icon.png',
  'Styled Components': '/styled_components_logo.png',
}

export const LIBRARY_LOGOS = {
  chakra: '/chakra.png',
  ['Chakra UI']: '/chakra.png',
  'Radix Themes': '/radix.png',
  mui: '/mui.png',
  ['Material UI']: '/mui.png',
  Shadcn: '/shadcn.png',
  radix: '/radix.png',
  'radix themes': '/radix.png',
  'radix primitives': '/radix.png',
  shadcn: '/shadcn.png',
  Mantine: '/mantine.png',
  mantine: '/mantine.png',
  daisy:
    'https://raw.githubusercontent.com/saadeghi/daisyui/master/src/docs/static/images/daisyui-logo/favicon-192.png',
  ant: '/antD.svg',
  ['Ant Design']: '/antD.svg',

  ariakit: 'https://avatars.githubusercontent.com/u/40200111?s=200&v=4',
  bootstrap:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/800px-Bootstrap_logo.svg.png',
  custom: '/bookmark_icon.png',
  Custom: '/bookmark_icon.png',
  HTML: '/HTML5_Logo_128.png',
  Bootstrap:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/800px-Bootstrap_logo.svg.png',
}

export type TComponentData = {
  name: string
  library?: TLibrary
  component: React.ReactNode
  tags: string[]
  docsLink?: string
}

export type TShowcaseData = {
  name: string
  library: TLibrary
  previewSrc: string
  siteLink: string
}
