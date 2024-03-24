export { default } from "next-auth/middleware";

// https://next-auth.js.org/configuration/nextjs#middleware
// The routes listed in matcher: are protected and you need to be authenticated to use them.
// Next Auth will redirect unauthenticated users to sign-in page by default.

export const config = { matcher: [
    "/members/contact", 
    "/members/dashboard", 
    "/members/payment", 
    "/members/profile", 
    "/members/premium", 
    "/members/resetpass",
    "/members/updateself",
    "/members/support", 
    "/members/notifications"
] };
