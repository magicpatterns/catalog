import { MirrorfulApiEnvironment } from '@mirrorful-fern/api-client/environments'

export const DEFAULT_CODE = `
import React from 'react'
import { render } from 'react-dom'
import { PrimaryButton } from '@trigger-dev/components'

function App(){
    return (
        <PrimaryButton>Hello World</PrimaryButton>
    )
}

render(
    <App />,
    document.getElementById('root')
)
`

export const SOURCE_BOILERPLATE = (iframeCode: string) => `
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teddarific/example-component-library/lib/example.css">
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
