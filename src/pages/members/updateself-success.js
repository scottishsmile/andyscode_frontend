import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/UpdateSelf.module.scss'
import { signOut, useSession } from 'next-auth/react';
import useAuth from '@/auth/useAuth'
import {useEffect, useState} from 'react';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners


const UpdateSelfSuccess = () => {

    const { data: session} = useSession();
    const isAuthenticated = useAuth(true, session); 
    const router = useRouter();
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
                title='Update Success'
                description='Edit your user profile'
            >
                <div className={styles.pagecontainer}>
                    <h2 className="text-success">Update Success!</h2>
                    <p><b>Logging you out in 3 Secs...</b></p>
                    <p>Please login again!</p>
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
    
export default UpdateSelfSuccess;