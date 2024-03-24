'use client'
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.
import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/MfaChangeSuccess.module.scss'
import { signOut, useSession } from 'next-auth/react';
import useAuth from '@/auth/useAuth'
import {useEffect, useState} from 'react';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners


const MfaChangeSuccess = () => {

    const { data: session} = useSession();
    const isAuthenticated = useAuth(true, session); 

    useEffect(() => {
        // Log the user out in 3 secs
        // Otherwise the Next Auth session won't update.
        setTimeout(() => { signOut() }, 3000);
    }, []);




    return (
        <>
        {isAuthenticated ?
            <Layout
                title='Update Success'
                description='Edit your user profile'
            >
                <div className={styles.pagecontainer}>
                    <h2 className="text-success">MFA Change Success!</h2>
                    <p><b>Logging you out in 3 Secs...</b></p>
                    <p>Please login again!</p>
                </div>
            </Layout>
        : 
        <div>
            <div>
                <p>Error: User Signed Out! Login to access this page.</p>
                <p><Link href="/members/login">Login</Link></p>
            </div>
        </div>
        }
        </>
    )
}
    
export default MfaChangeSuccess;