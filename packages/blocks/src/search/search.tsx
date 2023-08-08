import './search.css';
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import { Input } from '../input/input'

export function Search({
  placeholder,
  value,
  onChange,
  disabled,
  className,
  clearable,
  showAdvancedIcon,
  onClickAdvancedIcon,
}: {
  placeholder?: string
  value?: string
  onChange?: (e: string) => void
  disabled?: boolean
  className?: string
  clearable?: boolean
  showAdvancedIcon?: boolean
  onClickAdvancedIcon?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void
}) {
  return (
    <Input
      leftIcon={faMagnifyingGlass}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={className}
      clearable={clearable}
      rightIcon={showAdvancedIcon ? faSliders : undefined}
      onClickRightIcon={onClickAdvancedIcon}
    />
  )
}
