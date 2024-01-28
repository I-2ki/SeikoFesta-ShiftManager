import { doc, getFirestore, runTransaction } from "firebase/firestore"
import { app } from "../init"

const db = getFirestore(app);

type Queue = {
    studentIds: string,
    firstShift: string[],
    secondShift: string[],
}

const shiftsUpdate = (queues: Queue[]) => {
    runTransaction(db, async (transaction) => {
        for (let queue of queues) {
            const ref = doc(db, "users", queue.studentIds);
            const userDoc = await transaction.get(ref);//ロック

            if (userDoc.data() === undefined) continue;

            const canUpdate = () => {
                
            }
            const firstShift: string[] = userDoc.data()!.firstShift;
            const secondShift: string[] = userDoc.data()!.secondShift
        }
    });
}