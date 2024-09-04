"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useState} from "react";

const WAITLIST_API_URL = "/api/waitlists/"

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your password link and a link to sign up if you do not have an account. The second column has a cover image."

export default function WaitlistForm() {
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(event, event.target)

        const formData = new FormData(event.target)
        const objectFromForm = Object.fromEntries(formData)
        const jsonData = JSON.stringify(objectFromForm)

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        }

        const response = await fetch(WAITLIST_API_URL, requestOptions)
        if (response.ok) {
            setMessage("Thank you for joining")
        } else {
            setError("There was an error with your request. Please try again.")
        }
    }
    return <form onSubmit={handleSubmit}>
        <div>{message && message}</div>
        <div>{error && error}</div>
        <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="emial"
                type="emial"
                name="email"
                placeholder="Your emial"
                required
            />
        </div>
        <Button type="submit" className="w-full">
            Join Waitlist
        </Button>
    </form>
}
