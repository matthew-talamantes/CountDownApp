import { clientSetCookie, clientGetCookie, clientDeleteCookie } from "@/utils/clientCookie";
import { Message, MessageCookie } from "@/utils/types";

export const getRandomInt = (min: number, max: number): number => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

export const encodeMessage = (message: Message): string => {
    let encodedMessage = btoa(`${message.type}::${message.message}`);
    encodedMessage = encodedMessage.replace("=", "~");
    return encodedMessage;
};

export const decodeMessage = (encodedMessage: string): Message => {
    encodedMessage = encodedMessage.replace("~", "=");
    const decodedMessage = atob(encodedMessage);
    const splitMessage = decodedMessage.split("::");
    const message: Message = {
        type: splitMessage[0] as 'error' | 'success' | 'info',
        message: splitMessage[1],
    };
    return message;
};

export const getCookieMessages = (): MessageCookie[] => {
    const uriDecoded = decodeURIComponent(clientGetCookie("messages"));
    if (uriDecoded === 'undefined' || uriDecoded === "") {
        return [];
    } else {
        const messages = JSON.parse(uriDecoded);
        return messages;
    }
};

export const getEncodedCookieMessages = (messages: MessageCookie[]) => {
    return encodeURIComponent(JSON.stringify(messages));
};

export const getMessages = (): Message[] => {
    const messages = getCookieMessages();
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

export const addMessage = (message: Message) => {
    const messages: MessageCookie[] = getCookieMessages();
    const currentTime = new Date().getTime();
    if (!message.key) {
        message.key = currentTime;
    }
    if (!message.postTime) {
        message.postTime = currentTime;
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
        }
    } else {
        messages.push(cookieMessage);
    }
    const encodedMessages = getEncodedCookieMessages(messages);
    clientSetCookie("messages", encodedMessages);
};

export const updateMessage = (message: Message) => {
    const messages: MessageCookie[] = getCookieMessages();
    const index = messages.findIndex((item) => item.key === message.key);
    const encodedMessage = encodeMessage(message);
    const cookieMessage: MessageCookie = {
        key: message.key,
        postTime: message.key,
        message: encodedMessage,
        displayTime: message.displayTime,
    };
    if (index > -1) {
        messages[index] = cookieMessage;
        const encodedMessages = getEncodedCookieMessages(messages);
        clientSetCookie("messages", encodedMessages);
    }
};

export const removeMessage = (key: number) => {
    const messages = getCookieMessages().filter((message) => message.key !== key);
    const encodedMessages = getEncodedCookieMessages(messages);
    clientSetCookie("messages", encodedMessages);
};

export const removeMessages = (keys: number[]) => {
    const messages = getCookieMessages().filter((message) => !keys.includes(message.key));
    const encodedMessages = getEncodedCookieMessages(messages);
    clientSetCookie("messages", encodedMessages);
};

export const clearMessages = () => {
    clientDeleteCookie("messages");
};

export const getStaleMessageKeys = (messages: MessageCookie[]): number[] => {
    const currentTime = new Date().getTime();
    const staleMessages = messages.filter((message) => message.displayTime && currentTime - message.displayTime > 800);
    const messageKeys = staleMessages.map((message) => message.key);
    return messageKeys;
};