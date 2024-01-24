import { setDoc , doc, getFirestore } from "firebase/firestore";
import { app } from "../init";

const db = getFirestore(app);

export async function fetchAllJobs(){
    
}

export async function addJob(name: string, group: string, description: string) {
    setDoc(doc(db, "jobs/"), {
        name: name,
        group: group,
        description: description,
    });
}
