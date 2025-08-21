import "server-only";

import { cookies } from "next/headers";
import { adminAuth } from "./adminApp";

const NAME = process.env.SESSION_COOKIE_NAME || "__session";

export async function getServerUser() {
  const cookie = (await cookies()).get(NAME)?.value;
  if (!cookie) return null;
  try {
    // checkRevoked if you want stricter behavior:
    const decoded = await adminAuth.verifySessionCookie(cookie, true);
    return decoded; // has uid, email, claims, etc.
  } catch {
    return null;
  }
}
