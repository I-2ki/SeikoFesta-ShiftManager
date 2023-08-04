import { createSignal, createEffect } from "solid-js";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { app } from "../init";
import { getUserId } from "../auth";
import { Student } from "../../type";

//操作中のユーザーを取得

export const [currentOperatingStudent, setCurrentOperatingStudent] = createSignal<Student>();

const fetchCurrentOperatingStudent = async () => {
    const db = getFirestore(app);
    const studentId = getUserId();
    const studentRef = doc(db, "students", `${studentId}`);
    if (studentId != null) {
        const snapshot = await getDoc(studentRef);
        if (snapshot.exists()) {
            return snapshot.data() as Student;
        }
    }
}

createEffect(() => {
    const fetchStudent = async () => {
        const student = await fetchCurrentOperatingStudent();
        setCurrentOperatingStudent(student);
    };
    fetchStudent();
});