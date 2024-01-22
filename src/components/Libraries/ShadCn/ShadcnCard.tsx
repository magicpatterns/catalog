import { TComponentData } from '@/types'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './raw/ui/card'

export function ShadcnCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}

export const shadcnCardData: TComponentData = {
  name: 'Card',
  library: 'shadcn',
  component: <ShadcnCard />,
  tags: ['shadcn', 'card'],
  docsLink: 'https://ui.shadcn.com/docs/components/card',
}
