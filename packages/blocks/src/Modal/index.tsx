import {
  Modal as ChakraModal,
  ModalBody as ChakraModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter as ChakraModalFooter,
  ModalHeader as ChakraModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import { IButton } from '@ui/Button/types'
import React from 'react'

import { Button } from '..'
import { ChakraProviderWrapper } from '../ChakraProviderWrapper'
import { toCapitalize } from '../util/toCapitalize'

interface IModal extends Partial<Pick<ModalProps, 'size'>> {
  isOpen: boolean
  onClose: () => void
  body: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
  overlay: true
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
        <ModalOverlay />
        <ModalContent>
          {props.header}
          {props.body}
          {props.footer}
        </ModalContent>
      </ChakraModal>
    </ChakraProviderWrapper>
  )
}

Modal.Header = ModalHeader
Modal.Footer = ModalFooter
Modal.Body = ModalBody

export function ModalHeader({ headerName }: { headerName: string }) {
  return (
    <>
      <ChakraModalHeader>{toCapitalize(headerName)}</ChakraModalHeader>
      <ModalCloseButton />
    </>
  )
}

export function ModalBody({ children }: { children: React.ReactNode }) {
  return <ChakraModalBody>{children}</ChakraModalBody>
}

type TModalFooter =
  | {
      onClick: () => void
      closeCb?: () => void
      variant: 'save' | 'delete' | 'add'
    }
  | {
      variant: 'generic'
      PrimaryButton: React.ReactComponentElement<typeof Button>
      SecondaryButton: React.ReactComponentElement<typeof Button>
    }

export function ModalFooter(props: TModalFooter) {
  // const primaryButton = renderPrimaryButton ? renderPrimaryButton() : undefined
  if (props.variant === 'generic') {
    if (props.PrimaryButton.type !== Button) {
      throw new Error('Primary Button is not of type Button')
    }
    if (props.SecondaryButton.type !== Button) {
      throw new Error('Secondary Button is not of type Button')
    }
  }
  if (props.variant === 'save') {
    return (
      <ChakraModalFooter>
        <Button
          label="cancel"
          variant="default"
          marginRight={'12px'}
          onClick={props.closeCb}
        ></Button>
        <Button
          type="submit"
          label="save"
          variant="save"
          onClick={props.onClick}
        ></Button>
      </ChakraModalFooter>
    )
  }
  if (props.variant === 'add') {
    return (
      <ChakraModalFooter>
        <Button
          label="cancel"
          variant="default"
          marginRight={'12px'}
          onClick={props.closeCb}
        ></Button>
        <Button
          type="submit"
          label="add"
          variant="save"
          onClick={props.onClick}
        ></Button>
      </ChakraModalFooter>
    )
  }

  if (props.variant === 'delete') {
    return (
      <ChakraModalFooter>
        <Button
          label="save"
          variant="save"
          marginRight={'12px'}
          onClick={props.closeCb}
        ></Button>
        <Button
          type="submit"
          label="delete"
          variant="delete"
          onClick={props.onClick}
        ></Button>
      </ChakraModalFooter>
    )
  }
  return (
    <ChakraModalFooter>
      <>
        {props.variant === 'generic' && props.SecondaryButton}
        {props.variant === 'generic' && props.PrimaryButton}
      </>
    </ChakraModalFooter>
  )
}

interface ISaveModal extends Omit<IModal, 'header' | 'footer'> {
  headerName: string
  mainCb: () => void
  closeCb?: () => void
}
export function SaveModal(props: ISaveModal) {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      header={<Modal.Header headerName={props.headerName} />}
      overlay={props.overlay}
      body={<Modal.Body>{props.body}</Modal.Body>}
      footer={
        <Modal.Footer
          onClick={props.mainCb}
          closeCb={props.closeCb}
          variant="save"
        />
      }
    />
  )
}

interface IAddModal extends Omit<IModal, 'header' | 'footer'> {
  headerName: string
  mainCb: () => void
  closeCb?: () => void
}
export function AddModal(props: IAddModal) {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      header={<Modal.Header headerName={props.headerName} />}
      overlay={props.overlay}
      body={<Modal.Body>{props.body}</Modal.Body>}
      footer={
        <Modal.Footer
          onClick={props.mainCb}
          closeCb={props.closeCb}
          variant="add"
        />
      }
    />
  )
}

interface IDeleteModal extends Omit<IModal, 'header' | 'footer'> {
  headerName: string
  mainCb: () => void
  closeCb?: () => void
}
export function DeleteModal(props: IDeleteModal) {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      header={<Modal.Header headerName={props.headerName} />}
      overlay={props.overlay}
      body={<Modal.Body>{props.body}</Modal.Body>}
      footer={
        <Modal.Footer
          onClick={props.mainCb}
          closeCb={props.closeCb}
          variant="delete"
        />
      }
    />
  )
}
