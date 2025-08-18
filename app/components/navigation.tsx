"use client";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import Link from "next/link";
import AuthButton from "./authButton";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../lib/firebase/clientApp";
// import {getAuthenticatedAppForUser} from "../lib/firebase/serverApp"
export default function Navigation() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  // Start a sign in process for an unauthenticated user.
  provider.addScope("profile");
  provider.addScope("email");

  useEffect(() => {
    // Handle redirect result when component mounts
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("User signed in:", result.user.email);
        }
      } catch (error) {
        console.error("Error handling redirect:", error);
      }
    };

    handleRedirect();

    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // ✅ Cleanup listener
  }, []);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
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