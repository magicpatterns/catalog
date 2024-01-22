import { Flex, Section } from '@radix-ui/themes'

export function AppContainer({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <Section
      px={{
        initial: '2',
        md: '3',
        lg: '9',
      }}
      py="2"
      style={{
        display: 'flex',
        justifyContent: 'center',
        ...style,
      }}
    >
      <Flex style={{ maxWidth: '1400px', flexGrow: 1 }}>{children}</Flex>
    </Section>
  )
}
