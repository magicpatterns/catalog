import './icon.css';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import React from 'react'

export type IconType =
  | IconDefinition
  | 'trial-badge-free'
  | 'trial-badge-advanced'

export function Icon({
  type,
  style,
  className,
  onClick,
}: {
  type: IconType
  style?: React.CSSProperties
  className?: string
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}) {
  if (type === 'trial-badge-free') {
    return (
      <TrialBadge
        variant="free"
        style={style}
        className={className}
        onClick={onClick}
      />
    )
  } else if (type === 'trial-badge-advanced') {
    return (
      <TrialBadge
        variant="advanced"
        style={style}
        className={className}
        onClick={onClick}
      />
    )
  }

  return (
    <FontAwesomeIcon
      icon={type}
      className={cn(className)}
      style={style}
      onClick={onClick}
    />
  )
}

// CUSTOM ICONS
function TrialBadge({
  variant,
  style,
  className,
  onClick,
}: {
  variant: 'free' | 'advanced'
  style?: React.CSSProperties
  className?: string
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}) {
  let rawIcon = null

  if (variant === 'advanced') {
    rawIcon = (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <path
          d="M9.75 1.01036L15.5442 4.35566C16.0083 4.62361 16.2942 5.1188 16.2942 5.6547V12.3453C16.2942 12.8812 16.0083 13.3764 15.5442 13.6443L9.75 16.9896C9.2859 17.2576 8.7141 17.2576 8.25 16.9896L2.45577 13.6443C1.99167 13.3764 1.70577 12.8812 1.70577 12.3453V5.6547C1.70577 5.1188 1.99167 4.62361 2.45577 4.35566L8.25 1.01036C8.7141 0.742414 9.2859 0.742414 9.75 1.01036Z"
          fill="url(#paint0_linear_1077_463)"
          stroke="white"
          stroke-linejoin="round"
        />
        <path
          d="M8.73082 5.45428C8.84087 5.2313 9.15882 5.2313 9.26887 5.45428L10.1323 7.20385C10.176 7.29239 10.2605 7.35376 10.3582 7.36796L12.289 7.64852C12.535 7.68427 12.6333 7.98667 12.4552 8.16023L11.0581 9.52208C10.9874 9.591 10.9552 9.6903 10.9718 9.78762L11.3017 11.7106C11.3437 11.9557 11.0865 12.1425 10.8664 12.0268L9.13945 11.1189C9.05205 11.073 8.94764 11.073 8.86024 11.1189L7.13331 12.0268C6.91322 12.1425 6.65599 11.9557 6.69803 11.7106L7.02784 9.78762C7.04453 9.6903 7.01227 9.591 6.94156 9.52208L5.54444 8.16023C5.36639 7.98667 5.46464 7.68427 5.71071 7.64852L7.64148 7.36796C7.73919 7.35376 7.82366 7.29239 7.86736 7.20385L8.73082 5.45428Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1077_463"
            x1="4.5"
            y1="1.63636"
            x2="13.9091"
            y2="16.7727"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#4B668E" />
            <stop offset="1" stop-color="#3997BD" />
          </linearGradient>
        </defs>
      </svg>
    )
  } else {
    rawIcon = (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <path
          d="M9.75 1.01036L15.5442 4.35566C16.0083 4.62361 16.2942 5.1188 16.2942 5.6547V12.3453C16.2942 12.8812 16.0083 13.3764 15.5442 13.6443L9.75 16.9896C9.2859 17.2576 8.7141 17.2576 8.25 16.9896L2.45577 13.6443C1.99167 13.3764 1.70577 12.8812 1.70577 12.3453V5.6547C1.70577 5.1188 1.99167 4.62361 2.45577 4.35566L8.25 1.01036C8.7141 0.742414 9.2859 0.742414 9.75 1.01036Z"
          fill="url(#paint0_linear_1077_460)"
          stroke="white"
          stroke-linejoin="round"
        />
        <path
          d="M8.73095 5.45428C8.84099 5.2313 9.15894 5.2313 9.26899 5.45428L10.1325 7.20385C10.1762 7.29239 10.2606 7.35376 10.3583 7.36796L12.2891 7.64852C12.5352 7.68427 12.6334 7.98667 12.4554 8.16023L11.0583 9.52208C10.9875 9.591 10.9553 9.6903 10.972 9.78762L11.3018 11.7106C11.3438 11.9557 11.0866 12.1425 10.8665 12.0268L9.13957 11.1189C9.05217 11.073 8.94776 11.073 8.86036 11.1189L7.13343 12.0268C6.91334 12.1425 6.65611 11.9557 6.69815 11.7106L7.02796 9.78762C7.04465 9.6903 7.01239 9.591 6.94168 9.52208L5.54457 8.16023C5.36651 7.98667 5.46476 7.68427 5.71083 7.64852L7.6416 7.36796C7.73931 7.35376 7.82378 7.29239 7.86748 7.20385L8.73095 5.45428Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1077_460"
            x1="4.5"
            y1="1.63636"
            x2="13.9091"
            y2="16.7727"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#9B51E0" />
            <stop offset="1" stop-color="#3997BD" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  return (
    <div style={style} className={className}>
      {rawIcon}
    </div>
  )
}
