"use client";

import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  NextOrObserver,
  User
} from "firebase/auth";
import { auth } from "./clientApp";

export function onAuthStateChanged(cb : NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb : NextOrObserver<User>) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");

  try {
    console.log("will run sign in func");
    return await signInWithPopup(auth, provider);
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
