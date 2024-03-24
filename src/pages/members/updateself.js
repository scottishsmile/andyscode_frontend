'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/UpdateSelf.module.scss'
import { useSession } from 'next-auth/react';
import useAuth from '@/auth/useAuth'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners


const UpdateSelf = () => {

    const { data: session} = useSession();
    const isAuthenticated = useAuth(true, session); 
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();


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
            Id: session?.user.id,
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
        let token = session?.user.accessToken;
        const response = await fetch(`/api/updateself-requests/${token}`, options)
    
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()

        /*
        // Update Global User State
        // The API's profile details will have now changed but the frontend's useSessions() will still return the old profile details
        // Do a Get User request
        let token2 = session?.user.accessToken;         // Get token again incase it was just refreshed.
        let userId = session?.user.id;
        const getUser = await fetch(`/api/getuserbyid-requests?token=${token2}&id=${userId}`)

        const getData = await getUser.json();

        console.log(`updateself.js - getUser fetch complete! status: ${getUser.status}`);

        if (getUser.status === 200) {
            // SUCCESS
            console.log(`updateself.js - Get USER request complete. 200OK`)

        } else {
            // FAIL
            console.log(`updateself.js - Get USER fail. API status: ${getUser.status} API response: `, getUser)
            setErrorMsg(getData.message);
        }
        */

        // Toggle loading spinner OFF
        setLoading(false);

        // Route to success page.
        // User will be auto logged off in 3 secs on this page. It's the only way to refresh the next auth session.
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
            <Layout
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
                                                        <p><b>Email: </b><i>{session?.user.email}</i></p>
                                                        <label htmlFor="email" className="form-label"><b className={styles.updateBoxText}>New Email</b></label>
                                                        <Field type="email" id="email" name="email" className="form-control" placeholder="" autoComplete="on"  aria-describedby="emailHelp"/>
                                                        <div id="emailHelp" className="form-test"><span className={styles.updateBoxText}>Enter new email address</span></div>
                                                        <ErrorMessage name="email" className="text-danger" component="div" />
                                                    </div>
                                                    <div className="mb-4">
                                                        <p><b>UserName: </b><i>{session?.user.username}</i></p>
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
            </Layout>
        : 
        <div>
            <p>Loading... Taking too long? Try:</p>
            <p><Link href="/members/login">Login</Link></p>
        </div>
        }
        </>
    )
}
    
export default UpdateSelf;