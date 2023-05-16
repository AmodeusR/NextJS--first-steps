import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import { Metadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";

type UserPageProps = {
  params: {
    userId: number;
  };
};

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const user = await getUser(params.userId);

  return {
    title: user.name
  }
  
}

export default async function UserPage({ params }: UserPageProps) {
  const userData = getUser(params.userId);
  const userPostsData = getUserPosts(params.userId);

  const [user, userPosts] = await Promise.all([userData, userPostsData]);

  return (
    <section className="flex flex-col items-center p-24">
      <h1 className="text-2xl font-bold mb-4">{user.name} posts</h1>
      <Link href="/users" className="mb-4">
        go back to users
      </Link>
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          {userPosts.map((userPost) => (
            <article key={userPost.id} className="bg-zinc-800 p-4 m-2 max-w-lg">
              <h2 className="text-2xl font-bold">{userPost.title}</h2>
              <p>{userPost.body.substring(0, 500)}</p>
            </article>
          ))}
        </Suspense>
      </main>
    </section>
  );
}
