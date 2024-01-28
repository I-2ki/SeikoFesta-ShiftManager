import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { createSignal } from "solid-js";

import { app } from "./init";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const [loginState, setLoginState] = createSignal<boolean | null>(null);
const [getUserId, setUserId] = createSignal<number | null>(null);

onAuthStateChanged(auth, (user) => {
    if (user) {
        setLoginState(true);
        setLoginState(true);
        const id: string = user.email!.slice(0, 5);
        if (!!Number(id)) {
            setUserId(Number(id));
        }
    } else {
        setLoginState(false);
    }
});

namespace Auth{
    export const logIn = () => {
        signInWithRedirect(auth, provider);
    }
    export const logOut = () => {
        signOut(auth);
    }
    export const isLogin = loginState;
    export const userId = getUserId;
}

export default Auth;