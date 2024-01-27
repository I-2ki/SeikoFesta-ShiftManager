import { getFirestore, getDoc, doc } from "firebase/firestore";

import { createSignal, createEffect } from "solid-js";

import { app } from "../init";
import { getUserId } from "../auth";
import User from "../../model/User";

const [nowUser, setNowUser] = createSignal<User.type>(User.empty);

const fetchNowUser = async () => {
    const db = getFirestore(app);
    const studentId = getUserId();
    const userRef = doc(db, "users", `${studentId}`);
    if (studentId != null) {
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