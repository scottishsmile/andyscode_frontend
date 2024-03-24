'use client'
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.
import Link from 'next/link'
import MembersLayout from '@/shared/members/MembersLayout';
import styles from '@/styles/members/Payment.module.scss'
import ThingsToBuy from '@/components/members/ThingsToBuy';
import { PAYMENT_RETURN_URL } from '@/constants/constants';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Payment = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const accessToken = useSelector(state => state.auth.accessToken); 
    const user = useSelector(state => state.auth.user);
    const roles = user?.roles;           // Roles Array ["AppBasic", "AppPremium"]
    const router = useRouter();

    if (typeof window !== 'undefined' && !isAuthenticated){
        
        // If unathenticated redirect them back to login page
        router.push('/login');
    }

    // This is NEXT_PUBLIC!!!
    // Need to rewite this to make it a POST to Paypal API.
    let paymentReturnUrl = `${PAYMENT_RETURN_URL}/UpgradeToPremium?Id=${user?.id}&UserName=${user?.userName}&Token=${accessToken}`

    return (
        <>
        {isAuthenticated ?
            <MembersLayout
                title='Payment'
                description='Payment Page'
            >
                <div className={styles.pagecontainer}>
                    <div>
                        {/* If statement inside ThingsToBuy component displays different messages depending on the user's role. */}
                        <ThingsToBuy roles={roles} paymentReturnUrl={paymentReturnUrl} />
                    </div>
                </div>
            </MembersLayout>
            : 
            <div>
                <div className="text-center">
                    <p>Error: User Signed Out! Login to access this page.</p>
                    <p><Link href="/login">Login</Link></p>
                </div>
            </div>
        }
        </>
    )
}
    
export default Payment;