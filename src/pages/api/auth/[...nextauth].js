import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import moment from 'moment';
import {API_URL, API_VERSION_ACCEPT_HEADER} from '@/constants/constants';
import logger from '@/logger/logger';


async function refreshAccessToken(tokenObject) {
    try {

        const tokenData = {
            refreshToken: tokenObject.refreshToken,
            userName: tokenObject.username
        }

        const data = JSON.stringify(tokenData)

        const options = {
            method: 'POST',
            headers: {
                'Accept': `application/json; ${API_VERSION_ACCEPT_HEADER}`,
                'Content-Type': 'application/json',
            },
            body: data,
          }

        // Get new tokens
        const tokenResponse = await fetch(`${API_URL}/User/Refresh`, options);

        const response = await tokenResponse.json()

        if (tokenResponse.status === 200) {
            // Success 200 OK
            return {
                    ...tokenObject,
                    accessToken: response.data?.accessToken,
                    accessTokenExpiry: response.data?.accessTokenExpiry,
                    refreshToken: response.data?.refreshToken,
                    refreshTokenExpiry: response.data?.refreshTokenExpiry
                }
        } else {
            // Fail. Return the API error message.
            logger.info(`[...nextauth].js - refreshAccessToken - Error in API tokenResponse. Status: ${tokenResponse.status}`);
            return {
                ...tokenObject,
                error: "RefreshAccessTokenError",
            }
        }


    } catch (error) {
        logger.info(`[...nextauth].js - refreshAccessToken - Error in refreshAccessToken `, error);
        return {
            ...tokenObject,
            error: "RefreshAccessTokenError",
        }
    }

}

const providers = [
    
	// Add Your Providers Here
	CredentialsProvider({
		// Next-Auth can create its own login form

		// The name to display on the sign in form (e.g. "Sign in with...")
		name: "Credentials",
		// The form fields
		// We will use our own login form but the variable names here are important. They MUST match your API's UserLoginDto.
		credentials: {
			UserName: { label: "Username", type: "text", placeholder: "jsmith" },
			Password: { label: "Password", type: "password" }
		},
		async authorize(credentials, req) {
			
			// Make sure the formatting and order of these variables matches your API's UserLoginDto
			// Uppcase characters must be the same, order must be the same.
			const {UserName, Password} = credentials;

			const body = JSON.stringify({
				UserName,
				Password
			});

			// Login request to our API.
			const res = await fetch(`${API_URL}/User/Login`, {
				method: 'POST',
				headers: {
					'Accept': `application/json; ${API_VERSION_ACCEPT_HEADER}`,
					'Content-Type': 'application/json; charset=utf-8',
				},
				body: body,
			}).catch((error) => {
                logger.info(`[...nextauth].js - CredentialsProvider - Error in API POST request `, error);

                const fetchError = {
                    success: false,
                    message: "Sorry, something is wrong with our servers...",
                }

                return fetchError;
              });

              let data = "";
              if(res.ok){

                // Success 200 OK
                data = await res.json();

              } else if (res.status === 400 || res.status === 401 || res.status === 500){

                // If we get a 400 BadRequest or 401 Unauthorised or 500 ServerError response we still want to map the error message.
                logger.info(`[...nextauth].js - CredentialsProvider - User Login Fail - API Call status: ${res.status} UserName: ${UserName}`);

                data = await res.json();

              }
              else {
                // Incase there's an exception in the fetch
                data = res;     // The fetchError is not json.
              }

			const user = {
				success: data.success,
                message: data.message,
                id: data.data?.id,
				email: data.data?.email,						// Error response is a null data object. So use data?
				username: data.data?.username,
                accessToken: data.data?.accessToken,
                accessTokenExpiry: data.data?.accessTokenExpiry,
                refreshToken: data.data?.refreshToken,
                refreshTokenExpiry: data.data?.refreshTokenExpiry,
                roles: data.data?.roles,
                error: "none"
			}


			// Our API's response contains
			/*
				{
				"data": {
					"accessToken": "string",
					"refreshToken": "string",
					"email": "user@example.com",
					"username": "string",
					"roles": [
					"string"
					]
				},
				"success": true,
				"message": "string"
				}
			*/
			// If it is unsucessful this is the response
			// So the data objet MAY be null.
			/*
				{
					"data": null,
					"success": false,
					"message": "User Doesn't Exist or Password is wrong."
				}
			*/
			
			// Pass the user data object to the app.
			// Check for 200 OK and the user exists. 
			// We have to return th euse robject wither 200OK ro not as it contains the error message.
			if(res.ok && user){
				// Success
				// Any object returned will be saved in `user` property of the JWT
				return user;
			} else {
				// Fail
				// If you return null or false then the credentials will be rejected
				// SignIn() callback won't be run.
				// return null means 401 unauthorized error
				// Return user as it contains our login error message.
				logger.info('[...nextauth].js - res failed! - user is - ', user);
				return user;
			}

		},
		}),
		// Add Any other providers like Facebook, Google etc
		// https://next-auth.js.org/providers/
]

