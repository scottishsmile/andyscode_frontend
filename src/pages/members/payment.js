import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/Payment.module.scss'
import useAuth from '@/auth/useAuth'
import { useSession } from "next-auth/react"
import ThingsToBuy from '@/components/members/ThingsToBuy';
import {PAYMENT_RETURN_URL} from '@/constants/constants';

const Payment = () => {

    const { data: session} = useSession();
    const isAuthenticated = useAuth(true, session);       // true means we should redirect to login page if the user is not authenticated
    const roles = session?.user.roles;           // Roles Array ["AppBasic", "AppPremium"]


    // This is NEXT_PUBLIC!!!
    // Need to rewite this to make it a POST to Paypal API.
    let paymentReturnUrl = `${PAYMENT_RETURN_URL}/UpgradeToPremium?Id=${session?.user.id}&UserName=${session?.user.username}&Token=${session?.accessToken}`

    return (
        <>
        {isAuthenticated ?
            <Layout
                title='Payment'
                description='Payment Page'
            >
                <div className={styles.pagecontainer}>
                    <div>
                        {/* If statement inside ThingsToBuy component displays different messages depending on the user's role. */}
                        <ThingsToBuy roles={roles} paymentReturnUrl={paymentReturnUrl} />
                    </div>
                </div>
            </Layout>
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
    
export default Payment;