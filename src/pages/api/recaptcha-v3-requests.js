import {GOOGLE_RECAPTCHA_URL, GOOGLE_RECAPTCHA_SECRET_KEY_V3} from '@/constants/constants';
import logger from '@/logger/logger';

const RecaptchaV3Req =  async (req, res) => {

    if (req.method === 'POST') {

        const {
            secret,
            response,
            remoteip
        } = req.body;

        const body = JSON.stringify({
            secret,
            response,
            remoteip
        });

        try {

            // POST Request to register a new user, create a new account.
            const apiRes = await fetch(`${GOOGLE_RECAPTCHA_URL}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: body,
            });


            const data = await apiRes.json();


            if (apiRes.status === 200) {

                // Success 200 OK
                return res.status(200).json({ 
                    "success": data.success,
                    "score": data.score,
                    "action": data.action,                  
                    "challenge_ts": data.challenge_ts,
                    "hostname": data.hostname,
                    "error-codes": data.error-codes
                 });

            } else {
                // Fail. Return the API error message.

                logger.warn(`api/recaptcha-v3-requests.js - API request failed. Status: ${apiRes.status} Error: `, data.error_codes);

                return res.status(apiRes.status).json({
                    "success": data.success,  
                    "score": data.score,
                    "action": data.action,            
                    "challenge_ts": data.challenge_ts,
                    "hostname": data.hostname,
                    "error-codes": data.error-codes
                });
            }
        } catch(err) {
            // Fail

            logger.error('api/recaptcha-v3-requests.js - Is Google reCaptcha accessible? - 500 Error ' + err);

            return res.status(500).json({
                message: 'Something went wrong when logging in', 
                err: err
            });

            
        }
    } else {
        // Fail
        // Error. Not a POST request. They tried GET or PUT etc.

        logger.info(`api/recaptcha-v3-requests.js - Method: ${req.method} . Wrong Request Type. It should be a POST request!`);

        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ 'error': `Method ${req.method} not allowed`});
    }
};

export default RecaptchaV3Req;