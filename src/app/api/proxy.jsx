import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export default class ApiProxy {

    static async getHeaders(requireAuth) {
        let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            };

            const authToken = getToken();
            if (authToken && requireAuth) {
                headers["Authorization"] = `Bearer ${authToken}`;
            }
            return headers
    }

    static async handleFetch(endpoint, requestOptions) {
        let data = {}
        let status = 500
        try {
            const response = await fetch(endpoint, requestOptions)
            data = await response.json()
            status = response.status
        }catch (error){
            date = {message: "Cannot reach API server", error:error}
            status = 500
        }
        return {data, status}
    }



    static async post(endpoint, object, requireAuth) {
        try {
            const jsonData = JSON.stringify(object);
            const headers = await ApiProxy.getHeaders(requireAuth)
            const requestOptions = {
                method: "POST",
                headers: headers,
                body: jsonData
            };

            return await ApiProxy.handleFetch(endpoint, requestOptions);
        } catch (error) {
            console.error("Error in ApiProxy.post:", error);
            return NextResponse.error();
        }
    }


    static async get(endpoint, requireAuth) {
        try {
            const headers = await ApiProxy.getHeaders(requireAuth)
            const requestOptions = {
                method: "GET",
                headers: headers
            };

            return await ApiProxy.handleFetch(endpoint, requestOptions);
        } catch (error) {
            console.error("Error in ApiProxy.post:", error);
            return NextResponse.error();
        }
    }
}
