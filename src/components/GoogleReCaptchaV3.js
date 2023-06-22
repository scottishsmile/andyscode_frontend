

const GoogleReCaptchaV3 = async (token) => {


    const data = {
        response: token,                                // The user response token provided by the reCAPTCHA client-side integration on your site.
        remoteip: null                                  // User's IP address
    }

    const JSONdata = JSON.stringify(data)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSONdata,
    }

    // Send data to Google's API
    // Leave the url like this to avoid CORS errors. No ${HOMEPAGE_URL}
    const response = await fetch(`/api/recaptcha-v2-requests`, options)


    const result = await response.json()

    /*
        {
            "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
            "score": number             // the score for this request (0.0 - 1.0)
            "action": string            // the action name for this request (important to verify)
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

        /*
            The score 1.0 indicates that the interaction poses low risk and is very likely legitimate, whereas 0.0 indicates that the interaction poses high risk 
            and might be fraudulent. Out of the 11 levels, only the following four score levels are available by default: 0.1, 0.3, 0.7 and 0.9.
        */

        if(result.score > 0.6){
            return true;
        }
        else {
            return false;
        }
    }
    else {
        // Error or Bot Detected! Block Access!

        return false;
    }
    
}

export default GoogleReCaptchaV3;