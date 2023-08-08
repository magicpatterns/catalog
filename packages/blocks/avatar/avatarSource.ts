import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { getOrgName } from '@web/context'

export const getAvatarSource = (authInfo: UseAuthInfoProps) => {
  return `import './avatar.css';
import cn from 'classnames'
import React from 'react'

function getInitials(name: string) {
  const names = name.split(' ')
  const firstName = names[0] ?? ''
  const lastName = names.length > 1 ? names[names.length - 1] : ''
  return firstName && lastName
    ? firstName.charAt(0) + lastName.charAt(0)
    : firstName.charAt(0)
}

export function Avatar({
  src,
  size = 'md',
  name,
  className,
  style,
}: {
  src?: string
  size?: 'sm' | 'md' | 'lg'
  name?: string
  className?: string
  style?: React.CSSProperties
}) {
  if (!src) {
    return (
      <div
        className={cn(
          '${getOrgName({ authInfo })}' + '-avatar',
          '${getOrgName({ authInfo })}' + '-avatar-' + size,
          className
        )}
        role="img"
        aria-label={name}
        style={style}
      >
        {name ? getInitials(name) : null}
      </div>
    )
  }

  return (
    <img
      className={cn(
        '${getOrgName({ authInfo })}' + '-avatar',
        '${getOrgName({ authInfo })}' + '-avatar-' + size,
        className
      )}
      src={src}
      alt={name}
      style={style}
    />
  )
}
`
}
