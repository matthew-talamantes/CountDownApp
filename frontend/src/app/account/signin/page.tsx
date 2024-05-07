"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

import ErrorType from "@/utils/types";
import { Message } from "@/utils/types";
import { getClientSession, login } from "@/actions";
import { addMessage } from "@/utils/messageUtil";
import TextInput from "@/components/TextInput";

const initialFormState = {
    errors: {},
};

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<ErrorType>({});
    const [formState, formAction] = useFormState(login, initialFormState);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const session = await getClientSession();
            if (session.isAuthenticated) {
                router.push("/");
                addMessage({ message: "You are already signed in.", type: 'info' });
            }
        };
        checkSession();
    }, []);

    useEffect(() => {
        if (Object.keys(formState.errors).length > 0) {
            const messages: Message[] = [];
            if (formState.errors.non_field_errors) {
                formState.errors.non_field_errors.forEach((error) => {
                    const message: Message = { key: new Date().getTime(), message: error, type: "error" };
                    messages.push(message);
                    addMessage(message);
                });
            }
        }
    }, [formState]);

    return (
        <section className="w-full max-w-sm mx-auto px-0">
            <article className="w-full flex flex-col justify-start items-start gap-7">
                <h1 className="text-5xl font-semibold">Sign In</h1>
                <div className="w-full px-4">
                    <form id="signinForm" action={formAction}>
                        <TextInput label="Username" name="username" type="text" placeholder="Username" error={errors['username']} value={username} required={true} onChange={(e) => setUsername(e.target.value)} />
                        <TextInput label="Password" name="password1" type="password" placeholder="Password" error={errors['password1']} value={password} required={true} onChange={(e) => setPassword(e.target.value)} />
                        <div className="w-full">
                            <button type="submit" className="btn btn-primary float-right">Sign In</button>
                        </div>
                    </form>
                </div>
            </article>
            <div className="divider"></div>
            <article className="w-full flex flex-col justify-start items-center gap-2">
                <p><a>Forgot Password?</a></p>
                <p>Don't Have an Account? <a>Sign Up</a></p>
            </article>
        </section>
    );
}

