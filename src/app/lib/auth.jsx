import {cookies} from "next/headers";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const TOKEN_AGE = 3600
const TOKEN_NAME = "auth-token"
const TOKEN_REFRESH_NAME = "auth-refresh-token"
export function getToken(){
    // api request
    const myAuthToken = cookies().get(TOKEN_NAME)
    console.log()
    return myAuthToken?.value
}


export function getRefreshToken(){
    // api request
    const myAuthToken = cookies().get(TOKEN_REFRESH_NAME)
    console.log()
    return myAuthToken?.value
}


export function setToken(authToken){
    //login
    return    cookies().set({
            name: TOKEN_NAME,
            value: authToken,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !=='development',
            maxAge: TOKEN_AGE,
    })
}


export function setRefreshToken(authRefreshToken){
    //login
    return    cookies().set({
            name: TOKEN_REFRESH_NAME,
            value: authRefreshToken,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !=='development',
            maxAge: TOKEN_AGE,
    })
}



export function deleteToken(){
    //logout
    cookies().delete(TOKEN_REFRESH_NAME)
    return cookies().delete(TOKEN_NAME)
}