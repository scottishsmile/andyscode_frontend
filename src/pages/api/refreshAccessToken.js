import { API_URL, API_VERSION_ACCEPT_HEADER } from '@/constants/constants';

const RefreshAccessToken = async (refreshToken, userName) => {
    try {

        const tokenData = {
            refreshToken,
            userName
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
            
            return response;

        } else {
            // Fail. Return the API error message.
            console.log(`refreshAccessToken.js - Error in API tokenResponse. Status: ${tokenResponse.status}`);
            return false;
        }

    } catch (error) {
        console.log(`refreshAccessToken.js - Error in refreshAccessToken `, error);
        return false;
    }
}

export default RefreshAccessToken;