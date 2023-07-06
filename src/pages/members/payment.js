'use client'
import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/Payment.module.scss'
import { useSession, signOut } from "next-auth/react";
import ThingsToBuy from '@/components/members/ThingsToBuy';
import {PAYMENT_RETURN_URL} from '@/constants/constants';
import {useEffect} from 'react';
import { useRouter } from 'next/router';

const Payment = () => {

    const {data:session} = useSession();
    const roles = session?.user.roles;           // Roles Array ["AppBasic", "AppPremium"]
    const router = useRouter();

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signOut();
            router.replace('/members/login');
        }
    }, [session]);

    // This is NEXT_PUBLIC!!!
    // Need to rewite this to make it a POST to Paypal API.
    let paymentReturnUrl = `${PAYMENT_RETURN_URL}/UpgradeToPremium?Id=${session?.user.id}&UserName=${session?.user.username}&Token=${session?.accessToken}`

    return (
        <>
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
        </>
    )
}
    
export default Payment;