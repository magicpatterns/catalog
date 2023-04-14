import React from 'react'

interface Button extends HTMLButtonElement {
  title: string
}
export function Button(props: Button) {
  return <button className={props.className}>{props.title}</button>
}
