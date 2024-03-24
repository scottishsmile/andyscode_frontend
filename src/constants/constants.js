
// PUBLIC general React-Style constant variables.
export const COMPANY_NAME = process.env.COMPANY_NAME;
export const ADMIN_EMAIL = `admin@mywebsite.com`;
export const TERMS_PRIVACY_EMAIL = `privacy@mywebsite.com`;
export const BLOG_POSTS_PER_PAGE = 6;
export const ACCESS_COOKIE_NAME = 'andyscode_access';
export const REFRESH_COOKIE_NAME = 'andyscode_refresh';
export const ACCESS_COOKIE_MAX_AGE = 60 * 60;                   // Must match token settings in backend. Cookie library uses seconds!
export const REFRESH_COOKIE_MAX_AGE = 60 * 10080;               // Must match token settings in backend. Cookie library uses seconds!


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

