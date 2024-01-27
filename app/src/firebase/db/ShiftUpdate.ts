import { collection, getFirestore } from "firebase/firestore"
import { app } from "../init"

const db = getFirestore(app);
const userRef = collection(db,"users");

type queue = {
    studentIds : string,
    firstShiftUpdate : string[],
    secondShiftUpdate : string[],
}

const shiftsUpdate = (deleteShifts :queue[]) => {
    
}