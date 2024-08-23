"use server"
import {NextResponse} from "next/server";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {setRefreshToken, setToken} from "@/app/lib/auth";
import {console} from "next/dist/compiled/@edge-runtime/primitives";
const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8001/api/token/pair"
export async function POST(request) {
    console.log(myAuthToken.value)
    const requestData = await request.json()
    const jsonData = JSON.stringify(requestData)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    }
    const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions)
    const responseData = await response.json()
    if (response.ok) {
        console.log("Logged in")
        const {access, refresh} = responseData
        setToken(access)
        setRefreshToken(refresh)
        return NextResponse.json({"LoggedIn": true}, {status: 200})
        }


   // const authToken = cookies().get("auth-token")


    return NextResponse.json({"LoggedIn": false, ...responseData}, {status: 400})
 }