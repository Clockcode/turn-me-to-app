"use client";

import { useState, useEffect, DOMElement } from "react";
import { auth } from "../lib/firebase/clientApp";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  signInWithGoogle,
  handleRedirectResult,
  signOut,
  onIdTokenChanged,
} from "../lib/firebase/auth-actions";
import { setCookie, deleteCookie } from "cookies-next";


export default function AuthButton({initialUser} : {initialUser: User | null}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    return onIdTokenChanged(async (user: User) => {
      if (user) {
        const idToken = await user.getIdToken();
        await setCookie("__session", idToken);
        setUser(user)
      } else {
        await deleteCookie("__session");
        setUser(null);
      }
      if (initialUser?.uid === user?.uid) return;

      setLoading(false);
      window.location.reload();
    });
  }, [initialUser]);

  const handleSignIn = async (event: React.MouseEvent) => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error("Error handling sign in:", err);
    }
    event.preventDefault();
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (err) {
      console.error("Error when signing out:", err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      {user ? (
        <>
          <h1>Welcome {user.email}</h1>
          <button onClick={handleSignOut}>Sign out</button>
        </>
      ) : (
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-yellow-500 rounded-md border border-yellow-200"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
