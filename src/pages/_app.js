import '@/styles/globals.scss'
import SSRProvider from 'react-bootstrap/SSRProvider'     // Allow Server Side Rendering of Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';            // Import bootstrap css!
import {useEffect} from 'react'
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import RefreshTokenHandler from '@/components/RefreshTokenHandler';

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  // Bootstrap JavaScript files
  useEffect(() => {
  import("bootstrap/dist/js/bootstrap");
  }, []);


  // The Next-Auth <SessionProvider> tracks the time untl the token expires, so the live session can be refreshed or logged out.
  // We wrap our app with <SessionProvider>. We then set the refetch interval to the specific value in seconds. 
  // An issue is that if you set a constant value, every time the user refreshes the page, the counter restarts. Use RefreshTokenHandler component to solve this.
  // Refresh token lasts 1 day, 24 hours.
  // So we want to track it and refresh the tokens on 23hours 30 mins
  const [refreshInterval, setRefreshInterval] = useState(0);

  return (
    <SSRProvider>
      <SessionProvider session={session} refetchInterval={refreshInterval}>
        <Component {...pageProps} />
        <RefreshTokenHandler setRefreshInterval={setRefreshInterval} />
      </SessionProvider>
    </SSRProvider>
  );
}