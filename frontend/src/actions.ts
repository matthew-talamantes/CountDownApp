"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { addServerMessage } from "./utils/serverMessageUtils";


export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isAuthenticated) {
        session.isAuthenticated = defaultSession.isAuthenticated;
    }
    return session;
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
            // MARK: Todo
            // Todo: Add success message and redirect
            addServerMessage({ message: "You are now signed in.", type: 'success' });
            redirect("/");
        });
        // Todo: Add success message

    } else {
        const errors = await res.json();
        return { errors: errors };
    }
};
export const logout = async () => {
    const session = await getSession();
    session.destroy();
    // MARK: Todo
    // Todo: Add success message
    addServerMessage({ message: "You are now signed out.", type: 'success' });
    redirect("/");
};

export const refreshToken = async () => {
    const session = await getSession();
    const url = `${process.env.BACKEND_URL}/rest-auth/token/refresh/`;
    const data = {
        'refresh': session.refreshToken,
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    const res = await fetch(url, { cache: 'no-store', method: "POST", credentials: 'include', headers: headers, body: JSON.stringify(data) });
    if (res.ok) {
        const json = await res.json();
        session.accessToken = json.access;
        await session.save();
    } else {
        session.destroy();
        // MARK: Todo
        // Todo: Add error message and redirect to signin
    }
};