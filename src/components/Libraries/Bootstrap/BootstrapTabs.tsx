import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { TComponentData } from '@/types'

export function BootstrapTabs() {
  return (
    <div style={{ height: '50px' }}>
      <Tabs defaultActiveKey="profile">
        <Tab eventKey="home" title="1">
          One
        </Tab>
        <Tab eventKey="profile" title="2">
          Two
        </Tab>
        <Tab eventKey="contact" title="3">
          Three
        </Tab>
      </Tabs>
    </div>
  )
}

export const bootstrapTabsData: TComponentData = {
  name: 'Tabs',
  library: 'bootstrap',
  component: <BootstrapTabs />,
  tags: ['bootstrap', 'tabs'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/tabs',
}
