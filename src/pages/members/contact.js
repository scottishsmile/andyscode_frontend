'use client'
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.
import Link from 'next/link'
import MembersLayout from '@/shared/members/MembersLayout';
import styles from '@/styles/members/Contact.module.scss'
import GoogleReCaptchaV2 from '@/components/GoogleReCaptchaV2';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import {GOOGLE_RECAPTCHA_SITE_KEY_V2} from '@/constants/constants';
import { useSelector } from 'react-redux';


const Contact = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user); 
    const accessToken = useSelector(state => state.auth.accessToken); 

    const [loading, setLoading] = useState(false);          // Loading spinner on when true.
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();
    const captchaRef = useRef(null);
    const [reCaptchaVerified, setReCaptchaVerified] = useState(false);


    if (typeof window !== 'undefined' && !isAuthenticated){
        
        // If unathenticated redirect them back to login page
        router.push('/login');
    }
    
    // Formik Validation rules using Yup
    // validationSchema={validate} in <Formik /> below.
    const validate = Yup.object({
        subject: Yup.string()
            .min(2, 'Must be more than 2 characters')
            .max(70, 'Must be less than 70 characters')
            .required('Required'),
        message: Yup.string()
            .min(2, 'Must be more than 2 characters')
            .max(3000, 'Must be less than 3000 characters')
            .required('Required'),
    });


    const reCaptchaHandler = async () => {

        // Get Google ReCaptcha Score
        let captchaToken = captchaRef.current.getValue();

         let captchaResult = await GoogleReCaptchaV2(captchaToken);
 
         if(captchaResult){
            setReCaptchaVerified(true);
         }
         else {
            setReCaptchaVerified(false);

            // Reset The Capatcha. Clear the green tick so they can try again.
            captchaRef.current.reset();
         }
    }

    const contactFormSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Toggle loading spinner ON
        setLoading(true);

        // Get data from the form.
        const data = {
          UserName: user?.userName,
          Subject: event.target.subject.value,
          Message: event.target.message.value,
        }

        const JSONdata = JSON.stringify(data);
      
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSONdata,
        }


        // Send the request to the API
        // Use NextJS Dynamic Routes to pass the token as a query string to the api folder requests module.
        // https://nextjs.org/docs/api-routes/dynamic-api-routes
        const response = await fetch(`/api/contact-requests/${accessToken}`, options);
    
        const result = await response.json();

        // Toggle loading spinner OFF
        setLoading(false);

        // Route to success page.
        if (result.success){
            router.push('/members/contact-success');
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
                    title='Contact'
                    description='Contact Us Form'
                >
                    <div className={styles.pagecontainer}>
                        <div className={styles.formContainer}>
                            <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                                <Formik
                                    initialValues={{
                                        subject: "",
                                        message: "",
                                    }}
                                    validationSchema={validate}
                                >
                                    {formik => (
                                        <div>

                                            <h3 className={styles.contactBoxHeader}>Contact Us</h3>
                                            <p className="text-center">We will try to respond in a timely manner, please allows 48-72 hrs. </p>
                                            <p className="text-center">Remember to check your junk email folder for our reply!</p>
                                            <br />
                                            <Form onSubmit={contactFormSubmit} id="contact-form">
                                                <div className="mb-4">
                                                    <label htmlFor="username" className="form-label"><b className={styles.contactBoxText}>Username: </b></label>
                                                    <span> {user?.userName}</span>
                                                </div>
                                                <div className="mb-4">
                                                <label htmlFor="email" className="form-label"><b className={styles.contactBoxText}>Email: </b></label>
                                                <span> {user?.email}</span>
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="subject" className="form-label"><b className={styles.contactBoxText}>Subject</b></label>
                                                <Field type="text" id="subject"  name="subject" className="form-control" placeholder="" autoComplete="off" aria-describedby="subjectHelp" required/>
                                                <div id="subjectHelp" className="form-test"><span className={styles.contactBoxText}>What's the subject of the message?</span></div>
                                                <ErrorMessage name="subject" className="text-danger" component="div" />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="message" className="form-label"><b className={styles.contactBoxText}>Message</b></label>
                                                <Field component="textarea" rows="8" id="message"  name="message" className="form-control" placeholder="" autoComplete="off" aria-describedby="messageHelp" required/>
                                                <div id="message" className="form-test"><span className={styles.contactBoxText}>Enter your message</span></div>
                                                <ErrorMessage name="message" className="text-danger" component="div" />
                                            </div>
                                            <div className={styles.captchaContainer}>
                                                {/* Google Captcha Widget */}
                                                <ReCAPTCHA size="normal" sitekey={GOOGLE_RECAPTCHA_SITE_KEY_V2} ref={captchaRef} onChange={reCaptchaHandler}/>
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
                                                    <button type="submit" className="btn btn-primary w-100 g-recaptcha" disabled={ !formik.isValid || !reCaptchaVerified } data-sitekey={GOOGLE_RECAPTCHA_SITE_KEY_V2} >Send</button>
                                                )
                                            }
                                            </Form>
                                        </div>
                                    )}
                                </Formik>
                                <div>
                                    <p className="text-danger text-center">{errorMsg}</p>
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
    
export default Contact;