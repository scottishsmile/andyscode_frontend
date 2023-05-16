import {API_URL, API_VERSION_ACCEPT_HEADER} from '@/constants/constants';
import logger from '@/logger/logger';

const ResetPassReqToken = async (req, res) => {
    // The default api route caters for GET requests.
    // You need additional logic for POSTs
    // So we need to make sure the incoming request is a POST request.

    if (req.method === 'POST') {

        // Token
        // Use NextJS Dynamic Routes to pass in a token as a query param
        // https://nextjs.org/docs/api-routes/dynamic-api-routes
        const { token } = req.query;


        // Get the values from the body of the POST request.
        const {
            UserName,
            NewPassword
        } = req.body;

        const body = JSON.stringify({
            UserName,
            NewPassword
        });


        try {

            // POST Request for password reset email
            const apiRes = await fetch(`${API_URL}/User/ResetPass`, {
                method: 'POST',
                headers: {
                    'Accept': `application/json; ${API_VERSION_ACCEPT_HEADER}`,
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${token}`                          // Access Token
                },
                body: body,
            });


            const data = await apiRes.json();

            if (apiRes.status === 200) {
                // Success 200 OK
                return res.status(200).json({ 
                    success: data.success,              
                    message: data.message               // Return API Message
                 });
            } else {
                // Fail. Return the API error message.
                return res.status(apiRes.status).json({
                    error: data.error,                  // Return API Error
                    success: data.success, 
                    message: data.message               // Return API Message
                });
            }
        } catch(err) {

            // Fail

            logger.error('api/resetpass-requests/[token].js - Is API running and accessible? - 500 Error ' + err);

            return res.status(500).json({
                message: 'Something went wrong when changing password', 
                err: err
            });

            
        }
    } else {
        // Fail
        // Error. Not a POST request. They tried GET or PUT etc.
        logger.info(`api/resetpass-requests/[token].js - Method: ${req.method} . Wrong Request Type. It should be a POST request!`);

        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ 'error': `Method ${req.method} not allowed`});
    }
};

export default ResetPassReqToken;