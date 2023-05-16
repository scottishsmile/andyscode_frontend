import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/AuthError.module.scss'
import Image from 'next/image'

const AuthError = () => {

    // The next auth error message is passed in as /?error=Configuration
    // Example error I got once -  https://localhost:3000/api/auth/error?error=fetch%20failed
    // It will redirect here if in [...nextauth].js you set the pages error option.
    /*
        pages: { 
            signIn: '/members/login',
            error: '/members/auth-error'            // Custom Next Auth Error Page
        },
    */
    // So grab the error from the query params.

    const router = useRouter();
    const { error } = router.query;
    
    return (
        <Layout
            title='Error'
            description='Unexpected Error'
        >
            <div className={styles.pagecontainer}>
                <div className={styles.imagecontainer}>
                    <Image src="/error.png" width="130" height="116" alt="error"></Image>
                </div>
                <div className={styles.textcontainer}>
                    <br />
                    <h2 className="text-danger">Error</h2>
                    <p>Sorry, this wasn't meant to happen...</p>
                    <br />
                    <p className="text-warning"><b>{error}</b></p>
                    <br />
                    <p><Link href="/">Home</Link></p>
                </div>
            </div>
        </Layout>
    )
}
    
export default AuthError;