import cookie from 'cookie';            // npm install cookie
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from '@/constants/constants';

export default async (req, res) => {
    if (req.method === 'POST') {

        res.setHeader('Set-Cookie', [
            cookie.serialize(
                `${ACCESS_COOKIE_NAME}`, '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    expires: new Date(0),                               // Date(0) is 1970, so the access token will definently be set as expired. Logout makes tokens expired.
                    sameSite: 'lax',
                    path: '/'
                }
            ),
            cookie.serialize(
                `${REFRESH_COOKIE_NAME}`, '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    expires: new Date(0),
                    sameSite: 'lax',
                    path: '/'
                }
            )
        ]);

        return res.status(200).json({
            success: 'Successfully logged out'
        });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({
            error: `Method ${req.method} now allowed`
        });
    }
};