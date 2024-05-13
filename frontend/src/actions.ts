"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { addServerMessage } from "./utils/serverMessageUtils";
import { count } from "console";


const decodeJwt = (token: string) => {
    const tokenArray = token.split('.');
    const payload = JSON.parse(atob(tokenArray[1]));
    return payload;
};

export const refreshAccessToken = async (token: string) => {
    const payload = decodeJwt(token);
    const expDate = new Date(payload.exp * 1000);
    const now = new Date();
    if (expDate > now) {
        const url = `${process.env.BACKEND_URL}/api-auth/token/refresh/`;
        const data = {
            'refresh': token,
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        const res = await fetch(url, { cache: 'no-store', method: "POST", credentials: 'include', headers: headers, body: JSON.stringify(data) });
        if (res.ok) {
            const json = await res.json();
            return json.access;
        } else {
            addServerMessage({ message: "Your session has expired. Please sign in again.", type: 'error' });
            logout();
            return null;
        }
    } else {
        addServerMessage({ message: "Your session has expired. Please sign in again.", type: 'error' });
        logout();
    }
};

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isAuthenticated) {
        session.isAuthenticated = defaultSession.isAuthenticated;
    }
    if (session.accessToken && session.refreshToken) {
        const tokenArray = session.accessToken.split('.');
        const payload = JSON.parse(atob(tokenArray[1]));
        const expDate = new Date(payload.exp * 1000);
        const now = new Date();
        if (expDate.valueOf() < (now.valueOf() - 30000)) {
            const accessToken = await refreshAccessToken(session.refreshToken);
            session.accessToken = accessToken;
            return session;
        } else {
            return session;
        }
    } else {
        return session;
    }
};

export const getClientSession = async () => {
    const session = await getSession();
    const returnSession = {
        userId: session.userId,
        userName: session.userName,
        isAuthenticated: session.isAuthenticated,
    };
    return returnSession;
};

export const login = async (prevState: any, formData: FormData) => {
    const session = await getSession();
    const username = formData.get("username") as string;
    const password1 = formData.get("password1") as string;
    const url = `${process.env.BACKEND_URL}/api-auth/login/`;
    const data = {
        'username': username,
        'password': password1,
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(url, { cache: 'no-store', method: "POST", credentials: 'include', headers: headers, body: JSON.stringify(data) });
    if (res.ok) {
        const json = await res.json();
        session.accessToken = json.access;
        session.refreshToken = json.refresh;
        session.isAuthenticated = true;
        session.userId = json.user.pk;
        session.userName = json.user.username;

        await session.save().then(() => {
            addServerMessage({ message: "You are now signed in.", type: 'success' });
            redirect("/");
        });

    } else {
        const errors = await res.json();
        return { errors: errors };
    }
};
export const logout = async () => {
    const session = await getSession();
    session.destroy();
    addServerMessage({ message: "You are now signed out.", type: 'success' });
    redirect("/");
};

const getCredentialedHeaders = (session: SessionData) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
        'include': 'credentials',
    };
};

export const getUserProfile = async (session: SessionData) => {
    const url = `${process.env.BACKEND_URL}/user/profile/${session.userId}/`;
    const headers = getCredentialedHeaders(session);
    const response = await fetch(url, { headers: headers, cache: 'no-store' });
    if (!response.ok) {
        console.log('Profile Error: Response Headers: ', response.headers);
    }
    const data = await response.json();
    return data;
};

export const getCountdown = async (countdownId: string) => {
    const session = await getSession();
    const url = `${process.env.BACKEND_URL}/counts/countdown/${countdownId}/`;
    const headers = getCredentialedHeaders(session);
    const response = await fetch(url, { headers: headers, cache: 'no-store' });
    if (!response.ok) {
        console.log('Countdown Error: ', response);
    }
    const data = await response.json();
    return data;
};

export const getCountdownList = async (sharedWith = false, countList = []) => {
    const session = await getSession();
    let url = `${process.env.BACKEND_URL}/counts/list/`;
    if (countList.length > 0) {
        url = `${url}?countList=${countList}`;
    } else if (sharedWith) {
        url = `${url}?sharedWith=true`;
    }
    const headers = getCredentialedHeaders(session);
    const response = await fetch(url, { headers: headers, cache: 'no-store' });
    if (!response.ok) {
        console.log('Countdown Error: ', response);
    } else {
        const data = await response.json();
        return data;
    }
};

export const createCountdown = async (prevState: any, formData: FormData) => {
    const session = await getSession();
    session.save();
    const url = `${process.env.BACKEND_URL}/counts/create/`;
    const headers = getCredentialedHeaders(session);
    const response = await fetch(url, { method: "POST", headers: headers, body: formData });
    if (!response.ok) {
        const errors = await response.json();
        return { errors: errors };
    } else {
        const data = await response.json();
        return data;
    }
};