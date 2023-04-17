import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import React from 'react'

export function AlertDialogDelete({
  tokenName,
  isOpen,
  onClose,
  deleteAllTokens,
  onDelete,
}: {
  tokenName?: string
  isOpen: boolean
  deleteAllTokens?: boolean
  onClose: () => void
  onDelete: () => void
}) {
  const cancelRef = React.useRef(null)

  const dialogMessage = deleteAllTokens
    ? `Are you sure you want to delete all data? You can't undo this action.`
    : `Are you sure you want to delete "${tokenName}"? You can't
  undo this action.`

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Are you sure?
          </AlertDialogHeader>

          <AlertDialogBody>{dialogMessage}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
