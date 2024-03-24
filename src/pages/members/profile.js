'use client'
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.
import Link from 'next/link'
import MembersLayout from '@/shared/members/MembersLayout';
import styles from '@/styles/members/Profile.module.scss'
import { useRouter } from 'next/router'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SyncLoader } from 'react-spinners';                      // npm install --save react-spinners
import MembershipLevel from '@/components/members/MembershipLevel'
import { toggle_mfa } from '@/actions/auth';


const Profile = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user); 
    const [loading, setLoading] = useState(false)
    const enableMfa = useSelector(state => state.auth.user?.enableMFA); 
    const mfaChangeSuccess = useSelector(state => state.auth.mfa_change_success); 

    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    if (typeof window !== 'undefined' && !loading && !isAuthenticated){
        
        // If unathenticated redirect them back to login page
        router.push('/login');
    }

    const MfaToggleButton = async (event) => { 

        event.preventDefault();

        setLoading(true);

        const mfaSwitch = !enableMfa;

        dispatch(toggle_mfa(mfaSwitch))

        // User will be logged out on this page.
        if (mfaChangeSuccess){
            router.push('/members/mfaChange-success');
        }
        else {
            setErrorMsg("Error! Sorry, we could not change the MFA.");
        }

        setLoading(false);

    }


    return (
        <>
        {isAuthenticated ?
            <MembersLayout
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
                                        <p><span className={styles.profileCategoryName}><b>ID:</b></span> {user !== null && user.id}</p>
                                        <p><span className={styles.profileCategoryName}><b>UserName:</b></span> {user !== null && user.userName}</p>
                                        <p><span className={styles.profileCategoryName}><b>Email:</b></span> {user !== null && user.email} </p>
                                        <p><span className={styles.profileCategoryName}><b>Membership Level:</b></span> <MembershipLevel roles={user?.roles}/> </p>
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
                                        { loading ? (<p>loading is true</p>) : ( <p>loading is false</p>)}
                                    </div>
                                    <div>
                                        {/* MFA Toogle Switch Loading Spinner */}
                                        {
                                            loading ? (
                                                    <p className="text-center"><SyncLoader
                                                        color='blue'
                                                        loading={loading}
                                                        size={8}
                                                        aria-label="Loading Spinner"
                                                        data-testid="loader"
                                                    /></p>
                                            ) : (
                                                <div>
                                                    <p><b>Multi-Factor Authentication: </b></p>
                                                    { enableMfa ?
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
            </MembersLayout>
        : 
        <div>
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
                        <br />
                        <p>Logging in...</p>
                        <p><Link href="/login">Login</Link></p>
                    </div>
                </div>
        </div>
        }
        </>
    )
}
    
export default Profile;