import {deleteToken} from "@/app/lib/auth";
import {NextResponse} from "next/server";


export async function POST(request) {
    deleteToken()
    return NextResponse.json({}, {status: 200})

}