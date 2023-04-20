import {
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  ModalFooter as ChakraModalFooter,
  ModalHeader as ChakraModalHeader,
  ModalProps,
} from '@chakra-ui/react'
import React from 'react'

import { Button } from '..'
import { ChakraProviderWrapper } from '../ChakraProviderWrapper'
import { toCapitalize } from '../util/toCapitalize'

interface IModal extends Partial<Pick<ModalProps, 'size'>> {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  headerName: string
  variant: 'save' | 'delete' | 'add'
  mainCb: () => void
  closeCb?: () => void
}
export function Modal(props: IModal) {
  return (
    <ChakraProviderWrapper>
      <ChakraModal
        isOpen={props.isOpen}
        onClose={props.onClose}
        size={props.size}
        isCentered={true}
        closeOnEsc={true}
      >
        <ModalContent>
          <ModalHeader headerName={toCapitalize(props.headerName)} />
          {props.children}
          <ModalFooter
            onClick={props.mainCb}
            variant={props.variant}
            closeCb={props.closeCb}
          />
        </ModalContent>
      </ChakraModal>
    </ChakraProviderWrapper>
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
  variant,
  closeCb,
}: {
  onClick: () => void
  closeCb?: () => void
  variant: IModal['variant']
}) {
  if (variant === 'save') {
    return (
      <ChakraModalFooter>
        <Button
          label="cancel"
          variant="default"
          marginRight={'12px'}
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
  if (variant === 'add') {
    return (
      <ChakraModalFooter>
        <Button
          label="cancel"
          variant="default"
          marginRight={'12px'}
          onClick={closeCb}
        ></Button>
        <Button
          type="submit"
          label="add"
          variant="save"
          onClick={onClick}
        ></Button>
      </ChakraModalFooter>
    )
  }

  return (
    <ChakraModalFooter>
      <Button
        label="save"
        variant="save"
        marginRight={'12px'}
        onClick={closeCb}
      ></Button>
      <Button
        type="submit"
        label="delete"
        variant="delete"
        onClick={onClick}
      ></Button>
    </ChakraModalFooter>
  )
}
