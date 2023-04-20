import {
  Modal as ChakraModal,
  ModalCloseButton,
  ModalFooter as ChakraModalFooter,
  ModalHeader as ChakraModalHeader,
} from '@chakra-ui/react'
import React from 'react'

import { Button } from '..'

interface IModal {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  headerName: string
  variants: 'save' | 'delete' | 'add'
}
export function Modal(props: IModal) {
  return (
    <ChakraModal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalHeader headerName={props.headerName} />
      {props.children}
    </ChakraModal>
  )
}

export function ModalHeader({ headerName }: { headerName: string }) {
  return (
    <>
      <ChakraModalHeader>{headerName}</ChakraModalHeader>
      <ModalCloseButton />
    </>
  )
}

export function ModalFooter({
  onClick,
  variants,
  closeCb,
}: {
  onClick: () => void
  closeCb?: () => void
  variants: IModal['variants']
}) {
  if (variants === 'save') {
    return (
      <ChakraModalFooter>
        <Button
          label="cancel"
          variant="default"
          marginLeft={'12px'}
          onClick={closeCb}
        ></Button>
        <Button
          type="submit"
          label="save"
          variant="save"
          onClick={onClick}
        ></Button>
      </ChakraModalFooter>
    )
  }
}
