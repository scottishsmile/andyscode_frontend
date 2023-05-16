import {HOMEPAGE_URL} from '@/constants/constants';

const GoogleReCaptchaV2 = async (token) => {


    const data = {
        response: token,                                // The user response token provided by the reCAPTCHA client-side integration on your site.
        remoteip: null                                  // User's IP address
    }

    const JSONdata = JSON.stringify(data)

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSONdata,
    }

    // Send data to Google's API
    const response = await fetch(`${HOMEPAGE_URL}/api/recaptcha-v2-requests`, options)


    const result = await response.json()

    /*
        {
            "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
            "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
            "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
            "error-codes": [...]        // optional
        }
        
        Error codes :

            missing-input-secret		The secret parameter is missing.
            invalid-input-secret		The secret parameter is invalid or malformed.
            missing-input-response		The response parameter is missing.
            invalid-input-response		The response parameter is invalid or malformed.
            bad-request					The request is invalid or malformed.
            timeout-or-duplicate		The response is no longer valid: either is too old or has been used previously.
    */

    if (result.success === true){

        return true;

    }
    else {
        // Error or Bot Detected! Block Access!
        return false;
    }
    
}

export default GoogleReCaptchaV2;