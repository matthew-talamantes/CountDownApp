import { getSession, getCountdown } from "@/actions";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { countid: string } }) {
    const session = await getSession();
    session.save();
    const countdown = await getCountdown(params.countid);
    return Response.json(countdown);
}