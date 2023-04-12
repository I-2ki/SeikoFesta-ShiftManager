import { getDatabase, ref, set, push, get, child } from "firebase/database";
import { app } from "./init";

const db = getDatabase(app);

export async function addUser(userId: number, name: string, groups: string[], editableGroups: string[]) {
    set(ref(db, `users/${userId}`), {
        id: userId,
        name: name,
        groups: groups,
        editableGroups: editableGroups,
    });
    set(ref(db, `firstShifts/${userId}`), {
        shift: new Array(53).fill(""),
    });
    set(ref(db, `secondShifts/${userId}`), {
        shift: new Array(53).fill(""),
    });
}

export async function getUser(userId: number) {
    const dbRef = ref(db);
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

export async function getGroupUsers(){
    
}



export async function addJob(name: string, explain: string, group: string) {
    push(ref(db, "jobs/"), {
        name: name,
        explain: explain,
        group: group,
    });
}
