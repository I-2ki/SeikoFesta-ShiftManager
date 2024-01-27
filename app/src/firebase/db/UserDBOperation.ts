import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../init";
import { numOfCells } from "../../model/time";

const db = getFirestore(app);
const userRef = collection(db, "users");

namespace UserDBOperation {
    export const add = async (userId: number, name: string, readableGroups: string[], editableGroups: string[]) => {
        await setDoc(doc(userRef, `${userId}`), {
            id: userId,
            name: name,
            readableGroups: readableGroups,
            editableGroups: editableGroups,
            firstShift: new Array(numOfCells()).fill(""),
            secondShift: new Array(numOfCells()).fill(""),
        });
    }
    export const remove = async (id :string) => {
        setDoc(doc(userRef, `${id}`), {});
    };
}

export default UserDBOperation;