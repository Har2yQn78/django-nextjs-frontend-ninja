"use client"

import WaitlistTable from "@/app/waitlists/table";


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <WaitlistTable />
    </main>
  );
}
