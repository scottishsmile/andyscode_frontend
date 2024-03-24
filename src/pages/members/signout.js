import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/Signout.module.scss'
import Image from 'next/image'

const Signout= () => {
    return (
        <Layout
            title='Sign Out'
            description='You have been logged out'>
                <div className={styles.signoutpage}>
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                                    <div className="row justify-content-center mb-4">
                                        <Image src="/smileface.png" width="70" height="69" alt="hi" className="w-25"></Image>
                                    </div>
                                    <div className="mb-4 text-center">
                                        <p className="text-warning"><b>Logged Out!</b></p>
                                        <p className="text-success">You have signed out.</p>
                                        <Link href='/members/login'>Login Again</Link>
                                    </div>
                                </div>
                            </div>
                    </div>
                    
                </div>
        </Layout>
    )
}
    
export default Signout;