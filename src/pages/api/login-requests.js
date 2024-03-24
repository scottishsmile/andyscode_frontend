import cookie from 'cookie';
import { API_URL, API_VERSION_ACCEPT_HEADER, ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME, ACCESS_COOKIE_MAX_AGE, REFRESH_COOKIE_MAX_AGE } from '@/constants/constants';


export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, password, mfaCode, mfaToken } = req.body;

        const normalBody = JSON.stringify({
            username,
            password,
            mfaCode
        });

        const mfaBody = JSON.stringify({
            mfaToken,
            mfaCode,
            username
        });


        try {

            if( mfaCode === "empty" || mfaCode === undefined){

                // First Login, the response will either be 200 (no MFA on account) or 202 (MFA enabled)

                const apiRes = await fetch(`${API_URL}/User/Login`, {
                    method: 'POST',
                    headers: {
                        'Accept': `application/json; ${API_VERSION_ACCEPT_HEADER}`,
                        'Content-Type': 'application/json',
                    },
                    body: normalBody
                });

                const data = await apiRes.json();

                if (apiRes.status === 200) {

                    // Cookies only accept 1 key/value pair.
                    // This is how we get multiple vlaues saved without creating multiple cookies.
                    //let accessInfo = `accessToken=${data.data.accessToken};accessTokenExpiry=${data.data.accessTokenExpiry};username=${data.data.username}`;
                    //let refreshInfo = `refreshToken=${data.data.refreshToken};refreshTokenExpiry=${data.data.refreshTokenExpiry};username=${data.data.username}`;

                    let accessInfo = {};
                    accessInfo.accessToken = data.data.accessToken;
                    accessInfo.accessTokenExpiry = data.data.accessTokenExpiry;
                    accessInfo.username = data.data.username;

                    let accessJson = JSON.stringify(accessInfo);  

                    let refreshInfo = {};
                    refreshInfo.refreshToken = data.data.refreshToken;
                    refreshInfo.refreshTokenExpiry = data.data.refreshTokenExpiry;
                    refreshInfo.username = data.data.username;

                    let refreshJson = JSON.stringify(refreshInfo);  
                    
                    res.setHeader('Set-Cookie', [
                        cookie.serialize(
                            `${ACCESS_COOKIE_NAME}`, accessJson, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV !== 'development',
                                maxAge: ACCESS_COOKIE_MAX_AGE,                                            // Use expires: <token expiry date in UTC>
                                sameSite: 'lax',
                                path: '/'
                            }
                        ),
                        cookie.serialize(
                            `${REFRESH_COOKIE_NAME}`, refreshJson, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV !== 'development',
                                maxAge: REFRESH_COOKIE_MAX_AGE,                                       // Use expires: <token expiry date in UTC>
                                sameSite: 'lax',
                                path: '/'
                            }
                        )
                    ]);

                    // Save user object to Redux global state
                    // ?????????????????????????
                    
                    return res.status(200).json({
                        success: 'Logged in successfully',
                        user: data                               // Include the user details from the login response. username, email, roles.
                    });
                } else if (apiRes.status === 202){

                    // MFA is enabled for the account.
                    // Send back a HTTP 202 so we can set the Mfa Flag in Global state to true and redirect to MFA login page.

                    // A JWT token is provided for the MFA login.
                    // Our responce provdes the JWT token and the code the user entered.
                    return res.status(apiRes.status).json({
                        Username: data.data.username,
                        MfaToken: data.data.mfaToken,
                        MfaTokenExpiry: data.data.mfaTokenExpiry
                    });

                
                } else {
                    return res.status(apiRes.status).json({
                        message: data.message
                    });
                }
            } else {

                // Multi-factor Auth Login
                // MFA Code Supplied.

                const mfaRes = await fetch(`${API_URL}/User/MfaLogin`, {
                    method: 'POST',
                    headers: {
                        'Accept': `application/json; ${API_VERSION_ACCEPT_HEADER}`,
                        'Content-Type': 'application/json',
                    },
                    body: mfaBody
                });

                const data = await mfaRes.json();

                if (mfaRes.status === 200) {
                    
                    let accessInfo = {};
                    accessInfo.accessToken = data.data.accessToken;
                    accessInfo.accessTokenExpiry = data.data.accessTokenExpiry;
                    accessInfo.username = data.data.username;

                    let accessJson = JSON.stringify(accessInfo);  

                    let refreshInfo = {};
                    refreshInfo.refreshToken = data.data.refreshToken;
                    refreshInfo.refreshTokenExpiry = data.data.refreshTokenExpiry;
                    refreshInfo.username = data.data.username;

                    let refreshJson = JSON.stringify(refreshInfo);  
                    
                    res.setHeader('Set-Cookie', [
                        cookie.serialize(
                            `${ACCESS_COOKIE_NAME}`, accessJson, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV !== 'development',
                                maxAge: ACCESS_COOKIE_MAX_AGE,                                            // Use expires: <token expiry date in UTC>
                                sameSite: 'lax',
                                path: '/'
                            }
                        ),
                        cookie.serialize(
                            `${REFRESH_COOKIE_NAME}`, refreshJson, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV !== 'development',
                                maxAge: REFRESH_COOKIE_MAX_AGE,                                       // Use expires: <token expiry date in UTC>
                                sameSite: 'lax',
                                path: '/'
                            }
                        )
                    ]);

                    return res.status(200).json({
                        success: 'Logged in successfully',
                        user: data                               // Include the user details from the login response. username, email, roles.
                    });

                } if (mfaRes.status === 401) { 

                    // MFA Code didn't match
                    // Unauthorized 401 is only returned by the MFA login if the code is not correct.
                    // We don't want to return a fail and send the user back to login, as they may have mis-typed.
                    // We do want to return the API's message though and have the user try again.

                    return res.status(mfaRes.status).json({
                        message: data.message
                    });


                } else {
                    return res.status(mfaRes.status).json({
                        message: data.message
                    });
                }


            }
        } catch(err) {
            return res.status(500).json({
                message: 'Something went wrong when authenticating'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    } 
};