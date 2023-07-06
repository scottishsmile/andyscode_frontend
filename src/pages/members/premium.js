'use client'
import Link from 'next/link'
import MembersLayout from '@/shared/members/MembersLayout';
import styles from '@/styles/members/Premium.module.scss';
import { useSession, signOut } from "next-auth/react";
import PremiumArea from '@/components/members/PremiumArea';
import {useEffect} from 'react';
import { useRouter } from 'next/router';

const Premium = () => {

    const {data:session} = useSession();
    const roles = session?.user.roles;           // Roles Array ["AppBasic", "AppPremium"]
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
                title='Premium'
                description='Premium Members'
            >
                <div className={styles.pagecontainer}>
                    {/* If statement inside PremiumArea component displays different messages depending on the user's role. */}
                    <PremiumArea roles={roles} />
                </div>
            </MembersLayout>
        </>
    )
}
    
export default Premium;