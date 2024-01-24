import { createEffect, createSignal } from "solid-js";
import { app } from "../init";
import { getFirestore, query, doc, onSnapshot, collection, where } from "firebase/firestore";
import { explaingGroupName } from "../../components/ToolBer/GroupSelector";
import { Student } from "../../model/type";

//見る団体を指定して監視してdiplayStudentを更新
const db = getFirestore(app);

export const [displayStudent, setDisplayStudent] = createSignal<Student[]>([]);
const studentRef = collection(db, "students");

createEffect(() => {
    const groupQuery = query(studentRef, where("readableGroups", "array-contains", explaingGroupName()));
    onSnapshot(groupQuery, (querySnapshot) => {
        const students: Student[] = [];
        querySnapshot.forEach((doc) => {
            students.push(doc.data() as Student);
        });
        setDisplayStudent(students);
    });
});