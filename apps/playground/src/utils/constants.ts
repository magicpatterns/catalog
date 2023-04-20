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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teddarific/example-component-library/lib/example.css">
</head>
<body style="color:white; width:100vw; height:100vh;">
  <div id="root"></div>
  <script type="module">${iframeCode}</script>
</body>
</html>
`
