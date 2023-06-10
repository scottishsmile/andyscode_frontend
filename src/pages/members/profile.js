import Link from 'next/link'
import Layout from '@/shared/Layout';
import styles from '@/styles/members/Profile.module.scss'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import useAuth from '@/auth/useAuth'
import { useState } from 'react';
import {SyncLoader} from 'react-spinners';                      // npm install --save react-spinners
import {HOMEPAGE_URL} from '@/constants/constants'
import MembershipLevel from '@/components/members/MembershipLevel'

const Profile = () => {

    const { data: session} = useSession();
    const isAuthenticated = useAuth(true, session);           // true means we should redirect to login page if the user is not authenticated
    const [mfaLoading, setMFALoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();


    const MfaToggleButton = async (event) => { 

        event.preventDefault();

        setMFALoading(true);

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
    
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();

        setMFALoading(false);

        // User will be logged out on this page, easiest way to update the session object.
        if (result.success){
            router.push('/members/mfaChange-success');
        }
        else {
            // Display the API Error Message On The Page
            setErrorMsg(result.message);
        }


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
                                        <p><span className={styles.profileCategoryName}><b>Membership Level:</b></span> <MembershipLevel roles={session?.user.roles}/> </p>
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
                                                    { session?.MFA_Enabled ?
                                                        <div><button type="submit" className="btn btn-primary w-100" onClick={MfaToggleButton}>Disable</button></div>
                                                        :
                                                        <div><button type="submit" className="btn btn-primary w-100" onClick={MfaToggleButton}>Enable</button></div>
                                                    }
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
            <div className="text-center">
                <p>Error: User Signed Out! Login to access this page.</p>
                <p><Link href="/members/login">Login</Link></p>
            </div>
        </div>
        }
        </>
    )
}
    
export default Profile;