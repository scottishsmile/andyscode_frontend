import Link from 'next/link'
import styles from '@/styles/404.module.scss'
import Layout from '@/shared/Layout';
import Image from 'next/image'

const NotFoundPage = () => {
    return (
        <Layout
        title='404'
        description='Page Not Found'
        keywords=''
    >
        <div className={styles.pagecontainer}>
            <div className={styles.imagecontainer}>
                <Image src="/404.png" width="130" height="146" alt="404"></Image>
            </div>
            <div className={styles.textcontainer}>
                <br />
                <h4 className="text-danger">Sorry</h4>
                <p>That page no longer exists.</p>
                <br />
                <p><Link href="/">Home</Link></p>
            </div>
        </div>
    </Layout>
    );
}

export default NotFoundPage;