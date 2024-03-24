'use client'
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.
import Link from 'next/link'
import MembersLayout from '@/shared/members/MembersLayout';
import styles from '@/styles/members/ResetPass.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useState } from 'react';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';



const ResetPass = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user); 
    const accessToken = useSelector(state => state.auth.accessToken); 

    const [loading, setLoading] = useState(false);          // Loading spinner on when true.
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    if (typeof window !== 'undefined' && !isAuthenticated){
        
        // If unathenticated redirect them back to login page
        router.push('/login');
    }


    // Formik Validation rules using Yup
    // validationSchema={validate} in <Formik /> below.
    const validate = Yup.object({
        password1: Yup.string()
            .min(8, 'Must be more than 8 characters')
            .max(70, 'Must be less than 70 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Password Not Strong Enough!"
              )
            .required('Required'),
        password2: Yup.string()
            .oneOf([Yup.ref('password1'), null], 'Password does not match')
            .required('Required'),
    })

    const ForgotPassSubmit = async (event) => {

        event.preventDefault()

        // Toggle loading spinner ON
        setLoading(true);
    
        // Make the DTO.
        const formData = {
            UserName: user?.userName,
            NewPassword: event.target.password1.value,
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
        // Use NextJS Dynamic Routes to pass the token as a query string to the api folder requests module.
        // https://nextjs.org/docs/api-routes/dynamic-api-routes
        const response = await fetch(`/api/resetpass-requests/${accessToken}`, options)
        .then((res) => {
            if(res.ok){
                return res;
            } else {
                setErrorMsg(res.error);
                return res;
            }
        })
        .catch((error) => {
            setErrorMsg("Sorry, our servers are very busy... Try again?");
          });


        const result = await response.json()


        // Toggle loading spinner OFF
        setLoading(false);

        // Route to success page.
        if (result.success){
            router.push('/members/resetpass-success');
        }
        else {
            // Display the API Error Message On The Page
            setErrorMsg(result.message);
        }


    }

    return (
        <>
        {isAuthenticated ?
            <MembersLayout
            title='Reset Pass'
            description='Password Reset Page'>
                <div className={styles.pagecontainer}>
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                                <Formik
                                    initialValues={{
                                        password1: "",
                                        password2: ""
                                    }}
                                    validationSchema={validate}
                                    >
                                    {formik => (
                                        <div>

                                            <h3 className={styles.passwordBoxHeader}>Change Password</h3>
                                            <Form onSubmit={ForgotPassSubmit}>
                                            <div className="mb-4">
                                                    <label htmlFor="password1" className="form-label"><b className={styles.passwordBoxText}>New Password</b></label>
                                                    <Field type="password" id="password1"  name="password1" className="form-control" placeholder="" autoComplete="off" aria-describedby="password1Help" required/>
                                                    <div id="password1Help" className="form-test"><span className={styles.passwordBoxText}>Passwords must be min 8 letters and include Uppercase, numbers and special characters.</span></div>
                                                    <ErrorMessage name="password1" className="text-danger" component="div" />
                                            </div>
                                                <div className="mb-4">
                                                    <label htmlFor="password2" className="form-label"><b className={styles.passwordBoxText}>New Password Confirmation</b></label>
                                                    <Field type="password" id="password2" name="password2" className="form-control" placeholder="" autoComplete="off" aria-describedby="password2Help" required/>
                                                    <div id="password2Help" className="form-test"><span className={styles.passwordBoxText}>Enter the same password again</span></div>
                                                    <ErrorMessage name="password2" className="text-danger" component="div" />
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
                                                    <button type="submit" className="btn btn-primary w-100" disabled={!formik.isValid}>Change Password</button>
                                                )
                                            }
                                            </Form>
                                        </div>
                                    )}
                                </Formik>
                                <div className={styles.passwordBoxTextBottom}>
                                    <p><Link href='/members/profile' className={styles.passwordBoxLink}>Back To Profile</Link></p>
                                </div>
                                <div>
                                    <p className="text-danger text-center">{errorMsg}</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </MembersLayout>
    : 
    <div>
        <p>Loading... Taking too long? Try:</p>
        <p><Link href="/login">Login</Link></p>
    </div>
    }
    </>
    )
}
    
export default ResetPass;