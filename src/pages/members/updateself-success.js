'use client'
import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/UpdateSelf.module.scss'
import { signOut, useSession } from "next-auth/react";
import {useEffect} from 'react';
import { useRouter } from 'next/router';


const UpdateSelfSuccess = () => {

    const {data:session} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signOut();
            router.replace('/members/login');
        }
    }, [session]);

    useEffect(() => {
        // Log the user out in 3 secs
        // Otherwise the Next Auth session won't update.
        setTimeout(() => { signOut() }, 3000);
    }, []);



    return (
        <>
            <Layout
                title='Update Success'
                description='Edit your user profile'
            >
                <div className={styles.pagecontainer}>
                    <h2 className="text-success">Update Success!</h2>
                    <p><b>Logging you out in 3 Secs...</b></p>
                    <p>Please login again!</p>
                </div>
            </Layout>
        </>
    )
}
    
export default UpdateSelfSuccess;