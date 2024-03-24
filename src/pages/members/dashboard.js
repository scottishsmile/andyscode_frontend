'use client'
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.
import Link from 'next/link'
import MembersLayout from '@/shared/members/MembersLayout';
import styles from '@/styles/members/Dashboard.module.scss'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { SyncLoader } from 'react-spinners';

const Dashboard = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user); 
    const router = useRouter();

    if (typeof window !== 'undefined' && !isAuthenticated){
        
        // If unathenticated redirect them back to login page
        router.push('/login');
    }

    return (
        <>
        {isAuthenticated ?
            <MembersLayout
                title='Dashboard'
                description='Members Area Dashboard'
            >
                <div className={styles.pagecontainer}>
                    {user?.EnableMFA === false ?
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
                <div className="d-flex col align-items-center justify-content-center">
                    <SyncLoader
                        color='blue'
                        loading={true}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                <div className="d-flex col align-items-center justify-content-center">
                    <br />
                    <p>Logging in...</p>
                    <p><Link href="/login">Login</Link></p>
                </div>
            </div>
        </div>
        }
        </>
    )
}
    
export default Dashboard;