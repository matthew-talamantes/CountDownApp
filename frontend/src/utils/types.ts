type ErrorType = { [key: string]: string };
type Message = { key?: number, postTime?: number, message: string, type: 'error' | 'success' | 'info', displayTime?: number };
type MessageCookie = { key?: number, postTime?: number, message: string, displayTime?: number };

export default ErrorType;
export type { Message, MessageCookie };