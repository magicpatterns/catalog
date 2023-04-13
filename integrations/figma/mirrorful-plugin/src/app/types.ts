export type TTokenGroup = {
  [key: string]: TTokenGroup | TToken
}

export type TToken = {
  id: string
  value: string
  type: 'color' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'boxShadow'
  ref?: string // means that this token itself is a reference to another token
}
