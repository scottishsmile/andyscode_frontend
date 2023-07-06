'use client'
import Link from 'next/link'
import MembersLayout from '@/shared/members/MembersLayout';
import styles from '@/styles/members/Dashboard.module.scss'
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {

    const {data: session} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signOut();
            router.replace('/members/login');
        }
    }, [session]);


    return (
        <>
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
        </>
    )
}
    
export default Dashboard;