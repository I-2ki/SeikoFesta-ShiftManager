import { getFirestore, getDoc, doc } from "firebase/firestore";

import { createSignal, createEffect } from "solid-js";

import { app } from "../init";
import Auth from "../auth";
import User from "../../model/User";

const [nowUser, setNowUser] = createSignal<User.type>(User.empty);

const fetchNowUser = async () => {
    const db = getFirestore(app);
    const userId = Auth.userId();
    const userRef = doc(db, "users", `${userId}`);
    if (userId != null) {
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
            return snapshot.data() as User.type;
        }
    }
}

createEffect(() => {
    const fetchStudent = async () => {
        const user = await fetchNowUser() || User.empty;
        setNowUser(user);
    };
    fetchStudent();
});

namespace NowUser {
    export const get = nowUser;
}

export default NowUser;