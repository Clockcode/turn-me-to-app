"use client"
import Link from "next/link";
import { useAuth } from "../providers/AuthProvider";

export default function GetStarted() {
  const auth = useAuth()
  if(!auth) <div>Loading...</div>

  const user = auth?.user
  const loading = auth?.loading
  const signInWithGoogle = auth?.signInWithGoogle

  return (
    <>
      {!loading &&
        (!user && (
          <button
          onClick={signInWithGoogle}
          className="primary-button"
        >
          Get Started
        </button>
        ))}
    </>
  );
}
