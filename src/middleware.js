import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await request?.headers?.get("token");

  try {
    if (token) {
      return NextResponse.next();
    } else {
      return NextResponse.json(
        { error: "No Authorization Token" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const config = {
  matcher: "/api/post/:path*",
};
