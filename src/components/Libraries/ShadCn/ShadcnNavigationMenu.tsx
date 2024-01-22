import { TComponentData } from '@/types'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from './raw/ui/navigation-menu'

export function ShadcnNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export const shadcnNavigationMenuData: TComponentData = {
  name: 'Navigation Menu',
  library: 'shadcn',
  component: <ShadcnNavigationMenu />,
  tags: ['shadcn', 'navigation', 'menu'],
  docsLink: 'https://ui.shadcn.com/docs/components/navigation-menu',
}
