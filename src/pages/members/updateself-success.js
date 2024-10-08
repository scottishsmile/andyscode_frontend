'use client'
import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/UpdateSelf.module.scss'
import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/actions/auth';
import { useRouter } from 'next/router';


const UpdateSelfSuccess = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user); 

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        // Log the user out in 3 secs
        setTimeout(() => { 
            
            dispatch(logout()); 

            router.push('/login');
        
        }, 3000);
    }, []);



    return (
        <>
        {isAuthenticated ?
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
        : 
        <div>
            <div>
                <p>Error: User Signed Out! Login to access this page.</p>
                <p><Link href="/login">Login</Link></p>
            </div>
        </div>
        }
        </>
    )
}
    
export default UpdateSelfSuccess;