import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import '../main.css'
import posthog from 'posthog-js'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { IntlProvider } from "react-intl";
import en from "../lang/en.json";
import de from "../lang/de.json";

if (typeof window !== 'undefined') {
  // This ensures that as long as we are client-side, posthog is always ready
  posthog.init('phc_Fi1SAV5Xhkmrf5VwIweTTmZDNnUIWmXkvXr7naLsNVV', {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
    },
  })
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { locale } = useRouter()
  if(!locale) return

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog.capture('$pageview')
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  const messages = {
    en,
    de
  };

  return (
    <ChakraProvider>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Component {...pageProps} />
      </IntlProvider>
    </ChakraProvider>
  )
}
