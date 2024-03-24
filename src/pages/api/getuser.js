import cookie from 'cookie';
import { API_URL, API_VERSION_ACCEPT_HEADER, ACCESS_COOKIE_NAME } from '@/constants/constants';

export default async (req, res) => {
    // Only GET requests accepted
    if (req.method === 'GET') {

        // Parse our cookies. 
        // No cookies in browser, req.headers.cookie will return undefined. If it's undefined use an empty string ''.
        // If we parse '' we get {} and empty object
        // So we will either get a user object or an empty object.
        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = false;
        let username = '';

        if(cookies !== '' && cookies !== undefined){
            const accessDecoded = decodeURI(cookies[ACCESS_COOKIE_NAME]).trim();              // The cookie value is in base64 url format. Converts into a srting.
            const refreshData = await JSON.parse(accessDecoded);                    // Convert the string into JSON.
            access = refreshData.accessToken ?? false;
            username = refreshData.username ?? false;
        }

        // Our API returns the user object at login so we can populate it in global state.
        //const user = useSelector(state => state.auth.user);

        if (access === false) {
            // Fail.
            // No cookie. Logged out.

            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });
        }

        try {
            const apiRes = await fetch(`${API_URL}/User/GetUser/${username}`, {
                method: 'GET',
                headers: {
                    'Accept': `application/json; ${API_VERSION_ACCEPT_HEADER}`,
                    'Authorization': `Bearer ${access}`                 // Access Token
                }
            });
            const data = await apiRes.json();

            if (apiRes.status === 200) {

                return res.status(200).json({
                    user: data
                });
            } else {
                // Fail. Return the API error message.

                return res.status(apiRes.status).json({
                    error: data.error
                });
            }
        } catch(err) {
            // Fail
            // Error. Something went wrong talking to the API.
            // Maybe API server is down?

            return res.status(500).json({
                error: 'Something went wrong when retrieving user'
            });
        }
    } else {
        // Fail
        // Error. Not a GET request. They tried POST or PUT etc.

        res.setHeader('Allow', ['GET']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
};
