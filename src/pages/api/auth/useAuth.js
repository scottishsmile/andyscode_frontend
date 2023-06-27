'use client'
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.

import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";


// Used to check refresh tokens on each page.
/*
    import useAuth from '@/auth/useAuth'

    export default function Page() {
        const isAuthenticated = useAuth(true);

        return (
            <>
                {isAuthenticated ?
                    <YourComponent />
                    : null}
            </>
        )
    }

*/

export default function useAuth(shouldRedirect, session) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // reactStrictMode being true in next.config.js results in duplicate API calls.
    // reactStrictmode apparently creates every component twice to highlight any errors.
    // This code means you can have it set to true and only make 1 API call.
    // useRef(0) creates a reference countRef initialized with 0.
    // increment it with .current++
    // So it's just a counter meaning do one call at a time.
    // It skips the 1st call and will run on all subsequent calls!
    // Due to this, it will throw weird errors when reactStrictMode is set to FALSE.

    // So have 2 variations based on the strictmode setting:

        useEffect(() => {

                // reactStrictMode must be 'false' as it doesn't run in production.
                if (typeof window !== "undefined") {
                    if (session?.error === "RefreshAccessTokenError") {
                        //console.log('useAuth.js - RefreshAccessTokenError signOut()...' );
                        signOut();
                    }
                    if (session === null) {
                        
                        if (router.route !== '/members/login') {
                            router.replace('/members/login');
                        }
                        //console.log('useAuth.js - NOT AUTHENTICATED. Session is null.' );
                        setIsAuthenticated(false);

                    } else if (session !== undefined) {
                        if (router.route === '/members/login') {
                            router.replace('/members/dashboard');
                        }
                        //console.log('useAuth.js - AUTHENTICATED...' );
                        setIsAuthenticated(true);
                    }
            }

        }, [session, router]);

    return isAuthenticated;
}