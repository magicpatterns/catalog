import './Hovercardstyle.css'

import * as Ariakit from '@ariakit/react'

import { TComponentData } from '@/types'

export function AriakitHovercard() {
  const hovercard = Ariakit.useHovercardStore()
  return (
    <div className="wrapper">
      <Ariakit.HovercardAnchor
        store={hovercard}
        href="https://twitter.com/ariakitjs"
        className="anchor"
      >
        @ariakitjs
      </Ariakit.HovercardAnchor>
      <Ariakit.Hovercard store={hovercard} gutter={16} className="hovercard">
        <img
          src="https://pbs.twimg.com/profile_images/1547936373243490306/dSn6Am0o_400x400.jpg"
          alt="Ariakit"
          className="avatar"
        />
        <Ariakit.HovercardHeading className="username">
          Ariakit
        </Ariakit.HovercardHeading>
        <p>Toolkit for building accessible web apps with React.</p>
        <a href="https://twitter.com/ariakitjs" className="button primary flat">
          Follow
        </a>
      </Ariakit.Hovercard>
    </div>
  )
}

export const ariakitHovercardData: TComponentData = {
  name: 'Hovercard',
  library: 'ariakit',
  component: <AriakitHovercard />,
  tags: ['ariakit', 'hovercard', 'card', 'hover'],
  docsLink: 'https://ariakit.org/components/hovercard',
}
