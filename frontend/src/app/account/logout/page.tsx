"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getClientSession, logout } from "@/actions";

export default function Logout() {
    const router = useRouter();

    React.useEffect(() => {
        const checkSession = async () => {
            const session = await getClientSession();
            if (!session.isAuthenticated) {
                router.push("/");
            }
        };
        checkSession();
    }, []);

    return (
        <section className="w-full max-w-sm mx-auto px-0">
            <article className="w-full flex flex-col justify-start items-start gap-3">
                <h1 className="text-5xl font-semibold">Logout</h1>
                <form className="w-full" id="logoutForm" action={logout}>
                    <label>Are you sure you want to logout?</label>
                    <div className="w-full flex flex-row justify-end items-center gap-2 mt-3">
                        <Link href="/" className="btn btn-outline">Cancel</Link>
                        <button type="submit" className="btn btn-primary">Logout</button>
                    </div>
                </form>

            </article>
        </section>
    );
}