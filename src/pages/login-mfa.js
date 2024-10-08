'use client'
import Link from 'next/link'
import Layout from '@/shared/Layout'
import styles from '@/styles/Login.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';                      // npm install --save react-spinners
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { mfaLogin, reset_register_success } from '@/actions/auth';


const MfaPage = () => {

    const [loading, setLoading] = useState(false);          // Loading spinner on when true.
    const router = useRouter();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const username = useSelector(state => state.login.username); 
    const password = useSelector(state => state.login.password); 
    const mfaToken = useSelector(state => state.login.mfaToken); 
    const errorMsg = useSelector(state => state.auth.errorMsg_login);


    // If user is not authenticated redirect them back to login page.
    // Only logged in users should be able to see the dashboard page.
    if (typeof window !== 'undefined' && isAuthenticated){
        router.push('/members/dashboard');
    }


    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(reset_register_success());
    }, [dispatch]);


    const mfaFormSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Toggle loading spinner ON
        setLoading(true);

        // Get data from the form.
        const mfaCode = event.target?.code.value;
    
        // Send the form data to Next Auth
        if (dispatch && dispatch !== null && dispatch !== undefined){
            dispatch(mfaLogin(username, password, mfaCode, mfaToken));
        }

        // Toggle loading spinner OFF
        setLoading(false);

    }


    return (
        <>
        <Layout
            title='MFA Code'
            description='Multi-Factor Authentication Page'
            keywords=''>
                <div className={styles.loginpage}>
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                                <div className="row justify-content-center mb-4">
                                    <Image src="/smileface.png" width="70" height="69" alt="hi" className="w-25"></Image>
                                </div>
                                <Formik>
                                    {formik => (
                                        <div>

                                            <h3 className={styles.loginBoxHeader}>Login Code</h3>
                                            <Form onSubmit={mfaFormSubmit} id="mfa-form">
                                                <div className="mb-4">
                                                    <label htmlFor="code" className="form-label"><b className={styles.loginBoxText}>Login Code</b></label>
                                                    <Field type="text" id="code" name="code" className="form-control" placeholder="" autoComplete="off" aria-describedby="codeHelp" required/>
                                                    <div id="codeHelp" className="form-test"><span className={styles.loginBoxText}>Enter the login code emailed to you</span></div>
                                                    <ErrorMessage name="code" className="text-danger" component="div" />
                                                </div>
                                            {/* Loading Spinner */}
                                            {
                                                loading ? (
                                                    <div className='d-flex justify-content-center align-items-center mt-5'>
                                                        <SyncLoader
                                                            color='blue'
                                                            loading={loading}
                                                            size={20}
                                                            aria-label="Loading Spinner"
                                                            data-testid="loader"
                                                        />
                                                    </div>
                                                ) : (
                                                    // Keep button disabled until all fields are filled in and validated - disabled={!formik.isValid}
                                                    <button type="submit" className="btn btn-primary w-100" disabled={ !formik.isValid } >Login</button>
                                                )
                                            }
                                            </Form>
                                        </div>
                                    )}
                                </Formik>
                                <div>
                                    <p className={styles.loginBoxTextBottom}>Go back to login page? <Link href="/login" className={styles.loginBoxLink}>Back</Link></p>
                                </div>
                                <div>
                                    <p className="text-danger text-center">{errorMsg}</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
        </>
    )
}
    
export default MfaPage;

