'use client'
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.
import Link from 'next/link'
import MembersLayout from '@/shared/members/MembersLayout';
import styles from '@/styles/members/Dashboard.module.scss'
import useAuth from '@/auth/useAuth'
import { useSession } from 'next-auth/react';

const Dashboard = () => {

    const { data: session} = useSession();
    const isAuthenticated = useAuth(true, session);       // true means we should redirect to login page if the user is not authenticated


    return (
        <>
        {isAuthenticated ?
            <MembersLayout
                title='Dashboard'
                description='Members Area Dashboard'
            >
                <div className={styles.pagecontainer}>
                    {session?.MFA_Enabled === false ?
                        <div className={styles.topAlertBanner}>
                            <p>You should enable <b>Multi-Factor Authentication</b> to secure the account. Enable it here: <Link href="/members/profile">Profile</Link></p>
                        </div>
                        :
                        <p></p>
                    }                   
                    <div className={styles.headerText}>
                        <h2>Members Area</h2>
                        <p>Only registered and logged in users should see this page</p>
                        <br />
                    </div>
                    <div className={styles.textBlobsContainer}>
                        <div className={styles.textBlob}>
                            <h3>Welcome</h3>
                            <p>This page should list all the basic members services.</p>
                            <p>All registered users get the "AppBasic" role assigned to them which will allow access here.</p>
                            <br />
                        </div>
                    </div>
                </div>
            </MembersLayout>
        : 
        <div>
            <div className="text-center">
                <p>Error: User Signed Out! Login to access this page.</p>
                <p><Link href="/members/login">Login</Link></p>
            </div>
        </div>
        }
        </>
    )
}
    
export default Dashboard;