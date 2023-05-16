import styles from '@/styles/blog/BlogLayout.module.scss'
import Head from 'next/head';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer'
import Image from 'next/image'


// We can pass in the header title and header content from the index page.
// The children is all the other HTML stuff on the index (or whatever) page.

const BlogLayout = ({ title, description, keywords, children }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.navbar}>
                <Navbar />
            </div>
            <div id="main" className={styles.main}>
                <div className={styles.blogContainer}>{children}</div>
            </div>
            <Footer />
        </>
    );
};

// Default values incase none passed in.

BlogLayout.defaultProps = {
    title: 'My Blog',
    description: 'Blog and Announcements',
    keywords: 'coding blog, first dev job blog, get first coding job blog'
}

export default BlogLayout;