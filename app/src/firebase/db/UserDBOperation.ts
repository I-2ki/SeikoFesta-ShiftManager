import { collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../init";
import { numOfCells } from "../../model/time";

const db = getFirestore(app);
const userRef = collection(db, "users");

namespace UserDBOperation {
    export const add = async (number: number | null, name: string, readableGroups: string[], editableGroups: string[]) => {
        await setDoc(doc(userRef,`${number}`), {
            number : number,
            name: name,
            readableGroups: readableGroups,
            editableGroups: editableGroups,
            firstShift: new Array(numOfCells()).fill(""),
            secondShift: new Array(numOfCells()).fill(""),
        });
    }
    export const remove = async (id :string) => {
        deleteDoc(doc(userRef, `${id}`));
    };
}

export default UserDBOperation;