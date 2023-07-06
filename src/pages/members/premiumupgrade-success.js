'use client'
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.

import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/Premium.module.scss'
import { useEffect } from 'react';
import { signOut, useSession } from "next-auth/react";

const PremiumUpgradeSuccess = () => {

    const {data:session} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signOut();
            router.replace('/members/login');
        }
    }, [session]);

    return (
        <>
        <Layout
                title='Premium'
                description='Premium Members'
            >
            <div className={styles.pagecontainer}>
            <h2 className="text-success">Welcome to Premium!</h2>
                <p><b>Logging you out in 3 Secs...</b></p>
                <p>Please log in again to refresh your membership level.</p>
            </div>
        </Layout>
        </>
    )
}
    
export default PremiumUpgradeSuccess;