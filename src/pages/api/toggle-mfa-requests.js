import cookie from 'cookie';
import {API_URL, API_VERSION_ACCEPT_HEADER, ACCESS_COOKIE_NAME} from '@/constants/constants';
import logger from '@/logger/logger';

const ToggleMFAReqToken = async (req, res) => {

    if (req.method === 'POST') {


        // Parse our cookies. 
        // No cookies in browser, req.headers.cookie will return undefined. If it's undefined use an empty string ''.
        // If we parse '' we get {} and empty object
        // So we will either get a user object or an empty object.
        const cookies = cookie.parse(req.headers.cookie ?? '');
        let token = false;
        let username = '';

        if(cookies !== '' && cookies !== undefined){
            const accessDecoded = decodeURI(cookies[ACCESS_COOKIE_NAME]).trim();              // The cookie value is in base64 url format. Converts into a srting.
            const accessData = await JSON.parse(accessDecoded);                    // Convert the string into JSON.
            token = accessData.accessToken ?? false;
            username = accessData.username ?? false;
        }

        if (token === false) {
            // Fail. No cookie.
            logger.error('api/toggle-mfa-requests - No Access Cookie - 401 Error ');

            return res.status(401).json({
                error: 'Unauthorized, no access cookie for MFA request'
            });
        }

        // Get the values from the body of the POST request.
        const {
            MfaSwitch
        } = req.body;

        const body = JSON.stringify({
            username,
            MfaSwitch
        });


        try {

            // POST Request for password reset email
            const apiRes = await fetch(`${API_URL}/User/ToggleMFA`, {
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
                    data: data.data,
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

            logger.error('api/toggle-mfa-requests - Is API running and accessible? - 500 Error ' + err);

            return res.status(500).json({
                message: 'Something went wrong when toggling MFA', 
                err: err
            });

            
        }
    } else {
        // Fail
        // Error. Not a POST request. They tried GET or PUT etc.
        logger.info(`api/toggle-mfa-requests - Method: ${req.method} . Wrong Request Type. It should be a POST request!`);

        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ 'error': `Method ${req.method} not allowed`});
    }
};

export default ToggleMFAReqToken;