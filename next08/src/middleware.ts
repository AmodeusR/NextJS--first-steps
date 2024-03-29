import { NextResponse } from "next/server";

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://www.yoursite.com', 'https://yoursite.com']
    : ['http://localhost:3000']


export function middleware(request: Request) {
  const origin = request.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return new Response(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain"
      }
    })
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*"
}