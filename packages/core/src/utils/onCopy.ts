const permissionName = 'clipboard-read' as PermissionName

export async function getPermission() {
  const permissionStatus = await navigator.permissions.query({
    name: permissionName,
  })

  if (permissionStatus.state === 'prompt') {
    navigator.clipboard.writeText('')
  }
}

export async function onCopy(text: string) {
  const permissionStatus = await navigator.permissions.query({
    name: permissionName,
  })

  if (permissionStatus.state === 'granted') {
    await navigator.clipboard.writeText(text)
  } else if (permissionStatus.state === 'denied') {
    alert('Your clipboard permission is blocked, enable it to copy text.')
  }
}
