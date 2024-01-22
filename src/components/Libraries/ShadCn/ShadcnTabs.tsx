import { TComponentData } from '@/types'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './raw/ui/tabs'

export function ShadcnTabs() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  )
}

export const shadcnTabsData: TComponentData = {
  name: 'Tabs',
  library: 'shadcn',
  component: <ShadcnTabs />,
  tags: ['shadcn', 'tabs'],
  docsLink: 'https://ui.shadcn.com/docs/components/tabs',
}
