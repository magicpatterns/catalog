declare module 'feather-icons-react'
declare module 'react-highlight'

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    onToggleColorPicker: () => void
  }
}
