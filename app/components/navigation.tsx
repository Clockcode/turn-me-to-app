"use client";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signInWithGoogle, handleRedirectResult, signOut, onAuthStateChanged } from "../lib/firebase/auth-actions";
// import {getAuthenticatedAppForUser} from "../lib/firebase/serverApp"
export default function Navigation() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = onAuthStateChanged((user) => {
      console.log("chad state changed")
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // ✅ Cleanup listener
  }, []);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const user = await signInWithGoogle();
      setUser(user?.user || null);
      setLoading(false);
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
            <span>Welcome, {user.displayName}</span>
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