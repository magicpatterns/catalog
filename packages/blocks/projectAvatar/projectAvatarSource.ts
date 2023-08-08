import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { getOrgName } from '@web/context'

export const getProjectavatarSource = (authInfo: UseAuthInfoProps) => {
  return `import './projectavatar.css';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export function ProjectAvatar({
  icon,
  color,
  dimensions = 46,
}: {
  icon: IconDefinition
  color: string
  dimensions?: number
}) {
  const containerStyle = {
    height: dimensions + 'px',
    width: dimensions + 'px',
  }

  const innerCircleStyle = {
    backgroundColor: 'var(--localize-color-' + color + '-100)',
    height: (dimensions * 32) / 46 + 'px',
    width: (dimensions * 32) / 46 + 'px',
    border: (dimensions * 4) / 46 + 'px solid #FFFFFF',
  }

  const iconStyle = {
    height: (dimensions * 14) / 46 + 'px',
    width: (dimensions * 14) / 46 + 'px',
    color: 'white',
  }

  return (
    <div className="localize-project-avatar-container" style={containerStyle}>
      <div
        className="localize-project-avatar-inner-circle"
        style={innerCircleStyle}
      >
        <FontAwesomeIcon icon={icon} style={iconStyle} />
      </div>
    </div>
  )
}
`
}
