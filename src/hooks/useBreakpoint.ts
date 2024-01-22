import { useEffect, useState } from 'react'

export enum Breakpoint {
  initial = 0,
  xs = 520,
  sm = 768,
  md = 1024,
  lg = 1280,
  xl = 1640,
}

export const useBreakpoint = (): Breakpoint => {
  const getBreakpoint = (width: number): Breakpoint => {
    if (width < Breakpoint.xs) return Breakpoint.initial
    if (width < Breakpoint.sm) return Breakpoint.xs
    if (width < Breakpoint.md) return Breakpoint.sm
    if (width < Breakpoint.lg) return Breakpoint.md
    if (width < Breakpoint.xl) return Breakpoint.lg
    return Breakpoint.xl
  }

  const [breakpoint, setBreakpoint] = useState<Breakpoint>(Breakpoint.md)

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window ? window.innerWidth : 1025))
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return breakpoint
}
