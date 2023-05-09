import {
  addTokenToThemeColors,
  deleteTokenFromThemeColors,
  editTokenInThemeColors,
} from './themeUtils'

jest.mock('uuid', () => ({ v4: () => 'mockid' }))

const MOCK_THEME_DATA = {
  name: 'Light',
  tokens: {
    colors: {
      primary: {
        value: '#ffffff',
        type: 'color',
        id: 'mockid',
      },
      primaryAccent: {
        value: '#ffffff',
        type: 'color',
        id: 'mockid',
      },
      header: {
        text: {
          value: '#abcdef',
          type: 'color',
          id: 'mockid,',
        },
      },
    },
  },
} as const

const MOCK_NESTED_THEME_DATA = {
  name: 'Light',
  tokens: {
    colors: {
      primary: {
        value: '#ffffff',
        type: 'color',
        id: 'mockid',
      },
      button: {
        bg: {
          value: '#ffffff',
          type: 'color',
          id: 'mockid',
        },
        bgHover: {
          value: '#ffffff',
          type: 'color',
          id: 'mockid',
        },
      },
    },
  },
} as const

describe('addTokenToThemeColors', () => {
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
            id: 'mockid',
          },
          primaryAccent: {
            value: '#ffffff',
            type: 'color',
            id: 'mockid',
          },
          header: {
            text: {
              value: '#abcdef',
              type: 'color',
              id: 'mockid,',
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
            id: 'mockid',
          },
          primaryAccent: {
            value: '#ffffff',
            type: 'color',
            id: 'mockid',
          },
          header: {
            text: {
              value: '#abcdef',
              type: 'color',
              id: 'mockid,',
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
            id: 'mockid',
          },
          primaryAccent: {
            value: '#ffffff',
            type: 'color',
            id: 'mockid',
          },
          header: {
            text: {
              value: '#abcdef',
              type: 'color',
              id: 'mockid,',
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
})

describe('deleteTokenFromThemeColors', () => {
  test('delete existing token', () => {
    const result = deleteTokenFromThemeColors({
      path: 'button.bg',
      theme: MOCK_NESTED_THEME_DATA,
    })

    expect(result).toEqual({
      name: 'Light',
      tokens: {
        colors: {
          primary: {
            value: '#ffffff',
            type: 'color',
            id: 'mockid',
          },
          button: {
            bgHover: {
              value: '#ffffff',
              type: 'color',
              id: 'mockid',
            },
          },
        },
      },
    })
  })
})

describe('editTokenFromThemeColors', () => {
  test('change existing path', () => {
    const result = editTokenInThemeColors({
      originalPath: 'button.bgHover',
      updatedPath: 'button.primary.bgHover',
      tokenValue: '#ffffff',
      tokenType: 'color',
      theme: MOCK_NESTED_THEME_DATA,
    })

    expect(result).toEqual({
      name: 'Light',
      tokens: {
        colors: {
          primary: {
            value: '#ffffff',
            type: 'color',
            id: 'mockid',
          },
          button: {
            bg: {
              value: '#ffffff',
              type: 'color',
              id: 'mockid',
            },
            primary: {
              bgHover: {
                value: '#ffffff',
                type: 'color',
                id: 'mockid',
              },
            },
          },
        },
      },
    })
  })

  test('change existing value', () => {
    const result = editTokenInThemeColors({
      originalPath: 'button.bgHover',
      updatedPath: 'button.bgHover',
      tokenValue: '#abc123',
      tokenType: 'color',
      theme: MOCK_NESTED_THEME_DATA,
    })

    expect(result).toEqual({
      name: 'Light',
      tokens: {
        colors: {
          primary: {
            value: '#ffffff',
            type: 'color',
            id: 'mockid',
          },
          button: {
            bg: {
              value: '#ffffff',
              type: 'color',
              id: 'mockid',
            },
            bgHover: {
              value: '#abc123',
              type: 'color',
              id: 'mockid',
            },
          },
        },
      },
    })
  })
})
