import { setDoc, doc, getFirestore, collection, query, onSnapshot } from "firebase/firestore";
import { app } from "../init";
import { createEffect, createSignal } from "solid-js";
import { Job } from "../../model/type";

const db = getFirestore(app);

export const [jobs, setJobs] = createSignal<Map<string,Job>>(new Map());
const jobRef = collection(db, "jobs");
createEffect(() => {
    const groupQuery = query(jobRef);
    onSnapshot(groupQuery, (querySnapshot) => {
        const jobs: Map<string,Job> = new Map();
        querySnapshot.forEach((doc) => {
            const id = doc.id as string;
            const job = doc.data() as Job;
            jobs.set(id,job);
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