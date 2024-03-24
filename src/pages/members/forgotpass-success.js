import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/ForgotPass.module.scss'
import Image from 'next/image'

const ForgotPassSuccess = () => {
    return (
        <Layout
            title='Email Sent'
            description='Password Reset Email Sent'>
                <div className={styles.forgotpasspage}>
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                                    <div className="row justify-content-center mb-4">
                                        <Image src="/smileface.png" width="70" height="69" alt="hi" className="w-25"></Image>
                                    </div>
                                    <div className="mb-4 text-center">
                                        <p className="text-success">Thanks!</p>
                                        <p className="text-success">Password Reset Email Sent.</p>
                                        <p className="text-warning"><b>Check Your Junk Email Folder.</b></p>
                                        <Link href='/members/login'>Login Again</Link>
                                    </div>
                                </div>
                            </div>
                    </div>
                    
                </div>
        </Layout>
    )
}
    
export default ForgotPassSuccess;