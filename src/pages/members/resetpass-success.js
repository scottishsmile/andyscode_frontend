import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/ResetPass.module.scss'
import Image from 'next/image'

const ResetPassSuccess = () => {
    return (
        <Layout
            title='Password Changed'
            description='Password Changed'>
                <div className={styles.pagecontainer}>
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                                    <div className="mb-4 text-center">
                                        <p className="text-success">Thanks!</p>
                                        <p className="text-warning"><b>Password Changed.</b></p>
                                        <p><Link href="/members/profile">Back to Profile</Link></p>
                                        <p><Link href="/members/dashboard">Members Dashboard</Link></p>
                                    </div>
                                </div>
                            </div>
                    </div>
                    
                </div>
        </Layout>
    )
}
    
export default ResetPassSuccess;