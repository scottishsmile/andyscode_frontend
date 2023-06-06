import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/Profile.module.scss'
import { useSession } from 'next-auth/react';
import useAuth from '@/auth/useAuth'
import { useState } from 'react';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners
import Switch from 'react-switch';                              // npm install react-switch
import {HOMEPAGE_URL} from '@/constants/constants'
import { boolean } from 'yup/lib/locale';

const Profile = () => {

    const { data: session} = useSession();
    const isAuthenticated = useAuth(true, session);           // true means we should redirect to login page if the user is not authenticated
    const [loading, setLoading] = useState(true);               // Loading spinner on when true.
    const [mfaLoading, setMfaLoading] = useState(false);
    const [mfaSwitch, setMfaSwitch] = useState(false);          // The value of the MFA toggle switch.
    const [errorMsg, setErrorMsg] = useState("");
    
    setTimeout(() => {
        setLoading(false);
    }, 3000);
    

    const MfaSwitchToggle = async (event) => { 

        // Toggle loading spinner ON
        setMfaLoading(true);

        // TESTING
        console.log(`session.MFA_Enabled is now ${session.MFA_Enabled}`);

        const data = {
          UserName: session.user?.username,
          MfaSwitch: !session.MFA_Enabled
        }
      
          const JSONdata = JSON.stringify(data)
      
          // Form the request for sending data to the server.
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSONdata,
          }
      
          // Send the form data to our API
          let token = session?.user.accessToken;
          const response = await fetch(`${HOMEPAGE_URL}/api/toggle-mfa-requests/${token}`, options)
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
    
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();

        // The actual value of the user's MFA state will be returnd as a bool value "Data"
        // Update our session variable with it.
        if(result.data === true){

            // TESTING
            console.log(`result.data is true`);

            setMfaSwitch(true);
            session.MFA_Enabled = true;
        }
        else {

            // TESTING
            console.log(`result.data is false`);

            setMfaSwitch(false);
            session.MFA_Enabled = false;
        }

        // TESTING
        console.log(`After call session.MFA_Enabled is ${session.MFA_Enabled}`);

        // Toggle loading spinner OFF
        setMfaLoading(false);
    }


    return (
        <>
        {isAuthenticated ?
            <Layout
                title='User Profile'
                description='User Profile And Settings'
            >
                <div className={styles.pagecontainer}>
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded p-4 shadow bg-white">
                                <div className={styles.headerText}>
                                    <h2>Profile</h2>
                                </div>
                                <div className={styles.profileTextContainer}>
                                    <div className={styles.profileText}>
                                        <p><span className={styles.profileCategoryName}><b>ID:</b></span> {session?.user.id}</p>
                                        <p><span className={styles.profileCategoryName}><b>UserName:</b></span> {session?.user.username}</p>
                                        <p><span className={styles.profileCategoryName}><b>Email:</b></span> {session?.user.email} </p>
                                        <p><span className={styles.profileCategoryName}><b>Membership Level:</b></span> {session?.user.roles} </p>
                                    </div>
                                </div>
                                <div className={styles.profileChangeContainer}>
                                    <div className={styles.profileChangeText}>
                                        <p><span><b>Make Changes: </b><Link href="/members/updateself" className={styles.link}>[Edit User Profile]</Link></span></p>
                                        <br />
                                        <p><span><b>Password: </b><Link href="/members/resetpass" className={styles.link}> [Change Password]</Link></span></p>
                                        <br />
                                    </div>
                                    <div>
                                    {/* MFA Toogle Switch Loading Spinner */}
                                    {
                                                    mfaLoading ? (
                                                            <p className="text-center"><SyncLoader
                                                                color='blue'
                                                                loading={mfaLoading}
                                                                size={8}
                                                                aria-label="Loading Spinner"
                                                                data-testid="loader"
                                                            /></p>
                                                    ) : (
                                                        <div>
                                                            <p><b>Multi-Factor Authentication: </b></p>
                                                            <div><Switch onChange={MfaSwitchToggle} checked={mfaSwitch}/></div>
                                                            <p>Enabling MFA is recommended!</p>
                                                            <p>We email you a login code to increase security.</p>
                                                            <p>To reduce the amount of logins, we remember that you are logged into this device.</p>
                                                        </div>
                                                    )}
                                    </div>
                                    <div>
                                        <p className="text-danger text-center">{errorMsg}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        : 
        <div>
            {/* Loading Spinner */}
            {
                loading ? (
                    <div className='d-flex justify-content-center align-items-center mt-5'>
                        <SyncLoader
                            color='green'
                            loading={loading}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : (
                    <div className="text-center">
                        <p>Error: User Signed Out! Login to access this page.</p>
                        <p><Link href="/members/login">Login</Link></p>
                    </div>
                )
            }
        </div>
        }
        </>
    )
}
    
export default Profile;