import './avatar.css';
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
          'mirrorful' + '-avatar',
          'mirrorful' + '-avatar-' + size,
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
        'mirrorful' + '-avatar',
        'mirrorful' + '-avatar-' + size,
        className
      )}
      src={src}
      alt={name}
      style={style}
    />
  )
}
