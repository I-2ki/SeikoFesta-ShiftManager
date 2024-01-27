import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { createSignal } from "solid-js";

import { app } from "./init";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const [loginState, setLoginState] = createSignal<boolean | null>(null);
export const [getUserId, setUserId] = createSignal<number | null>(null);

export function logIn() {
    signInWithRedirect(auth, provider);
}

export function logOut() {
    signOut(auth);
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        setLoginState(true);
        const id: string = user.email!.slice(0, 5);
        if (!!Number(id)) {
            setUserId(Number(id));
        }
    } else {
        setLoginState(false);
    }
});