export default async function getUserPosts(userId: number): Promise<Post[]> {
  const link = new URL("https://jsonplaceholder.typicode.com/posts");
  link.searchParams.set("userId", String(userId))
  const response = await fetch(link);

  if (!response.ok) {
    throw new Error("Something went wrong with the posts")
  }

  return response.json();
}