'use client'
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.
import Link from 'next/link'
import MembersLayout from '@/shared/members/MembersLayout';
import styles from '@/styles/members/Premium.module.scss'
import PremiumArea from '@/components/members/PremiumArea';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { SyncLoader } from 'react-spinners';


const Premium = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user); 
    const roles = user?.roles;           // Roles Array ["AppBasic", "AppPremium"]
    const router = useRouter();

    if (typeof window !== 'undefined' && !isAuthenticated){
        
        // If unathenticated redirect them back to login page
        router.push('/login');
    }

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
    
export default Premium;