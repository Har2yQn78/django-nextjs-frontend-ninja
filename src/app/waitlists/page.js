"use client"
import useSWR from "swr";
import {useEffect} from "react";
import {useAuth} from "@/components/authProvider";

const fetcher = async url => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

const WAITLIST_API_URL = "/api/waitlists/"

export default function Page() {
  const {data, error, isLoading} = useSWR("http://127.0.0.1:8001/api/hello", fetcher)
    const auth = useAuth()
    useEffect(() => {
        if (error?.status === 401) {
            auth.loginRequiredRedirect()
        }
    }, [auth, error]);
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {JSON.stringify(data)}
      </div>
    </main>
  );
}
