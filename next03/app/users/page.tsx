import getAllUsers from "@/lib/getAllUsers";
import Link from "next/link";
import { stringify } from "querystring";
import React from "react";

export const metadata = {
  title: "Users"
}

export default async function Users() {
  const users = await getAllUsers();
  return (
    <section className="flex flex-col items-center p-24">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
