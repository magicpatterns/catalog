import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useState } from 'react'

import { Introduction } from './steps/Introduction'
import { SemanticTokens } from './steps/SemanticTokens'
import { Start } from './steps/Start'

export function ThemeOnboarding({
  isOpen,
  onStart,
  onClose,
}: {
  isOpen: boolean
  onStart: (arg0: 'template' | 'scratch') => void
  onClose: () => void
}) {
  const [page, setPage] = useState<number>(0)

  let content = null

  if (page === 0) {
    content = (
      <Introduction
        onUpdatePage={(newPage) => setPage(newPage)}
        onFinish={onClose}
      />
    )
  } else if (page === 1) {
    content = (
      <SemanticTokens
        onUpdatePage={(newPage) => setPage(newPage)}
        onFinish={onClose}
      />
    )
  } else if (page === 2) {
    content = (
      <Start onUpdatePage={(newPage) => setPage(newPage)} onStart={onStart} />
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />

        <ModalBody>{content}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
