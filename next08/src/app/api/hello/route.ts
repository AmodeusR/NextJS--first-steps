import { limiter } from "../config/limiter";

export async function GET(req: Request) {
  const origin = req.headers.get("origin")
  const remaining = await limiter.removeTokens(1);
  if (remaining < 0) {
    return new Response(null, {
      status: 429,
      statusText: "Too many requests",
      headers: {
        "Access-Control-Allow-Origins": origin || "*",
        "Content-Type": "text/plain"
      }
    })
  }
  console.log("Hey! This is your remaining tokens: ", remaining);

  return new Response("Ok");
}