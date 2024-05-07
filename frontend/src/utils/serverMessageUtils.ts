"use server";

import { cookies } from "next/headers";
import { getRandomInt, encodeMessage, decodeMessage, getStaleMessageKeys } from "@/utils/messageUtil";
import { MessageCookie, Message } from "@/utils/types";

const cookieSettings = {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    encode: (v) => v,
    secure: process.env.NODE_ENV === "production",
};

export const getServerCookieMessages = async (): MessageCookie[] => {
    const cookieStore = await cookies();
    if (cookieStore.has('messages')) {
        return JSON.parse(cookieStore.get('messages').value);
    } else {
        return [];
    }
};
export const getServerMessages = async (): Message[] => {
    const messages = await getServerCookieMessages();
    const returnMessages: Message[] = messages.map((message: MessageCookie) => {
        const decodedMessage = decodeMessage(message.message);
        const returnMessage: Message = {
            key: message.key,
            postTime: message.postTime,
            message: decodedMessage.message,
            type: decodedMessage.type,
            displayTime: message.displayTime,
        };
        return returnMessage;
    });
    return returnMessages;
};

export const addServerMessage = async (message: Message) => {
    const messages: MessageCookie[] = await getServerCookieMessages();
    if (!message.key) {
        message.key = new Date().getTime();
    }
    const encodedMessage = encodeMessage(message);
    const cookieMessage: MessageCookie = {
        key: message.key,
        postTime: message.key,
        message: encodedMessage,
    };
    messages.sort((a, b) => a.postTime - b.postTime);
    if (messages.filter((item) => item.key === cookieMessage.key).length > 0) {
        cookieMessage.key += getRandomInt(1, 1000)
    }
    if (messages.length > 0) {
        if (cookieMessage.message !== messages[messages.length - 1].message || cookieMessage.displayTime - messages[messages.length - 1].postTime > 500) {
            messages.push(cookieMessage);
            cookies().set('messages', JSON.stringify(messages), { encode: (v) => v });
        }
    } else {
        messages.push(cookieMessage);
        cookies().set('messages', JSON.stringify(messages), { encode: (v) => v });

    }
};

export const updateServerMessage = async (message: Message) => {
    const messages: MessageCookie[] = await getServerCookieMessages();
    const index = messages.findIndex((item) => item.key === message.key);
    const encodedMessage = encodeMessage(message);
    const cookieMessage: MessageCookie = {
        key: message.key,
        postTime: message.key,
        message: encodedMessage,
        displayTime: message.displayTime,
    };
    messages[index] = cookieMessage;
    cookies().set('messages', JSON.stringify(messages), { encode: (v) => v });
};

export const removeServerMessages = async (keys: number[]) => {
    const messages: MessageCookie[] = await getServerCookieMessages();
    const newMessages = messages.filter((message) => !keys.includes(message.key));
    cookies().set('messages', JSON.stringify(newMessages), { encode: (v) => v });
};

export const clearServerMessages = () => {
    cookies().delete('messages');
};

export const purgeStaleServerMessages = async () => {
    const messages: MessageCookie[] = await getServerCookieMessages();
    const staleKeys = getStaleMessageKeys(messages);
    removeServerMessages(staleKeys);
};