import Link from 'next/link'
import MembersLayout from '@/shared/members/MembersLayout';
import styles from '@/styles/members/Premium.module.scss'
import useAuth from '@/auth/useAuth'
import { useSession } from "next-auth/react"
import PremiumArea from '@/components/members/PremiumArea';
import { useState } from 'react';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners

const Premium = () => {

    const { data: session} = useSession();
    const isAuthenticated = useAuth(true, session);      // true means we should redirect to login page if the user is not authenticated
    const roles = session?.user.roles;           // Roles Array ["AppBasic", "AppPremium"]
    const [loading, setLoading] = useState(true);        // Loading spinner on when true.
    
    setTimeout(() => {
        setLoading(false);
    }, 3000)

    return (
        <>
        {isAuthenticated ?
            <MembersLayout
                title='Premium'
                description='Premium Members'
            >
                <div className={styles.pagecontainer}>
                    {/* If statement inside PremiumArea component displays different messages depending on the user's role. */}
                    <PremiumArea roles={roles} />
                </div>
            </MembersLayout>
            : 
            <div>
            {/* Loading Spinner */}
            {
                loading ? (
                    <div className='d-flex justify-content-center align-items-center mt-5'>
                        <SyncLoader
                            color='blue'
                            loading={loading}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : (
                    <div className="text-center">
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
    
export default Premium;