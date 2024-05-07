"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

import ErrorType from "@/utils/types";
import { Message } from "@/utils/types";
import { getClientSession, login } from "@/actions";
import { addMessage } from "@/utils/messageUtil";

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
        <>
            <h1>Sign In</h1>
        </>
    );
}

