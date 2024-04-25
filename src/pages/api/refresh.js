import cookie from 'cookie';
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME, COOKIE_DOMAIN, ACCESS_COOKIE_MAX_AGE, REFRESH_COOKIE_MAX_AGE } from '@/constants/constants';
import moment from 'moment';
import RefreshAccessToken from './refreshAccessToken.js';


export default async (req, res) => {
    if (req.method === 'POST') {

        try{
            const cookies = cookie.parse(req.headers.cookie ?? '');
            let userName = false;
            let refreshToken = false;
            let refreshTokenExpiry = new Date(0).toISOString();                                  // Date(0) is 1970
            let accessToken = false;
            let accessTokenExpiry = new Date(0).toISOString();                                  // Date(0) is 1970

            if(cookies !== '' && cookies !== undefined){
                let refreshCookie = cookies[REFRESH_COOKIE_NAME];

                if(refreshCookie !== undefined){
                    const refreshCookieDecoded = decodeURI(refreshCookie).trim();        // The cookie value is in base64 url format. Converts into a srting.        

                    const refreshData = await JSON.parse(refreshCookieDecoded);               // Convert the string into JSON.

                    userName  =  refreshData.username ?? false;       // Get username from refresh token! The access token will be deleted by the browser when it reaches its maxAge.
                    refreshToken = refreshData.refreshToken ?? false;
                    refreshTokenExpiry = refreshData.refreshTokenExpiry;
                }

                // The access token will be deleted by the browser once it reaches it's maxAge.
                // It might not exist when user opens the site again.
                let accessCookie = cookies[ACCESS_COOKIE_NAME];

                if(accessCookie !== undefined ){
                    const accessCookieDecoded = decodeURI(accessCookie).trim(); 

                    const accessData = await JSON.parse(accessCookieDecoded); 

                    if(accessData != null){
                        accessToken = accessData.accessToken ?? false;
                        accessTokenExpiry = accessData.accessTokenExpiry;
                    }
                }
            }

            if (refreshToken === false  || refreshToken === undefined || userName === false || userName === undefined) {

                return res.status(401).json({
                    error: 'User unauthorized to make this request'
                });
            }

            let utcDateNow = new Date().toISOString();

            const earlyTokenExpiry = moment(accessTokenExpiry).subtract(2, 'minutes').toISOString();

            if (earlyTokenExpiry > utcDateNow) {

                const data = {
                    refreshToken: refreshToken,
                    refreshTokenExpiry: refreshTokenExpiry,
                    accessToken: accessToken,
                    accessTokenExpiry: accessTokenExpiry
                }

                // Access token is still valid, not yet expired!
                return res.status(200).json({
                    user: { data: data },
                    success: 'Access Token Is Still Valid'
                });
            }

            // If the access token has expired, refresh it.
            let refreshed = await RefreshAccessToken(refreshToken, userName);

            if(refreshed === false){

                // TESTING
                console.log(`api/refresh.js - RefreshAccessToken() failed`);

                return res.status(500).json({
                    error: 'Refresh Token Not Renewed. User Logged Out.'
                });
            }

            // Success 200 OK
            // Lets build new access and refresh cookies with the API's response.

            let accessInfo = {};
            accessInfo.accessToken = refreshed.data.accessToken;
            accessInfo.accessTokenExpiry = refreshed.data.accessTokenExpiry;
            accessInfo.username = refreshed.data.userName;

            let accessJson = JSON.stringify(accessInfo);  

            let refreshInfo = {};
            refreshInfo.refreshToken = refreshed.data.refreshToken;
            refreshInfo.refreshTokenExpiry = refreshed.data.refreshTokenExpiry;
            refreshInfo.username = refreshed.data.userName;

            let refreshJson = JSON.stringify(refreshInfo);  
            
            // Create new Access and Refresh Cookies.

            res.setHeader('Set-Cookie', [
                cookie.serialize(
                    `${ACCESS_COOKIE_NAME}`, accessJson, {
                        httpOnly: true,
                        domain: `${COOKIE_DOMAIN}`,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: ACCESS_COOKIE_MAX_AGE,                                            // Use expires: <token expiry date in UTC>
                        sameSite: 'lax',
                        path: '/'
                    }
                ),
                cookie.serialize(
                    `${REFRESH_COOKIE_NAME}`, refreshJson, {
                        httpOnly: true,
                        domain: `${COOKIE_DOMAIN}`,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: REFRESH_COOKIE_MAX_AGE,                                       // Use expires: <token expiry date in UTC>
                        sameSite: 'lax',
                        path: '/'
                    }
                )
            ]);

            return res.status(200).json({
                user: { data: refreshed.data },
                success: 'Refresh request successful',
            });

        } catch(err) {

            // TESTING
            console.log(`api/refresh.js - Error: `, err);
            
            return res.status(500).json({
                error: 'Exception when processing refresh request'
            });
        }
    } else {

        // Fail
        // Error. Not a POST request.

        res.setHeader('Allow', ['GET']);
        return res.status(405).json(
            { error: `Method ${req.method} not allowed` }
        )
    }
};
