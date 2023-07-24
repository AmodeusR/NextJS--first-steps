import { randomUUID } from "crypto";
import Link from "next/link";
type route = {
  id: string;
  name: string;
  type: "GET" | "POST" | "UPDATE" | "PATCH";
  path: string;
}
const routes: route[] = [
  {
    id: randomUUID(),
    name: "todos",
    type: "GET",
    path: "/api/todos"
  }
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl mb-4">Rest API exercise</h1>
      <p>Access routes:</p>
      <ul className="mt-2 text-sm hover:text-cyan-400 transition-colors">
        {routes.map(route => (
          <li key={route.id}>
            <Link href={route.path}>
            {route.name} ({route.type})
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
