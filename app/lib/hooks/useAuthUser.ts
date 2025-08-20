import { User, onIdTokenChanged} from "firebase/auth"
import { setCookie, deleteCookie } from "cookies-next";
import {auth} from "../firebase/clientApp"
export default function useAuthUser(initialUser: any | undefined) {
  return onIdTokenChanged(auth, async ( user) => {
    if (user) {
      const idToken = await user.getIdToken();
      await setCookie("__session", idToken);
    } else {
      await deleteCookie("__session");
    }
    if (initialUser?.uid === user?.uid) {
      return;
    }
    window.location.reload();
  });
}