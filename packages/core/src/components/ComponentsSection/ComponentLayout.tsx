import { Box } from '@chakra-ui/react'

// display: grid;
// grid-template-columns: repeat(2, auto);
// grid-template-rows: 3fr 2fr;
// grid-column-gap: 0px;
// grid-row-gap: 0px;

export function ComponentLayout({
  componentRender,
}: {
  componentRender: React.ReactNode
}) {
  return (
    <Box
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gridTemplateRows: '3fr 2fr',
        gridColumnGap: '0px',
        gridRowGap: '0px',
      }}
    >
      <Box
        css={{
          gridArea: '1 / 1 / 2 / 3',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
        }}
      ></Box>
      <Box
        css={{
          gridArea: '2 / 1 / 3 / 2',
          borderRight: '1px solid var(--border-color)',
        }}
      />
      <Box css={{ gridArea: '2 / 2 / 3 / 3' }} />
    </Box>
  )
}
