import { getFirestore, collection, query, onSnapshot } from "firebase/firestore";
import { createEffect, createSignal } from "solid-js";

import { app } from "../init";
import Job from "../../model/Job";
import OperatedGroup from "../../components/ToolBer/OperatedGroup";

const db = getFirestore(app);

const [jobs, setJobs] = createSignal<Job.type[]>([]);
const jobRef = collection(db, "jobs");

createEffect(() => {
    const groupQuery = query(jobRef);
    onSnapshot(groupQuery, (querySnapshot) => {
        const jobs: Job.type[] = [];
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

namespace AllJobs {
    export const data = jobs;
    export const serachOf = (id: string): Job.type => {
        data().forEach((job: Job.type) => {
            if (job.id == id) return job;
        });
        return Job.empty;
    }
    export const serachBy = (group: string): Job.type[] => {
        const jobs: Job.type[] = [];
        data().forEach((job: Job.type) => {
            if (job.group === group) jobs.push(job);
        })
        return jobs;
    }
    export const operatingGroupJobNames = () => {
        const names: string[] = [];
        for (let job of serachBy(OperatedGroup.name())) {
            names.push(job.name);
        }
        return names;
    }
}

export default AllJobs;