import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Layout from '@/shared/Layout';
import styles from '@/styles/members/Register.module.scss'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { useState, useRef  } from 'react';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners
import TermsAndConditions from '@/components/termsAndConditions.js';
import GoogleReCaptchaV2 from '@/components/GoogleReCaptchaV2';
import ReCAPTCHA from 'react-google-recaptcha';
import {GOOGLE_RECAPTCHA_SITE_KEY_V2} from '@/constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '@/actions/auth';


const Register = () => {

    const router = useRouter();

    // Redux states
    // useSelector returns state from the redux store.
    // useDispatch runs the redux actions

    // Dispatch calls an action. This triggers a state change.
    // The only way to trigger an action and change the state in the redux store is with a dispatch.
    // mapStateToProps() has been replaced by userSelector() / useDispatch() hooks
    const dispatch = useDispatch();
    const register_success = useSelector(state => state.auth.register_success);                     // Grab the state object from the store. useSelector() does this for you.
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.auth.loading);                                       // Loading Spinner
    const errorMsg = useSelector(state => state.auth.errorMsg_register);

    //const [loading, setLoading] = useState(false);
    const [uniqueUsernameLoading, setUniqueUsernameLoading] = useState(false);
    const [uniqueUsernameErrorMsg, setUniqueUsernameErrorMsg] = useState("Is it available?");
    const [newsletterCheckbox, setNewsletterCheckbox] = useState(true);
    const [reCaptchaVerified, setReCaptchaVerified] = useState(false);
    const captchaRef = useRef(null);


    // Validate Username via Backend API
    const uniqueUsername = async (username) => {

        setUniqueUsernameLoading(true);

        // Check for the field being empty
        if(username === '' || username === undefined || username === null){
            setUniqueUsernameErrorMsg("Enter a username");
            setUniqueUsernameLoading(false);
            return;
        }

        const data = {
            UserName: username,
        }
      
        const JSONdata = JSON.stringify(data)
      
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSONdata,
        }

        // Leave the url like this to avoid CORS errors. No ${HOMEPAGE_URL}
        const response = await fetch(`/api/unique-username-requests`, options);

        const result = await response.json();

        setUniqueUsernameLoading(false);

        // Return message
        if (result.success){
            setUniqueUsernameErrorMsg("OK !");
        }
        else {
            setUniqueUsernameErrorMsg("Username Taken.");
        }
    };


    // Formik Validation rules using Yup
    // validationSchema={validate} in <Formik /> below.
    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Required'),
        username: Yup.string()
            .min(2, 'Must be more than 2 characters')
            .max(70, 'Must be less than 70 characters')
            .required('Required'),
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
        termsconditions: Yup.boolean()
            .oneOf([true], "Accept Terms and Conditions")
            .required('Required'),
    });


    // Handles the newsletter subscription checkbox
    // Toggles the state value
    const newsletterCheckboxHandler = () => {
        setNewsletterCheckbox(!newsletterCheckbox);
    };
    

    // Google Captcha Handler
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
    

    const registerFormSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            Email: event.target.email.value,
            UserName: event.target.username.value,
            Password: event.target.password1.value,
            Newsletter: newsletterCheckbox
          }

        // Redux states
        // Make sure dispatch exists and is not null
        if (dispatch && dispatch !== null && dispatch !== undefined){
            // Call the register action
            dispatch(register(data));
        }

    };

    if(register_success == true){
        router.push('/members/register-success');
    }

    
    return (
        <Layout
            title='Register'
            description='Sign Up For Membership'
            keywords=''>
                <div className={styles.registerpage}>
                    <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                            <div className="row align-items-center justify-content-center">            
                                <Image src="/smileface.png" width="70" height="69" alt="hi" className="w-25"></Image>
                            </div>
                            <Formik
                                initialValues={{
                                    email: "",
                                    username: "",
                                    password1: "",
                                    password2: "",
                                    termsconditions: false
                                }}
                                validationSchema={validate}
                            >
                                {formik => (
                                    <div>
                                        <h3 className={styles.registerBoxHeader}>Sign Up</h3>
                                        <Form onSubmit={registerFormSubmit} id="register-form">
                                            <div className="mb-4">
                                                <label htmlFor="email" className="form-label"><b className={styles.registerBoxText}>Email</b></label>
                                                <Field type="email" id="email" name="email" className="form-control" placeholder="" autoComplete="on"  aria-describedby="emailHelp"required/>
                                                <div id="emailHelp" className="form-test"><span className={styles.registerBoxText}>Enter email address</span></div>
                                                <ErrorMessage name="email" className="text-danger" component="div" />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="username" className="form-label"><b className={styles.registerBoxText}>Username</b></label>
                                                <Field type="text" id="username" name="username" className="form-control" placeholder="" autoComplete="on" aria-describedby="usernameHelp" required/>
                                                <div id="usernameHelp" className="form-test"><span className={styles.registerBoxText}>Enter a username</span></div>
                                                <ErrorMessage name="username" className="text-danger" component="div" />
                                                
                                                {/* Username Check Loading Spinner */}
                                                {
                                                    uniqueUsernameLoading ? (
                                                            <p className="text-center"><SyncLoader
                                                                color='blue'
                                                                loading={uniqueUsernameLoading}
                                                                size={8}
                                                                aria-label="Loading Spinner"
                                                                data-testid="loader"
                                                            /></p>
                                                    ) : (
                                                        <p><button type="button" onClick={() => uniqueUsername(formik.values.username)} className="btn btn-primary w-30">Check Username</button> {uniqueUsernameErrorMsg} </p>
                                                    )
                                                }
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="password1" className="form-label"><b className={styles.registerBoxText}>Password</b></label>
                                                <Field type="password" id="password1"  name="password1" className="form-control" placeholder="" autoComplete="off" aria-describedby="password1Help" required/>
                                                <div id="password1Help" className="form-test"><span className={styles.registerBoxText}>Passwords must be min 8 letters and include Uppercase, numbers and special characters.</span></div>
                                                <ErrorMessage name="password1" className="text-danger" component="div" />
                                           </div>
                                            <div className="mb-4">
                                                <label htmlFor="password2" className="form-label"><b className={styles.registerBoxText}>Password Confirmation</b></label>
                                                <Field type="password" id="password2" name="password2" className="form-control" placeholder="" autoComplete="off" aria-describedby="password2Help" required/>
                                                <div id="password2Help" className="form-test"><span className={styles.registerBoxText}>Enter the same password again</span></div>
                                                <ErrorMessage name="password2" className="text-danger" component="div" />
                                            </div>
                                            <div className="mb-4">
                                                <TermsAndConditions />
                                                <p><Link  href="/termsconditionsfullpage" className={styles.registerBoxLink}>Terms</Link> - <Link  href="/privacypolicyfullpage" className={styles.registerBoxLink}>Privacy Policy</Link></p>
                                                <p>I Accept the Terms and Conditions
                                                <Field type="checkbox"  id='termsconditions' name='termsconditions' className={styles.termsConditionsCheckbox} required/></p>
                                                <ErrorMessage name="termsconditions" className="text-danger" component="div" />
                                            </div>
                                            <div className="mb-4">
                                                <p>Subscribe to our Monthly newsletter ?
                                                <Field type="checkbox"  id='newsletters' name='newsletter' checked={newsletterCheckbox} onChange={newsletterCheckboxHandler} className={styles.termsConditionsCheckbox} /></p>
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
                                                            size={15}
                                                            aria-label="Loading Spinner"
                                                            data-testid="loader"
                                                        />
                                                    </div>
                                                ) : (
                                                    // Keep button disabled until all fields are filled in and validated - disabled={!formik.isValid}
                                                    // Keep button disabled until Google ReCaptcha is verified - disabled={!reCaptchaVerified}
                                                    <button type="submit" className="btn btn-primary w-100" disabled={ !formik.isValid || !reCaptchaVerified} data-sitekey={GOOGLE_RECAPTCHA_SITE_KEY_V2}>Register</button>
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
            </div>
        </Layout>
    )
}
    
export default Register;