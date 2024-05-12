import { getSession, getUserProfile } from "@/actions";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const session = await getSession();
    session.save();
    const profile = await getUserProfile(session);
    return Response.json(profile);
}