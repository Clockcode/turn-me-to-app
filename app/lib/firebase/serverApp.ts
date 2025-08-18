import "server-only"

import { cookies } from "next/headers"
import { initializeServerApp, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import {app } from "./clientApp"

export async function getAuthenticatedAppForUser() {
  const authIdToken = (await cookies()).get("__session")?.value;
  console.log("authIdToken", authIdToken)
  console.log("app", app)

  // Firebase Server App is a new feature in the JS SDK that allows you to
  // instantiate the SDK with credentials retrieved from the client & has
  // other affordances for use in server environments.
  const firebaseServerApp = initializeServerApp(app, {authIdToken})
  console.log("firebaseServerApp", firebaseServerApp);

  const auth = getAuth(firebaseServerApp);
  console.log("auth", auth);
  await auth.authStateReady()

  return {currentUser: auth.currentUser}
}