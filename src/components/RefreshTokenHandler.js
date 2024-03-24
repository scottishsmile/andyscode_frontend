import { useSession } from "next-auth/react";
import { useEffect } from "react";
import {ACCESS_TOKEN_REFRESH_TIME_MILISECS} from "@/constants/constants"

/*
In _app.js the Next-Auth <SessionProvider> tracks the time until the token expires, so the live session can be refreshed or logged out.

In _app.js we wrap our app with <SessionProvider>. We then set the refetch interval to the specific value in seconds. 
The issue here is that if you set a constant value, every time the user refreshes the page, the counter restarts. 
So if we set a refetch interval to 23 hours 30 minutes, the user leaves the page, and comes back after 12 hours, the counter starts again. 
As a result, between Date.now() + 12 hours and Date.now() + 23 hours 30 minutes, we’ve got invalid token.

RefreshTokenHandler component allows us access to the useSession hook, from which we can get the access token expiry time. 
Then, we calculate the remaining time till the expiration, minus an x amount of minute margin. 
Now every time user refreshes the page, the interval will be set to a correct time remaining.

*/

const RefreshTokenHandler = ({ setRefreshInterval }) => {
    const { data: session } = useSession();

    useEffect(() => {
        // Double !! converts the object into a boolean true or false.
        if(!!session) {
            // Keep track of the time remaining until we need to refresh the access token
            // This is called by _app.js  <RefreshTokenHandler setRefreshInterval={setRefreshInterval} />

            //let utcDateNow = new Date().toISOString();
            let utcDateNow = new Date();
            let accessTokenDate = new Date(session.accessTokenExpiry)
            let timeRemainingMiliSecs = accessTokenDate - utcDateNow;

            // Time remaining in miliseconds - CONSTANT_IN_MILISECONDS . This way we will refresh x mins early. Before the token expires.
            // 86400000 is 24 hrs in miliseconds
            // 3600000 is 1hr in miliseconds
            let timeRemainingMinutes = Math.round((((timeRemainingMiliSecs - ACCESS_TOKEN_REFRESH_TIME_MILISECS) % 86400000) % 3600000) / 60000)

            // TESTING
            //console.log(`RefreshTokenHander.js - time remaining in minutes is ${timeRemainingMinutes} `);

            // If time remaning is greater than 0 ? True - set the value to the remaining time, else if it is False then set the value to 0.
            setRefreshInterval(timeRemainingMinutes > 0 ? timeRemainingMinutes : 0);
            
        }
    }, [session, setRefreshInterval]);      // Only rerun useEffect if the session object changes

    return null;
}

export default RefreshTokenHandler;