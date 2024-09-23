import { NextResponse } from "next/server";
import ApiProxy from "@/app/api/proxy";
import {DJANGO_API_ENDPOINT} from "@/config/default";

export async function GET(request) {
    const data = {apiEndpoint : DJANGO_API_ENDPOINT}
    return NextResponse.json(data, { status: 200 });
}