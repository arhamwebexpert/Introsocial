// app/api/auth/logout/route.js
// Clears the auth cookie

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("token", "", { maxAge: 0, path: "/" });
  return response;
}
