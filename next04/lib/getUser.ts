export default async function getUser(userId: number): Promise<User | undefined> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) {
    return undefined;
  }

  return await response.json();
}
