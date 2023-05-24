import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import { IconType } from 'react-icons'

/*
 * variants — primary, secondary, text, default, success, warning, close
 * size — sm, md, lg
 * rightIcon - pass in any font awesome icon you want. but what about success and warning?
 * leftIcon - pass in any font awesome icon you want. but what about success and warning?
 * isDisabled - boolean
 * isLoading - boolean
 * label
 * {...props}
 */
export function LocalizeButton({
  variant,
  size,
  label,
  rightIcon,
  leftIcon,
  isDisabled,
}: {
  variant:
    | 'primary'
    | 'secondary'
    | 'text'
    | 'default'
    | 'success'
    | 'warning'
    | 'close'
  size: 'sm' | 'md' | 'lg'
  label: string
  rightIcon?: IconDefinition
  leftIcon?: IconDefinition
  isDisabled?: boolean
}) {
  return (
    <button
      className={cn({
        disabled: isDisabled,
      })}
    >
      {leftIcon && <FontAwesomeIcon icon={leftIcon} />}
      {label}
      {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    </button>
  )
}