const callbacks = {
    async signIn({ user }) {
        if (user.success){
            return true;
        } else {
            //return false;
            // Use query string to pass the error to the unauthorized page...
            logger.info('[...nextauth].js - signIn Failed - user is - ', user);

            let url =`/members/login?error=${user.message}`;
            return url;
        }
      },
    async jwt ({ token, user }) {

         if (user) {
            // This will only be executed at login. Each next invocation will skip this part.

            token.accessToken = user.accessToken;
            token.accessTokenExpiry = user.accessTokenExpiry;
            token.refreshToken = user.refreshToken;
            token.refreshTokenExpiry = user.refreshTokenExpiry;
            token.username = user.username;
            token.user = user;
            token.roles = user.roles;
            token.signMeOut = false;
        }


        let utcDateNow = new Date().toISOString();
        // Refresh access token early.
        const earlyTokenExpiry = moment(token.accessTokenExpiry).subtract(2, 'minutes').toISOString();            // Moment is used to manipulate time easily.
        
        // If the token is still valid, just return it.
        if (earlyTokenExpiry > utcDateNow) {

            return token;
        }

        // TESTING
        //logger.info(`[...nextauth].js - jwt callback - : earlyTokenExpiry > utcDateNow ${isGreater}`);
        //logger.info(`[...nextauth].js - jwt callback - access token has expired. Refreshing token!`);

        // If the access token has expired, refresh it.
        token = await refreshAccessToken(token);

        if(token?.error === "RefreshAccessTokenError"){
            logger.info(`[...nextauth].js - jwt callback - Refresh token has expired, signing out`);

            // SignOut() can only be used client-side. So pass back a flag to trigger it in MembersLayout.js useEffect hook.
            token.signMeOut = true;
        }

        return token;
    },
    async session ({ session, token }) {
        // Here we pass accessToken to the client to be used in authentication with your API
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.accessTokenExpiry = token.accessTokenExpiry;
        session.refreshToken = token.refreshToken;
        session.refreshTokenExpiry = token.refreshTokenExpiry;
        session.error = token.error;
        session.signMeOut = token.signMeOut;

        return session;
    },
}

export const options = {
    providers,
    callbacks,

	// Next Auth uses it's own signIn() and signOut() functions
	// The Navbar uses them for the Signin and Signout Links
	// Next Auth sends these functions to its own login forms. We want custom forms.
    // This is the path they take to our custom login form.
    // https://next-auth.js.org/configuration/pages
    pages: { 
        signIn: '/members/login',
        signOut: 'members/signout',
        error: '/members/auth-error'            // Custom Next Auth Error Page
    },
}


// Use Next Auth with the above parameters
const Auth = (req, res) => NextAuth(req, res, options)
export default Auth;