import { createEffect, createSignal } from "solid-js";
import { app } from "../init";
import { getFirestore, query, onSnapshot, collection, where } from "firebase/firestore";
import OperatedGroup from "../../components/ToolBer/OperatedGroup";
import User from "../../model/User";

//見る団体を指定して監視してdiplayStudentを更新
const db = getFirestore(app);
const [displayUsers, setDisplayUsers] = createSignal<User.type[]>([]);
const studentRef = collection(db, "users");
createEffect(() => {
    if(OperatedGroup.name() === undefined) return;
    const groupQuery = query(studentRef, where("readableGroups", "array-contains", OperatedGroup.name()));
    onSnapshot(groupQuery, (querySnapshot) => {
        const users: User.type[] = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data() as User.type);
        });
        setDisplayUsers(users);
    });
});

namespace DisplayUsers{
    export const data = displayUsers;
}

export default DisplayUsers;