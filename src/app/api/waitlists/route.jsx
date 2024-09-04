import { NextResponse } from "next/server";
import { getToken } from "@/lib/auth";

const DJANGO_API_WAITLISTS_URL = "http://127.0.0.1:8001/api/waitlists/";

export async function GET(request) {
    const authToken = getToken();
    if (!authToken) {
        return NextResponse.json({}, { status: 401 });
    }

    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    };

    const response = await fetch(DJANGO_API_WAITLISTS_URL, option);
    const result = await response.json();
    const status = response.status;
    return NextResponse.json({ ...result }, { status: status });
}

export async function POST(request) {
    try {
        const requestData = await request.json();
        const jsonData = JSON.stringify(requestData);
        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };

        const authToken = getToken();
        if (authToken) {
            headers["Authorization"] = `Bearer ${authToken}`;
        }

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: jsonData
        };

        const response = await fetch(DJANGO_API_WAITLISTS_URL, requestOptions);

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return NextResponse.json(responseData, { status: 201 });
        } else {
            const errorData = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }
    } catch (error) {
        console.error("Error during request:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
