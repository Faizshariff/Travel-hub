import '../styles/globals.css'

import type { AppProps } from 'next/app'
import {MapProvider } from 'react-map-gl';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id='page' >
             <MapProvider>
     <Component {...pageProps} />
     </MapProvider>
     </div>
  )
    }
