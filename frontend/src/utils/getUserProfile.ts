'use server';

export default async function getUserProfile(userId: string) {
    const url = `${process.env.BACKEND_URL}/user/profile/${userId}/`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
}