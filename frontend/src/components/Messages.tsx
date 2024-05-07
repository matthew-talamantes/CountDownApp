"use client";
import Message from "@/components/message";
import { Message as MessageType } from "@/utils/types";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getMessages as utilGetMessages, removeMessages, clearMessages, updateMessage, getStaleMessageKeys } from "@/utils/messageUtil";
import { clientGetCookie, clientDeleteCookie } from "@/utils/clientCookie";

export default function Messages() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [siteMessages, setSiteMessages] = useState<string[]>([]);
    const pathName = usePathname();

    const getMessages = () => {
        let messageData = utilGetMessages();
        const messageKeys: number[] = messages.map((message) => message.key);
        messageData = messageData.filter((message) => !messageKeys.includes(message.key));
        messageData.forEach((item) => {
            if (!item.displayTime) {
                item.displayTime = new Date().getTime();
                updateMessage(item);
            }
        });
        const displayMessages = [...messages, ...messageData];
        displayMessages.sort((a, b) => b.postTime - a.postTime);
        setMessages(displayMessages);
    };
    useEffect(() => {
        const handleRouteChange = () => {
            if (messages.length != 0) {
                const currentTime = new Date().getTime();
                const messageKeys = getStaleMessageKeys(messages);
                if (messageKeys.length > 0) {
                    removeMessages(messageKeys);
                }
            }
            getMessages();
        };
        handleRouteChange();
    }, [pathName]);

    const pollMessages = () => {
        getMessages();
    };
    useEffect(() => {
        const interval = setInterval(() => {
            pollMessages();
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    // useEffect(() => {
    //     const messageData = JSON.parse(clientGetCookie("messages") || "[]");
    //     setMessages(messageData);
    // }, []);

    // setMessages(JSON.parse(clientGetCookie("messages") || "[]"));

    if (messages.length === 0) {
        return <></>;
    } else {
        return (
            <section className="messages">
                {messages.map((message, index) => {
                    message = message;
                    return (
                        <Message key={index} type={message.type} message={message.message} />
                    );
                })}
            </section>
        );
    }
}