'use client' 
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.
import Link from 'next/link'
import MembersLayout from '@/shared/members/MembersLayout';
import styles from '@/styles/login.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';                      // npm install --save react-spinners
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset_register_success } from '@/actions/auth';

const Login = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user); 
    const mfaFlag = useSelector(state => state.login.mfaFlag);
    const errorMsg = useSelector(state => state.auth.errorMsg_login);
    const loading = useSelector(state => state.auth.loading); 
    const dispatch = useDispatch();

    const router = useRouter();


    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined){
            dispatch(reset_register_success());
        }

        if(mfaFlag === true){
            // MFA is enabled for the account.
            // redirect to MFA page
            router.push('/login-mfa');
        }

    }, [dispatch, mfaFlag]);

    const loginFormSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const formData = {
          UserName: event.target.username.value,
          Password: event.target.password.value,
          MfaCode: "empty",
        }
    
        // Login
        if (dispatch && dispatch !== null && dispatch !== undefined){
            dispatch(login(formData.UserName, formData.Password));
        }

        if(isAuthenticated){
            router.push('/members/dashboard');
        }
        
    }


    if (typeof window !== 'undefined' && isAuthenticated){
        router.push('/members/dashboard');
    }


    return (
        <>
        {isAuthenticated ?
            <div className="text-center">
                <div className="d-flex col align-items-center justify-content-center">
                    <SyncLoader
                        color='blue'
                        loading={true}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                <div className="d-flex col align-items-center justify-content-center">
                    <p>Processing your login details...</p>
                    <Link href="/members/dashboard">Members dashboard</Link>
                </div>
            </div>
        :
        <MembersLayout
            title='Login'
            description='User Login Page'
            keywords=''>
                <div className={styles.loginpage}>
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                                <div className="row justify-content-center mb-4">
                                    <Image src="/smileface.png" width="70" height="69" alt="hi" className="w-25"></Image>
                                </div>
                                <Formik
                                    initialValues={{
                                        username: "",
                                        password: "",
                                    }}
                                >
                                    {formik => (
                                        <div>

                                            <h3 className={styles.loginBoxHeader}>Login</h3>
                                            <Form onSubmit={loginFormSubmit} id="login-form">
                                                <div className="mb-4">
                                                    <label htmlFor="username" className="form-label"><b className={styles.loginBoxText}>Email / Username</b></label>
                                                    <Field type="text" id="username" name="username" className="form-control" placeholder="" autoComplete="on" aria-describedby="usernameHelp" required/>
                                                    <div id="usernameHelp" className="form-test"><span className={styles.loginBoxText}>Enter your email or username</span></div>
                                                    <ErrorMessage name="username" className="text-danger" component="div" />
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="password" className="form-label"><b className={styles.loginBoxText}>Password</b></label>
                                                    <Field type="password" id="password"  name="password" className="form-control" placeholder="" autoComplete="off" aria-describedby="passwordHelp" required/>
                                                    <div id="passwordHelp" className="form-test"><span className={styles.loginBoxText}>Enter your password</span></div>
                                                    <ErrorMessage name="password" className="text-danger" component="div" />
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
                                    <p className={styles.loginBoxTextBottom}>Forgot Password? <Link href="/members/forgotpass" className={styles.loginBoxLink}>Reset</Link></p>
                                    <p className={styles.loginBoxTextBottom}>New User? <Link href="/members/register" className={styles.loginBoxLink}>Sign Up</Link></p>
                                </div>
                                <div>
                                    <p className="text-danger text-center">{errorMsg}</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </MembersLayout>
        }
        </>
    )
}
    
export default Login;

