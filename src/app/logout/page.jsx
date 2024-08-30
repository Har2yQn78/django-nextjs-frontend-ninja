"use client"

import {useAuth} from "@/components/authProvider";

const LOGOUT_URL = "api/logout/"

export default function Page () {
    const auth = useAuth()


    async function handleClick (event) {
        event.preventDefault()
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: ""
        }
        const response = await fetch(LOGOUT_URL, requestOptions)
        if (response.ok) {
            console.log("Logged out")
            auth.logout()
        }
    }
    localStorage.setItem('token', 'abc')

    return <div className="h-[95vh]">
        <div className='max-w-md mx-auto py-5'>
            <h1>Are you sure you want to Logout?</h1>
            <button className='bg-red-500 text-white hover:bg-red-300 px-3 py-2' onClick={handleClick}>
                Yes, Logout
            </button>
        </div>
    </div>


}