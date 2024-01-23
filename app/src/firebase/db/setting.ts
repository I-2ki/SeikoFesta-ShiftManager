//後で開始時刻を読み込む、変更するプログラムを書く
import { doc , getDoc , getFirestore} from "firebase/firestore";
import { app } from "../init";

const db = getFirestore(app);

export async function fetchTimeSetting(){
    const timeRef = doc(db,"setting","time");
    const snapShot = await getDoc(timeRef);

    if(!snapShot.exists()){
        console.error("時刻データの読み取りに失敗しました");
        return {};
    }else{
        return snapShot.data();
    }
}
