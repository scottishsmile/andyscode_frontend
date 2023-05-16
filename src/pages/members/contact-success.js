import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/ContactSuccess.module.scss'
import Image from 'next/image'

const ContactSuccess = () => {
    return (
        <Layout
            title='Message Sent'
            description='Your message was successfully sent.'>
                <div className={styles.pagecontainer}>
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                                    <div className="row justify-content-center mb-4">
                                        <Image src="/smileface.png" width="70" height="69" alt="hi" className="w-25" ></Image>
                                    </div>
                                    <div className="mb-4 text-center">
                                        <p className="text-success">Thanks!</p>
                                        <p className="text-success">Message Sent.</p>
                                        <p className="text-warning"><b>Allow 48-72 hours for a reply.</b></p>
                                        <Link href='/members/dashboard'>Dashboard</Link>
                                    </div>
                                </div>
                            </div>
                    </div>
                    
                </div>
        </Layout>
    )
}
    
export default ContactSuccess;