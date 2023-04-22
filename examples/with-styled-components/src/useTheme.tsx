import { useEffect, useState } from 'react'
import { darkTheme, lightTheme } from './globalTheme'

export default function useTheme() {
  const [themeMode, setThemeMode] = useState('light')
  const isDarkThemeMode = themeMode === 'dark'

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')

    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
      setThemeMode(savedTheme)
    } else if (prefersDark) {
      setThemeMode('dark')
    }
  }, [])

  const toggleTheme = () => {
    const updatedTheme = isDarkThemeMode ? 'light' : 'dark'
    setThemeMode(updatedTheme)
    localStorage.setItem('theme', updatedTheme)
  }

  return {
    theme: isDarkThemeMode ? darkTheme : lightTheme,
    toggleTheme,
  }
}
