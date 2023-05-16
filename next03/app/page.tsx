import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <h1 className="text-2xl font-bold mb-4">Home page</h1>
      <Link href="/users">Users</Link>
    </main>
  )
}
