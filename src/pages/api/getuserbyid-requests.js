import { getSession } from 'next-auth/react'
import {API_URL, API_VERSION_ACCEPT_HEADER} from '@/constants/constants';
import logger from '@/logger/logger';

const GetUserByIdReq = async (req, res) => {
    // The default api route caters for GET requests.
    // You need additional logic for POSTs
    // So we need to make sure the incoming request is a POST request.

    if (req.method === 'GET') {

        // Grab query string parameters.
        const { token, id } = req.query;

        const session = await getSession({ req })

        try {

            // GET the user info
            const getUser = await fetch(`${API_URL}/User/GetUserById/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': `application/json; ${API_VERSION_ACCEPT_HEADER}`,
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${token}`                          // Access Token
                }
            });


            const data = await getUser.json();

            if (getUser.status === 200) {
                // Success 200 OK

                // Update Next Auth Session User Values
                // Update session with user info
                // This probably won't work. The user will have to sign out then back in again to refresh the session!
                // Send the user to a "success page" and have a timedelay of 3 seconds to tell them they are being logged out. Then run signOut().
                // updateself-success.js is an example.
                if(session){
                    session.user.id = data?.id;
                    session.user.email = data?.email;
                    session.user.username = data?.userName;
                }

                return res.status(200).json({ 
                    success: data.success,              
                    message: data.message,              // Return API Message
                    // Updating the session here so no need to return user data.
                 });

            } else {

                // Fail. Return the API error message.

                logger.warn(`api/getuserbyid-requests.js - API request failed. Status: ${getUser.status} Error: ${data.error} Message: ${data.message}`);

                return res.status(getUser.status).json({
                    error: data.error,                  // Return API Error
                    success: data.success, 
                    message: data.message               // Return API Message
                });
            }
        } catch(err) {

            // Fail

            logger.error('api/getuserbyid-requests.js - Is API running and accessible? - 500 Error ' + err);

            return res.status(500).json({
                message: 'Something went wrong when logging in', 
                err: err
            });

            
        }
    } else {
        // Fail
        // Error. Not a GET request.

        logger.info(`api/getuserbyid-requests.js - Method: ${req.method} . Wrong Request Type. It should be a GET request!`);

        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ 'error': `Method ${req.method} not allowed`});
    }
};

export default GetUserByIdReq;