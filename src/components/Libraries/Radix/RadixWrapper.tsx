import '@radix-ui/themes/styles.css'

import { Theme } from '@radix-ui/themes'

export function RadixWrapper({ children }: { children: React.ReactNode }) {
  return <Theme>{children}</Theme>
}
