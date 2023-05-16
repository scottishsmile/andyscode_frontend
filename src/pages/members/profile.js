import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/Profile.module.scss'
import { useSession } from 'next-auth/react';
import useAuth from '@/auth/useAuth'
import { useState } from 'react';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners

const Profile = () => {

    const { data: session} = useSession();
    const isAuthenticated = useAuth(true, session);           // true means we should redirect to login page if the user is not authenticated
    const [loading, setLoading] = useState(true);        // Loading spinner on when true.
    
    setTimeout(() => {
        setLoading(false);
    }, 3000)


    return (
        <>
        {isAuthenticated ?
            <Layout
                title='User Profile'
                description='User Profile And Settings'
            >
                <div className={styles.pagecontainer}>
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                                <div className={styles.headerText}>
                                    <h2>Profile</h2>
                                </div>
                                <div className={styles.profileTextContainer}>
                                    <div className={styles.profileText}>
                                        <p><span className={styles.profileCategoryName}><b>ID:</b></span> {session?.user.id}</p>
                                        <p><span className={styles.profileCategoryName}><b>UserName:</b></span> {session?.user.username}</p>
                                        <p><span className={styles.profileCategoryName}><b>Email:</b></span> {session?.user.email} </p>
                                        <p><span className={styles.profileCategoryName}><b>Membership Level:</b></span> {session?.user.roles} </p>
                                    </div>
                                </div>
                                <div className={styles.profileChangeContainer}>
                                    <div className={styles.profileChangeText}>
                                        <p><span><b>Make Changes: </b><Link href="/members/updateself" className={styles.link}>[Edit User Profile]</Link></span></p>
                                        <br />
                                        <p><span><b>Password: </b><Link href="/members/resetpass" className={styles.link}> [Change Password]</Link></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
    
export default Profile;