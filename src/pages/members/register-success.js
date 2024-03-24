import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/RegisterSuccess.module.scss'

const RegisterSuccess = () => {
    return (
        <Layout
            title='Success'
            description='Successful Registration'
        >
            <div className={styles.pagecontainer}>
                <div className={styles.registerpage}>
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                                <div className="row align-items-center justify-content-center">            
                                    <Image src="/smileface.png" width="70" height="69" alt="hi" className="w-25"></Image>
                                </div>
                                <h2 className="text-success text-center"><b>Success!</b></h2>
                                <h3 className="text-success">Next Step: Confirm your email address.</h3>
                                <h4>Confirmation email sent, open it and click the link.</h4>
                                <h4>Please check your <b className="text-danger">junk email folder</b> incase it ends up there.</h4>
                                <br />
                                <p><Link href="/login">Log In</Link> ( after confirming your email )</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
    
export default RegisterSuccess;