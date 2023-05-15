import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'

import { Introduction } from './steps/Introduction'

export function ThemeOnboarding({
  isOpen,
  onClose,
}: {
  isOpen: boolean
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
  }

  //   else if (page === 1) {
  //     content = (
  //       <SemanticTokens
  //         onUPdatePage={(newPage) => setPage(newPage)}
  //         onFinish={onClose}
  //       />
  //     )
  //   }

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
