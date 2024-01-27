import { setDoc, doc, getFirestore, collection, query, onSnapshot, deleteDoc } from "firebase/firestore";
import { app } from "../init";
import { createEffect, createSignal } from "solid-js";
import { Job } from "../../model/type";

const db = getFirestore(app);

export const [jobs, setJobs] = createSignal<Job[]>([]);

const jobRef = collection(db, "jobs");
createEffect(() => {
    const groupQuery = query(jobRef);
    onSnapshot(groupQuery, (querySnapshot) => {
        const jobs: Job[] = [];
        querySnapshot.forEach((doc) => {
            jobs.push({
                id: doc.id,
                name: doc.data().name,
                group: doc.data().group,
                explain: doc.data().explain,
            });
        });
        setJobs(jobs);
    });
});

export async function addJob(name: string, group: string, explain: string) {
    setDoc(doc(jobRef), {
        name: name,
        group: group,
        explain: explain,
    });
}

export async function deleteJob(id: string) {
    deleteDoc((doc(jobRef,id)));
}