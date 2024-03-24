import {API_URL, API_VERSION_ACCEPT_HEADER} from '@/constants/constants';
import logger from '@/logger/logger';

const RegisterReq = async (req, res) => {
    // The default api route caters for GET requests.
    // You need additional logic for POSTs
    // So we need to make sure the incoming request is a POST request.

    if (req.method === 'POST') {

        // Get the values from the body of the POST request.
        const {
            Email,
            UserName,
            Password,
            Newsletter
        } = req.body;

        const body = JSON.stringify({
            Email,
            UserName,
            Password,
            Newsletter
        });

        try {

            // POST Request to register a new user, create a new account.
            const apiRes = await fetch(`${API_URL}/User/Register`, {
                method: 'POST',
                headers: {
                    'Accept': `application/json; ${API_VERSION_ACCEPT_HEADER}`,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: body,
            });


            const data = await apiRes.json();

            if (apiRes.status === 200) {
                // Success 200 OK
                return res.status(200).json({ success: data.success });
                
            } else {
                // Fail. Return the API error message.

                logger.warn(`api/register-requests.js - Registration failed. API request failed. Status: ${apiRes.status} Error: ${data.error} Message: ${data.message} Email: ${Email} UserName: ${UserName}`);

                return res.status(apiRes.status).json({
                    error: data.error,                  // Return API Error
                    success: data.success, 
                    message: data.message               // Return API Message
                });

            }
        } catch(err) {
            // Fail
           
            logger.error('api/register-requests.js - Is API running and accessible? - 500 Error ' + err);

            return res.status(500).json({
                message: 'Something went wrong when registering for an account', 
                err: err
            });

            
        }
    } else {
        // Fail
        // Error. Not a POST request. They tried GET or PUT etc.

        logger.info(`api/register-requests.js - Method: ${req.method} . Wrong Request Type. It should be a POST request!`);

        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ 'error': `Method ${req.method} not allowed`});
    }
};

export default RegisterReq;