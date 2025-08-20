"use client"
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  signInWithGoogle,
  onAuthStateChanged,
} from "../lib/firebase/auth-actions";
import Link from "next/link";

export default function GetStarted() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = onAuthStateChanged((user) => {
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

  return (
    <>
      {!loading &&
        (user ? (
          <Link
          href={"/studioghibli"}
          className="rounded-md text-lg bg-blue-600 text-white font-white px-8 py-4 align-center font-medium"
        >
          Turn me to Studio Ghibli
        </Link>
        ): (
          <button
          onClick={handleSignIn}
          className="px-8 py-4 bg-blue-500 text-lg text-white rounded-md"
        >
          Get Started
        </button>
        ))}
    </>
  );
}
