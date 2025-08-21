import { NextRequest, NextResponse } from "next/server";
import {adminAuth} from "../../lib/firebase/adminApp"
import { cookies } from "next/headers";

const NAME = "__session"
const MAX_DAYS = Number(process.env.SESSION_COOKIE_MAX_DAYS || "5")

const baseCookie = {
  httpOnly: true,
  secure: true,
  // sameSite: "lax" as const,
  // path: "/"
}

export async function POST(req: NextRequest) {
  const {idToken} = await req.json();

  const expiresIn = MAX_DAYS * 24 * 60 * 60 * 1000;
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {expiresIn})

  const res = new NextResponse(null, {status: 204});

  (await cookies()).set(NAME, sessionCookie, {
    ...baseCookie,
    maxAge: expiresIn
  })
  console.log("cookies", res.cookies)

  return res;
}

export async function DELETE() {
  (await cookies()).set(NAME, "", {...baseCookie, maxAge: 0});
  return new NextResponse(null, {status: 204})
}