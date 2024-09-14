"use server"
import {NextResponse} from "next/server";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {setRefreshToken, setToken} from "@/lib/auth";
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import {DJANGO_API_ENDPOINT} from "@/config/default";

const DJANGO_API_LOGIN_URL = `${DJANGO_API_ENDPOINT}/token/pair`
export async function POST(request) {
    try {
        const requestData = await request.json();
        const jsonData = JSON.stringify(requestData);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        };

        const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);

        if (response.ok) {
            const { username, access, refresh } = await response.json();
            setToken(access);
            setRefreshToken(refresh);
            return NextResponse.json({ "LoggedIn": true, "username": username }, { status: 200 });
        } else {
            const responseData = await response.json();
            return NextResponse.json({ "LoggedIn": false, ...responseData }, { status: 400 });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ "LoggedIn": false, "error": error.message }, { status: 500 });
    }
}