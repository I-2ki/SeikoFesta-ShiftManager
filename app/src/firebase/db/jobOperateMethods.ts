import { setDoc, doc, getFirestore, collection, query, onSnapshot } from "firebase/firestore";
import { app } from "../init";
import { createEffect, createSignal } from "solid-js";
import { Job } from "../../model/type";

const db = getFirestore(app);

export const [job, setJob] = createSignal<Job[]>();
const jobRef = collection(db, "jobs");
createEffect(() => {
    const groupQuery = query(jobRef);
    onSnapshot(groupQuery, (querySnapshot) => {
        const jobs: Job[] = [];
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();
            jobs.push({
                id: id,
                name: data.name,
                group: data.group,
                explain: data.explain,
            } as Job);
        });
        setJob(jobs);
    });
});

export async function addJob(name: string, group: string, explain: string) {
    setDoc(doc(jobRef), {
        name: name,
        group: group,
        explain: explain,
    });
}