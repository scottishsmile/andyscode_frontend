import Head from 'next/head';
import styles from '@/styles/Layout.module.scss'
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';


// We can pass in the header title and header content from the index page.
// The children is all the other HTML stuff on the index (or whatever) page.

const Layout = ({ title, content, children }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={content} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.navbar}>
            <Navbar />
            </div>
            <div id="main" className={styles.main}>
                {children}
            </div>
            <Footer />
        </>
    );
};

// Default values incase none passed in.

Layout.defaultProps = {
    title: 'My Website',
    content: 'Andys Website'
}

export default Layout;