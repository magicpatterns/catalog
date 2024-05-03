'use client'
import { useEffect } from 'react'

export function RedirectComponent() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://www.magicpatterns.com/catalog'
    }
  }, [])

  return null
}
