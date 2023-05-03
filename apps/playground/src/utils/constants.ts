import { MirrorfulApiEnvironment } from '@mirrorful-fern/api-client/environments'

export const LIBRARY_CONTEXT: 'fabra' | 'triggerdev' = import.meta.env
  .VITE_LIBRARY_CONTEXT

let DEFAULT_STYLES = ''
if (LIBRARY_CONTEXT === 'fabra') {
  DEFAULT_STYLES =
    'https://cdn.jsdelivr.net/gh/teddarific/example-component-library/lib/fabra/fabra-css.css'
} else if (LIBRARY_CONTEXT === 'triggerdev') {
  DEFAULT_STYLES =
    'https://cdn.jsdelivr.net/gh/teddarific/example-component-library/lib/example.css'
}

export const SOURCE_BOILERPLATE = (iframeCode: string) => `
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="${DEFAULT_STYLES}">
  </head>
<body style="color:white; width:100vw; height:100vh;">
  <div id="root" style="width: 100vw; height: 100vh"></div>
  <script type="module">${iframeCode}</script>
</body>
</html>
`

export const API_ENV =
  process.env.NODE_ENV === 'production'
    ? MirrorfulApiEnvironment.Production
    : MirrorfulApiEnvironment.Development

const FABRA_DEFAULT_CODE = `
import React from 'react'
import { render } from 'react-dom'
import { Button } from '@fabra/components'

function App(){
  return (
    <Button>Hello World</Button>
  )
}

render(
  <App />,
  document.getElementById('root')
)
`

const TRIGGERDEV_DEFAULT_CODE = `

import React from 'react'
import { render } from 'react-dom'
import { PrimaryButton, Header1, ToxicText, Paragraph, PrimaryLink, SecondaryLink } from '@trigger-dev/components'

function App(){
    return (
        <div>
            <Header1
              theme="dark"
              className="px-8 text-center text-3xl font-extrabold tracking-tight text-slate-300 md:text-5xl lg:px-0 lg:text-left"
            >
              Effortless automation <br></br>
              <ToxicText>built for developers</ToxicText>
            </Header1>

            <Paragraph
              size="small"
              theme="dark"
              className="flex py-4 text-center lg:py-2 lg:pr-4 lg:text-left"
            >
              Trigger workflows from APIs, on a schedule, or on demand. API
     are easy with authentication handled for you. Add durable
              delays that surviv         calls e server restarts.
            </Paragraph>

            <div className="mt-4 mr-4 flex flex-col items-center justify-center pb-8 sm:px-12 md:mt-8 md:gap-x-4 lg:flex-row lg:justify-start lg:px-0  lg:pb-0">
              <PrimaryLink
                className="group mb-4 flex h-10 rounded px-2 text-lg md:h-12 md:px-4 md:text-lg lg:mb-0"
                to="https://app.trigger.dev"
              >
                <span>Get started for free</span>
                <span
                  className="ml-2 transition group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </PrimaryLink>

              <SecondaryLink
                to="https://app.trigger.dev/templates"
                className="py-1/2 text-midnight-1000 group mb-4  flex h-10 items-center justify-center whitespace-nowrap rounded border-violet-500 bg-gradient-secondary-button py-1 px-2 text-lg font-bold transition duration-500 hover:border-slate-200 hover:bg-gradient-secondary-hover focus:outline-none focus:ring-violet-500 sm:w-auto md:h-12 md:px-4 md:text-lg lg:mb-0"
              >
                Browse templates
              </SecondaryLink>
            </div>
        </div>
    )
}

render(
    <App />,
    document.getElementById('root')
)

`

let DEFAULT_CODE_TO_USE = ''
console.log(LIBRARY_CONTEXT)
if (LIBRARY_CONTEXT === 'fabra') {
  DEFAULT_CODE_TO_USE = FABRA_DEFAULT_CODE
} else if (LIBRARY_CONTEXT === 'triggerdev') {
  DEFAULT_CODE_TO_USE = TRIGGERDEV_DEFAULT_CODE
}

export const DEFAULT_FEATURE_CODE = DEFAULT_CODE_TO_USE
