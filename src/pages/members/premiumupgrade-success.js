import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/Premium.module.scss'
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import useAuth from '@/auth/useAuth'
import { useState } from 'react';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners

const PremiumUpgradeSuccess = () => {

    const { data: session} = useSession();
    const isAuthenticated = useAuth(true, session); 
    const [loading, setLoading] = useState(true);        // Loading spinner on when true.
    
    setTimeout(() => {
        setLoading(false);
    }, 3000)

    useEffect(() => {
        // Log the user out in 3 secs
        // Otherwise the Next Auth session won't update.
        setTimeout(() => { signOut() }, 3000);
    }, []);

    return (
        <>
        {isAuthenticated ?
        <Layout
                title='Premium'
                description='Premium Members'
            >
            <div className={styles.pagecontainer}>
            <h2 className="text-success">Welcome to Premium!</h2>
                <p><b>Logging you out in 3 Secs...</b></p>
                <p>Please log in again to refresh your membership level.</p>
            </div>
        </Layout>
        : 
        <div>
            {/* Loading Spinner */}
            {
                loading ? (
                    <div className='d-flex justify-content-center align-items-center mt-5'>
                        <SyncLoader
                            color='green'
                            loading={loading}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : (
                    <div>
                        <p>Error: User Signed Out! Login to access this page.</p>
                        <p><Link href="/members/login">Login</Link></p>
                    </div>
                )
            }
        </div>
        }
        </>
    )
}
    
export default PremiumUpgradeSuccess;