// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";


export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("My token", token);
  // Define the URL for the login page
  const signInUrl = "/auth/signin";
  const selfPageUrl = "/users"; //
  //Get to Id to protect Edit Page
  let url = req.nextUrl.pathname; //Browser na address bar ni hal ni url ne get kari
  let path = url.split("/");
  let myid = path[path.length - 1];

  // If no token and trying to access protected pages like /addusers or any page
  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/addusers") ||
      req.nextUrl.pathname.startsWith(`/edit/${myid}`) ||
      req.nextUrl.pathname.startsWith("/users"))
  ) {
    return NextResponse.redirect(new URL(signInUrl, req.url));
  } else if (token && req.nextUrl.pathname.startsWith("/auth/signin")) {
    return NextResponse.redirect(new URL(selfPageUrl, req.url));
  }

  // Allow access if authenticated or not on protected routes
  return NextResponse.next();
}
