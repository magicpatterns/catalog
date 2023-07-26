import Layout from '@mirrorful/core/lib/components/Layout'
import React, { useState } from 'react'
import { postStoreData } from 'src/utils/postStoreData'
import { useTranslation } from 'react-i18next'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(i18n.language)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLanguage(lng)
  }

  return (
    <Layout platform="package" postStoreData={postStoreData}>
      <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
      {children}
    </Layout>
  )
}
