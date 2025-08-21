"use client"
import {useState, useEffect, createContext, useContext, useRef, useMemo} from "react"
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  User
} from "firebase/auth";
import { auth } from "../lib/firebase/clientApp";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: (forceRefresh?: boolean) => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children} : {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Prevent running certain flows in parallel during rapid refreshes
  const syncingRef = useRef<boolean>(false);

  useEffect(() => {
    const unsub = _onIdTokenChanged(auth, async (user) => {
      try {
      setLoading(true);
      setUser(user);
      if(!syncingRef.current) {
        syncingRef.current = true;
        if(user) {
          const idToken = await user.getIdToken();
          const res = await fetch("api/session", {method: "POST", body: JSON.stringify({idToken}), headers: {"Content-Type": "application/json"}})
          console.log(res)
        } else {
          await fetch("/api/session", {method: "DELETE"})
        }
        syncingRef.current = false;
      }
      } finally {
        setLoading(false);
      }
    })
    return unsub;
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  }


  async function signOut() {
    firebaseSignOut(auth)
    .catch((err) => {
      console.error("Error signing out:", err);
      throw err;
    });
  }

  async function getIdToken(forceRefresh = false) {
    const currentUser = auth.currentUser;
    if(!currentUser) return null;
    return currentUser.getIdToken(forceRefresh);
  }

  const value = useMemo<AuthContextType>(() => ({user, loading, signInWithGoogle, signOut, getIdToken }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}