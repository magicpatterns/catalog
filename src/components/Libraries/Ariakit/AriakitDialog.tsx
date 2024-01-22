import './Dialogstyle.css'

import * as Ariakit from '@ariakit/react'

import { TComponentData } from '@/types'

export function AriakitDialog() {
  const dialog = Ariakit.useDialogStore()
  return (
    <>
      <Ariakit.Button onClick={dialog.show} className="button">
        Show modal
      </Ariakit.Button>
      <Ariakit.Dialog store={dialog} className="dialog">
        <Ariakit.DialogHeading className="heading">
          Success
        </Ariakit.DialogHeading>
        <p className="description">
          Your payment has been successfully processed. We have emailed your
          receipt.
        </p>
        <div>
          <Ariakit.DialogDismiss className="button">OK</Ariakit.DialogDismiss>
        </div>
      </Ariakit.Dialog>
    </>
  )
}
export const ariakitDialogData: TComponentData = {
  name: 'Dialog',
  library: 'ariakit',
  component: <AriakitDialog />,
  tags: ['ariakit', 'dialog'],
  docsLink: 'https://ariakit.org/components/dialog',
}
