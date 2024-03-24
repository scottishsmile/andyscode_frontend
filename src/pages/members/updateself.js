'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MembersLayout from '@/shared/members/MembersLayout';
import styles from '@/styles/members/UpdateSelf.module.scss'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners
import { useSelector } from 'react-redux';


const UpdateSelf = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user); 
    const accessToken = useSelector(state => state.auth.accessToken); 

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    if (typeof window !== 'undefined' && !isAuthenticated){
        
        // If unathenticated redirect them back to login page
        router.push('/login');
    }


    // Formik Validation
    // No need to make any fields "required", user won't want to change everything.
    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid'),

        username: Yup.string()
            .min(2, 'Must be more than 2 characters')
            .max(70, 'Must be less than 70 characters'),
    })


    const updateSelfFormSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Toggle loading spinner ON
        setLoading(true);

    
        // Get data from the form.
        // Send "unchaged" to the API if the field is null/blank
        // Our API validation rejects nulls.
        const data = {
            Email: event.target.email.value ? event.target.email.value : "unchanged",
            Id: user?.id,
            NewUserName: event.target.username.value ? event.target.username.value : "unchanged",
        }
    
        const JSONdata = JSON.stringify(data)
    
        // Form the request for sending data to the server.
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSONdata,
        }
    

        // Send the request to the API
        // Use NextJS Dynamic Routes to pass the token as a query string to the api folder requests module.
        // https://nextjs.org/docs/api-routes/dynamic-api-routes
        const response = await fetch(`/api/updateself-requests/${accessToken}`, options)
    
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()

        // Toggle loading spinner OFF
        setLoading(false);

        // Route to success page.
        // User will be auto logged off in 3 secs on this page.
        if (result.success){
            router.push('/members/updateself-success');
        }
        else {
            // Display the API Error Message On The Page
            setErrorMsg(result.message);
        }

    };



    return (
        <>
        {isAuthenticated ?
            <MembersLayout
                title='Update Profile'
                description='Edit your user profile'
            >
                <div className={styles.pagecontainer}>
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                                <Formik
                                            initialValues={{
                                                email: "",
                                                username: "",
                                            }}
                                            validationSchema={validate}
                                        >
                                        {formik => (
                                            <div>
                                                <h3 className={styles.updateBoxHeader}>Update Profile</h3>
                                                <p>If you change your email adress, we will send a validation email to your new address.</p>
                                                <p>Users can log in with their old email address until they confirm their new one.</p>
                                                <br />
                                                <Form onSubmit={updateSelfFormSubmit}>
                                                    <div className="mb-4">
                                                        <p><b>Email: </b><i>{user?.email}</i></p>
                                                        <label htmlFor="email" className="form-label"><b className={styles.updateBoxText}>New Email</b></label>
                                                        <Field type="email" id="email" name="email" className="form-control" placeholder="" autoComplete="on"  aria-describedby="emailHelp"/>
                                                        <div id="emailHelp" className="form-test"><span className={styles.updateBoxText}>Enter new email address</span></div>
                                                        <ErrorMessage name="email" className="text-danger" component="div" />
                                                    </div>
                                                    <div className="mb-4">
                                                        <p><b>UserName: </b><i>{user?.userName}</i></p>
                                                        <label htmlFor="username" className="form-label"><b className={styles.updateBoxText}>New Username</b></label>
                                                        <Field type="text" id="username" name="username" className="form-control" placeholder="" autoComplete="on" aria-describedby="usernameHelp"/>
                                                        <div id="usernameHelp" className="form-test"><span className={styles.updateBoxText}>Enter new username</span></div>
                                                        <ErrorMessage name="username" className="text-danger" component="div" />
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
                                                            // Allow the user to submit with blank fields, they won't want to change everything!
                                                            <button type="submit" className="btn btn-primary w-100">Update</button>
                                                        )
                                                    }
                                                </Form>
                                            </div>
                                        )}
                                        </Formik>
                                        <div className={styles.updateBoxTextBottom}>
                                            <p><Link href='/members/profile' className={styles.updateBoxLink}>Back To Profile</Link></p>
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
    
export default UpdateSelf;