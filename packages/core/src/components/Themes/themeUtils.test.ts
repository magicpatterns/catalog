import { addTokenToThemeColors } from './themeUtils'

jest.mock('uuid', () => ({ v4: () => 'mockid' }))

const MOCK_THEME_DATA = {
  name: 'Light',
  tokens: {
    colors: {
      primary: {
        value: '#ffffff',
        type: 'color',
        id: '1',
      },
      primaryAccent: {
        value: '#ffffff',
        type: 'color',
        id: '2',
      },
      header: {
        text: {
          value: '#abcdef',
          type: 'color',
          id: '3,',
        },
      },
    },
  },
} as const

test('add to top level', () => {
  const result = addTokenToThemeColors({
    path: 'button',
    tokenValue: '#f3f3f3',
    tokenType: 'color',
    theme: MOCK_THEME_DATA,
  })

  expect(result).toEqual({
    name: 'Light',
    tokens: {
      colors: {
        primary: {
          value: '#ffffff',
          type: 'color',
          id: '1',
        },
        primaryAccent: {
          value: '#ffffff',
          type: 'color',
          id: '2',
        },
        header: {
          text: {
            value: '#abcdef',
            type: 'color',
            id: '3,',
          },
        },
        button: {
          id: 'mockid',
          value: '#f3f3f3',
          type: 'color',
        },
      },
    },
  })
})

test('add to nested path', () => {
  const result = addTokenToThemeColors({
    path: 'button.primary.bg',
    tokenValue: '#f3f3f3',
    tokenType: 'color',
    theme: MOCK_THEME_DATA,
  })

  expect(result).toEqual({
    name: 'Light',
    tokens: {
      colors: {
        primary: {
          value: '#ffffff',
          type: 'color',
          id: '1',
        },
        primaryAccent: {
          value: '#ffffff',
          type: 'color',
          id: '2',
        },
        header: {
          text: {
            value: '#abcdef',
            type: 'color',
            id: '3,',
          },
        },
        button: {
          primary: {
            bg: {
              id: 'mockid',
              value: '#f3f3f3',
              type: 'color',
            },
          },
        },
      },
    },
  })
})

test('add to existing nested path', () => {
  const result = addTokenToThemeColors({
    path: 'header.bg',
    tokenValue: '#f3f3f3',
    tokenType: 'color',
    theme: MOCK_THEME_DATA,
  })

  expect(result).toEqual({
    name: 'Light',
    tokens: {
      colors: {
        primary: {
          value: '#ffffff',
          type: 'color',
          id: '1',
        },
        primaryAccent: {
          value: '#ffffff',
          type: 'color',
          id: '2',
        },
        header: {
          text: {
            value: '#abcdef',
            type: 'color',
            id: '3,',
          },
          bg: {
            id: 'mockid',
            value: '#f3f3f3',
            type: 'color',
          },
        },
      },
    },
  })
})
