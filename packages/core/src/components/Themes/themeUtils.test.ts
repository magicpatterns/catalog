import {
  addTokenOrGroupToTheme,
  deleteTokenOrGroupFromTheme,
  editTokenOrGroupInTheme,
} from './themeUtils'

jest.mock('uuid', () => ({ v4: () => 'mockid' }))

const MOCK_THEME_DATA = {
  id: 'mockid',
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
  id: 'mockid',
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

describe('addTokenOrGroupToTheme', () => {
  test('add to top level', () => {
    const result = addTokenOrGroupToTheme({
      path: 'button',
      target: {
        id: 'mockid',
        value: '#f3f3f3',
        type: 'color',
      },
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
    const result = addTokenOrGroupToTheme({
      path: 'button.primary.bg',
      target: {
        id: 'mockid',
        value: '#f3f3f3',
        type: 'color',
      },
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
    const result = addTokenOrGroupToTheme({
      path: 'header.bg',
      target: {
        id: 'mockid',
        value: '#f3f3f3',
        type: 'color',
      },
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

describe('deleteTokenOrGroupFromTheme', () => {
  test('delete existing token', () => {
    const result = deleteTokenOrGroupFromTheme({
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

describe('editTokenOrGroupInTheme', () => {
  test('change existing path', () => {
    const result = editTokenOrGroupInTheme({
      originalPath: 'button.bgHover',
      updatedPath: 'button.primary.bgHover',
      target: {
        id: 'mockid',
        value: '#ffffff',
        type: 'color',
      },
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
    const result = editTokenOrGroupInTheme({
      originalPath: 'button.bgHover',
      updatedPath: 'button.bgHover',
      target: {
        id: 'mockid',
        value: '#abc123',
        type: 'color',
      },
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
