import { AlertDialog, Button, Flex } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixAlertdialog() {
  return (
    <RadixWrapper>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Revoke access</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Revoke access</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This application will no longer be accessible and any
            existing sessions will be expired.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red">
                Revoke access
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </RadixWrapper>
  )
}

export const radixAlertdialogData: TComponentData = {
  name: 'Alertdialog',
  library: 'radix',
  component: <RadixAlertdialog />,
  tags: [
    'radix',
    'alert dialog',
    'feedback',
    'message',
    'popup',
    'alert',
    'dialog',
  ],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/alert-dialog',
}
