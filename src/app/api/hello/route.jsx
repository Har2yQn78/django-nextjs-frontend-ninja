import { NextResponse } from "next/server";
import ApiProxy from "@/app/api/proxy";
import {DJANGO_API_ENDPOINT} from "@/config/default";

const DJANGO_API_WAITLISTS_URL = `${DJANGO_API_ENDPOINT}/waitlists/`

export async function GET(request) {
    const { data, status } = await ApiProxy.get(DJANGO_API_WAITLISTS_URL, true);
    return NextResponse.json(data, { status: status });
}

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { data, status } = await ApiProxy.post(DJANGO_API_WAITLISTS_URL, requestData, true);
        return NextResponse.json(data, { status: status });
    } catch (error) {
        console.error('Error during POST request to Django API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
