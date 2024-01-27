import { setDoc, doc, getFirestore, collection, query, onSnapshot, deleteDoc } from "firebase/firestore";

import { app } from "../init";

const db = getFirestore(app);
const jobRef = collection(db, "jobs");

namespace JobDBOperation {
    export const add = async (name: string, group: string, explain: string) => {
        setDoc(doc(jobRef), {
            name: name,
            group: group,
            explain: explain,
        });
    }

    export const remove = async (id: string) => {
        deleteDoc((doc(jobRef, id)));
    }
}

export default JobDBOperation;