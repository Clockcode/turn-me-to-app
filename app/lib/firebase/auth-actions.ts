"use client";

import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged
} from "firebase/auth";
import { auth } from "./clientApp";

export function onAuthStateChanged(cb) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    console.log("will run sign in func");
    await signInWithRedirect(auth, provider);
    console.log("Will run redirect result");
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function handleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("Redirect result:", result);
      const user = result.user;
      console.log("Auth state changed:", user?.email);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      return { success: true, user, token };
    }
    return { success: false, user: null };
  } catch (err) {
    console.error("Error handling redirect result:", err);
    return { success: false, err };
  }
}

export function signOut() {
  firebaseSignOut(auth)
  .catch((err) => {
    console.error("Error signing out:", err);
    throw err;
  });
}
