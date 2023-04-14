import React from 'react'

interface Button extends HTMLButtonElement {
  title: string
}
function Button(props: Button) {
  return <button className={props.className}>{props.title}</button>
}

export default Button
