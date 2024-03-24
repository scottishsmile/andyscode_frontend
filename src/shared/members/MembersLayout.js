'use client'
import Head from 'next/head';
import styles from '@/styles/members/MembersLayout.module.scss';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { request_refresh } from '@/actions/auth';

// We can pass in the header title and header content from the index page.
// The children is all the other HTML stuff on the index (or whatever) page.

const MembersLayout = ({ title, content, children }) => {

    const dispatch = useDispatch();

    const run = useRef(0);

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            if (run.current !== 0) {
                if (dispatch && dispatch !== null && dispatch !== undefined)
                    dispatch(request_refresh());
            }
            run.current++;
        }
        else {
            if (dispatch && dispatch !== null && dispatch !== undefined)
                dispatch(request_refresh());
        }
        }, [dispatch]);

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

MembersLayout.defaultProps = {
    title: 'My Website',
    content: 'Andys Website'
}

export default MembersLayout;