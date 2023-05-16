import {API_URL, API_VERSION_ACCEPT_HEADER} from '@/constants/constants';
import logger from '@/logger/logger';

const UniqueUsernameReq = async (req, res) => {

    if (req.method === 'POST') {

        const {
            UserName
        } = req.body;

        const body = JSON.stringify({
            UserName
        });

        try {
            const apiRes = await fetch(`${API_URL}/User/UniqueUsernameCheck`, {
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

                logger.error(`api/unique-username-requests.js - Failed checking if username was unique. API request failed. Status: ${apiRes.status} Error: ${data.error} Message: ${data.message}`);

                return res.status(apiRes.status).json({
                    error: data.error,                  // Return API Error
                    success: data.success, 
                    message: data.message               // Return API Message
                });
            }
        } catch(err) {

            // Fail
            
            logger.warn('api/unique-username-requests.js - Is API running and accessible? - 500 Error ' + err);

            return res.status(500).json({
                message: 'Something went wrong when checking if username was unique', 
                err: err
            });

            
        }
    } else {
        // Fail
        // Error. Not a POST request. They tried GET or PUT etc.

        logger.info(`api/unique-username-requests.js - Method: ${req.method} . Wrong Request Type. It should be a POST request!`);

        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ 'error': `Method ${req.method} not allowed`});
    }
};

export default UniqueUsernameReq;