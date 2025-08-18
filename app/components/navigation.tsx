"use client";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signInWithGoogle, handleRedirectResult, signOut, onAuthStateChanged } from "../lib/firebase/auth-actions";
// import {getAuthenticatedAppForUser} from "../lib/firebase/serverApp"
export default function Navigation() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const initAuth = async () => {
  //     console.log("chad inside init auth")
  //     const result = await handleRedirectResult();
  //     if(result.success) {
  //       console.log("chad success redirect")
  //       setUser(result?.user || null);
  //     }else {
  //       console.log("chad no success", result)
  //     }
  //   };

  //   initAuth();

  //   // Set up auth state listener
  //   const unsubscribe = onAuthStateChanged((user: User) => {
  //     console.log("chad state changed")
  //     setUser(user);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe(); // ✅ Cleanup listener
  // }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="flex w-full justify-center gap-8 py-4">
      <Link
        className="px-4 py-2 font-semibold text-lg border-2 rounded-md"
        href={"/"}
      >
        Home
      </Link>

      {!loading && (
        user ? (
          <div className="flex items-center gap-4">
            <span>Welcome, {user.email}</span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Sign In
          </button>
        )
      )}
    </nav>
  );
}