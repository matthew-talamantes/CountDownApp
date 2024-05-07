import { SessionOptions } from "iron-session";

export interface SessionData {
    userId?: string;
    userName?: string;
    accessToken?: string;
    refreshToken?: string;
    isAuthenticated: boolean;
};

export const defaultSession: SessionData = {
    isAuthenticated: false,
};

const refreshLifetime = (60 * 60 * 24 * 29) + (60 * 60 * 23);

export const sessionOptions: SessionOptions = {
    password: process.env.IRON_SESSION_PASSWORD!,
    cookieName: "countdown-session",
    ttl: refreshLifetime,
    cookieOptions: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'development' ? false : true,
        maxAge: refreshLifetime - 60,
        path: '/',
    },
};