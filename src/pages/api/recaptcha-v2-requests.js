import {GOOGLE_RECAPTCHA_URL, GOOGLE_RECAPTCHA_SECRET_KEY_V2} from '@/constants/constants';
import logger from '@/logger/logger';

const RecaptchaV2Req = async (req, res) => {

    // Google API seems to use the HTTP OPTIONS method and not a POST
    if (req.method === 'OPTIONS' || req.method === 'POST') {

        const {
            response,
            remoteip
        } = req.body;

        try {

            // POST Request to register a new user, create a new account.
            const apiRes = await fetch(`${GOOGLE_RECAPTCHA_URL}?secret=${GOOGLE_RECAPTCHA_SECRET_KEY_V2}&response=${response}&remoteip=${remoteip}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                }
            });


            const data = await apiRes.json();


            if (apiRes.status === 200) {

                // Success 200 OK
                return res.status(200).json({ 
                    "success": data.success,              
                    "challenge_ts": data.challenge_ts,
                    "hostname": data.hostname,
                    "error-codes": data.error_codes
                 });

            } else {

                // Fail.

                logger.warn(`api/recaptcha-v2-requests.js - API request failed. Status: ${apiRes.status} Error: `, data.error_codes);

                return res.status(apiRes.status).json({
                    "success": data.success,              
                    "challenge_ts": data.challenge_ts,
                    "hostname": data.hostname,
                    "error-codes": data.error_codes
                });
            }
        } catch(err) {

            // Fail

            logger.error('api/recaptcha-v2-requests.js - Is Google reCaptcha accessible? - 500 Error ' + err);

            return res.status(500).json({
                message: 'Something went wrong when talking to google reCaptcha API', 
                err: err
            });

            
        }
    } else {
        // Fail
        // Error. Not a POST request. They tried GET or PUT etc.

        logger.info(`api/recaptcha-v2-requests.js - Method: ${req.method} . Wrong Request Type. It should be an OPTIONS or POST request!`);

        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ 'error': `Method ${req.method} not allowed`});
    }
};

export default RecaptchaV2Req;