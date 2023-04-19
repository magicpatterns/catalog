import 'bootstrap/dist/css/bootstrap.min.css'
import '../../.mirrorful/theme.css' // key line that imports the mirrorful theme
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
