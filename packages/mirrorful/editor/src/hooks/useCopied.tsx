import { useEffect, useState } from 'react'

export function useCopied() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let copiedTimeout: NodeJS.Timeout

    if (copied) {
      copiedTimeout = setTimeout(() => {
        setCopied(false)
      }, 1500)
    }

    return () => clearTimeout(copiedTimeout)
  }, [copied])

  return { copied, setCopied }
}
