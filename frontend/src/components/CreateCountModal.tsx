"use client";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { getClientSession } from "@/actions";

const initialFormState = {
    errors: {},
};

export default function CreateCountModal() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [timeZone, setTimeZone] = useState("");
    const [publicLink, setPublicLink] = useState(false);
    const [sharedWith, setSharedWith] = useState([]);

    useEffect(() => {
        const checkSession = async () => {
            const session = await getClientSession();
            setIsAuthenticated(session.isAuthenticated);
        };
        checkSession();
    }, []);

    return (
        <dialog id="create-count-modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                </form>
                <h1>Create Countdown</h1>
            </div>
        </dialog>
    );
};