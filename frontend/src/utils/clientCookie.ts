type SameSite = "Strict" | "Lax" | "None";

const clientSetCookie = (name: string, value: string, maxAge?: number, sameSite: SameSite = "Lax") => {
    const cookieString = `${name}=${value};${maxAge && ` max-age=${maxAge};`} domain=${window.location.hostname}; path=/; SameSite=${sameSite}`;
    document.cookie = cookieString;
};

const clientGetCookie = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie?.split("=")[1];
};

const clientDeleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
};

export { clientSetCookie, clientGetCookie, clientDeleteCookie };