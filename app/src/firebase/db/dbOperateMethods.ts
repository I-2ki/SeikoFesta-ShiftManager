import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../init";

const db = getFirestore(app);

//Student操作用汎用関数
export async function addStudent(userId: number, name: string, readableGroups: string[], editableGroups: string[]) {
    const studentRef = collection(db,"students");
    setDoc(doc(studentRef, `${userId}`), {
        id: userId,
        name: name,
        readableGroups: readableGroups,
        editableGroups: editableGroups,
        firstShift: new Array(53).fill(""),
        secondShift: new Array(53).fill(""),
    });
}

export async function deleteStudent(userId: number) {
    const studentRef = collection(db,"collection");
    setDoc(doc(studentRef, `${userId}`), {});
}

//Job操作用汎用関数
export async function addJob(name: string, explain: string, group: string) {
    setDoc(doc(db, "jobs/"), {
        name: name,
        explain: explain,
        group: group,
    });
}
