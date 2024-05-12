import { getSession, getCountdownList } from "@/actions";
import { type NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const session = await getSession();
    session.save();
    const params = request.nextUrl.searchParams;
    const sharedWith = params.get('sharedWith') === 'true';
    const countListParam = params.get('countList');
    const countList = countListParam ? countListParam.split(',') : [];
    const countdowns = await getCountdownList(sharedWith, countList);
    return Response.json(countdowns);
}