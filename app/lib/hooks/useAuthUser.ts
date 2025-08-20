import { onIdTokenChanged } from "firebase/auth";
import { useEffect, useRef } from "react";
import { setCookie, deleteCookie } from "cookies-next";
import { auth } from "../firebase/clientApp";
import { Router } from "next/router";
export default function useAuthUser(initialUser?: { uid?: string | null }) {
  const prevUidRef = useRef<string | null>(initialUser?.uid ?? null);

  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        await setCookie("__session", idToken);
      } else {
        await deleteCookie("__session");
      }
      const currentUid = user?.uid ?? null;
      if (currentUid  !== prevUidRef.current) {
        prevUidRef.current = currentUid;
        // window.location.reload();
        Router.prototype.reload();
      }
    });
    return unsub;
  }, []);
}
