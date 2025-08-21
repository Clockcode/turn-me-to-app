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
        (user ? (
          <Link
          href={"/studioghibli"}
          className="rounded-md text-lg bg-blue-600 text-white font-white px-8 py-4 align-center font-medium"
        >
          Turn me to Studio Ghibli
        </Link>
        ): (
          <button
          onClick={signInWithGoogle}
          className="px-8 py-4 bg-blue-500 text-lg text-white rounded-md"
        >
          Get Started
        </button>
        ))}
    </>
  );
}
