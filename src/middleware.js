import { NextResponse } from "next/server";

export function middleware(request) {
  if (request?.headers?.get("token")) {
    return NextResponse.next();
  } else {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/post/:path*",
};
