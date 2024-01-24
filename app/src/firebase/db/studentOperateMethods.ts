import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../init";
import { numOfCells } from "../../logic/time";

const db = getFirestore(app);

export async function addStudent(userId: number, name: string, readableGroups: string[], editableGroups: string[]) {
    const studentRef = collection(db,"students");
    setDoc(doc(studentRef, `${userId}`), {
        id: userId,
        name: name,
        readableGroups: readableGroups,
        editableGroups: editableGroups,
        firstShift: new Array(numOfCells()).fill(""),
        secondShift: new Array(numOfCells()).fill(""),
    });
}

export async function deleteStudent(userId: number) {
    const studentRef = collection(db,"collection");
    setDoc(doc(studentRef, `${userId}`), {});
}