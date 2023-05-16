import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/ForgotPass.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useState } from 'react';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners
import { Formik, Form, ErrorMessage, Field } from 'formik';
import {HOMEPAGE_URL} from '@/constants/constants';


const ForgotPass= () => {

    const [loading, setLoading] = useState(false);          // Loading spinner on when true.
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    // Formik Validation rules using Yup
    // validationSchema={validate} in <Formik /> below.
    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Required'),
    });

    const ForgotPassSubmit = async (event) => {

        event.preventDefault()

        // Toggle loading spinner ON
        setLoading(true);
    
        // Get Form Data
        const formData = {
            Email: event.target.email.value,
        };

        // Fetch Payload and Options
        const data = JSON.stringify(formData)

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: data,
          }

        // Send the request to the API
        const response = await fetch(`${HOMEPAGE_URL}/api/forgotpass-requests`, options);
        const result = await response.json()


        // Toggle loading spinner OFF
        setLoading(false);

        // Route to success page.
        if (result.success){
            router.push('/members/forgotpass-success');
        }
        else {
            // Display the API Error Message On The Page
            setErrorMsg(result.message);
        }


    }

    return (
        <Layout
        title='Forgot Pass'
        description='Password Rest Page'>
            <div className={styles.forgotpasspage}>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                            <div className="row justify-content-center mb-4">
                                <Image src="/question_mark.png" width="70" height="69" alt="hi" className="w-25"></Image>
                            </div>
                            <Formik
                                initialValues={{
                                    email: "",
                                }}
                                validationSchema={validate}
                                >
                                {formik => (
                                    <div>

                                        <h3 className={styles.passwordBoxHeader}>Reset Password</h3>
                                        <Form onSubmit={ForgotPassSubmit}>
                                            <div className="mb-4">
                                                <label htmlFor="email" className="form-label"><b className={styles.passwordBoxText}>Your Account's Email</b></label>
                                                <Field type="email" id="email" name="email" className="form-control" placeholder="" autoComplete="on" aria-describedby="usernameHelp" required/>
                                                <div id="emailHelp" className="form-test"><span className={styles.passwordBoxText}>Enter your account's email address. A password reset email will be sent.</span></div>
                                                <ErrorMessage name="email" className="text-danger" component="div" />
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
                                                <button type="submit" className="btn btn-primary w-100" disabled={!formik.isValid}>Send Reset Email</button>
                                            )
                                        }
                                        </Form>
                                    </div>
                                )}
                            </Formik>
                            <div className={styles.passwordBoxTextBottom}>
                            <p className="text-success text-center"><Link href='/members/login' className={styles.passwordBoxLink}>Back To Login</Link></p>
                            </div>
                            <div>
                                <p className="text-danger text-center">{errorMsg?.error}</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    )
}
    
export default ForgotPass;