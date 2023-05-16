
// PUBLIC general React-Style constant variables.
export const COMPANY_NAME = `MyWebsite.com`;
export const ADMIN_EMAIL = `admin@mywebsite.com`;
export const TERMS_PRIVACY_EMAIL = `privacy@mywebsite.com`;
export const BLOG_POSTS_PER_PAGE = 6;


// PUBLIC info available in frontend. Environment Variables.
// Environment variable must start with NEXT_PUBLIC_ to work.
// Do NOT put sensitive info here like Tokens or backend API Urls!
export const HOMEPAGE_URL = process.env.NEXT_PUBLIC_HOMEPAGE_URL
export const PAYMENT_RETURN_URL = process.env.NEXT_PUBLIC_PAYMENT_RETURN_URL
export const GOOGLE_RECAPTCHA_SITE_KEY_V2 = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY_V2
export const GOOGLE_RECAPTCHA_SITE_KEY_V3 = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY_V3


// SECRET info kept on the server side. Environment Variables.
// Keep sensitive info in the backend environment file.
export const API_URL = process.env.API_URL
export const API_VERSION_ACCEPT_HEADER = process.env.API_VERSION_ACCEPT_HEADER
export const CORS_URLS = process.env.CORS_URLS
export const GOOGLE_RECAPTCHA_SECRET_KEY_V3 = process.env.GOOGLE_RECAPTCHA_SECRET_KEY_V3
export const GOOGLE_RECAPTCHA_SECRET_KEY_V2 = process.env.GOOGLE_RECAPTCHA_SECRET_KEY_V2
export const GOOGLE_RECAPTCHA_URL = process.env.GOOGLE_RECAPTCHA_URL


// How long before the access token's expiry date do we refresh it? 10 min before it expires?
// In milisecs. 600000  is 10min, 120000 Ms is 2 mins.
// Everytime we refresh the access token we get a NEW refresh token.
// Default is access token is 1 hr, refresh token is 1 week.
// The user MUST be on the website and CHANGE PAGES for this process to get run.
// So user MUST changes pages sometime after 50 min of reciving the 1 hr access token WHILE the 1 week refresh token is valid.
// Refreshing the access token gets you a new refresh token and another week.
// Used by /components/RefreshTokenHandler.js
export const ACCESS_TOKEN_REFRESH_TIME_MILISECS = 600000;